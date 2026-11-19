import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;
let client;
let clientPromise;

if (!global._mongoClientPromise && uri) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json(
        { error: "Authentication required. userEmail parameter is missing." },
        { status: 401 }
      );
    }

    // 1. Try Express backend first if available
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const backendRes = await fetch(
        `${backendUrl}/events/joined?userEmail=${encodeURIComponent(userEmail)}`,
        { signal: controller.signal, cache: "no-store" }
      );
      clearTimeout(timeoutId);
      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Backend not running, proceed to direct MongoDB connection
    }

    // 2. Direct MongoDB fallback
    if (!clientPromise) {
      return NextResponse.json([]);
    }

    const connectedClient = await clientPromise;
    const db = connectedClient.db("EventManagement");
    const collection = db.collection("joinedEvents");

    // Sort by eventDate ascending (coming date first)
    const joinedEvents = await collection
      .find({ userEmail })
      .sort({ eventDate: 1, joinedAt: -1 })
      .toArray();

    return NextResponse.json(joinedEvents);
  } catch (error) {
    console.error("GET /api/events/joined error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
