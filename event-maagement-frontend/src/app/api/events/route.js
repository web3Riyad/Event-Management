import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// export const dynamic = "force-dynamic";

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
    const eventType = searchParams.get("eventType");
    const timeframe = searchParams.get("timeframe");
    const limit = searchParams.get("limit");
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Try Express backend first if available
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const backendRes = await fetch(`${backendUrl}/events?${searchParams.toString()}`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);
      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data);
      }
    } catch {
      // Backend not running, proceed to direct MongoDB connection
    }

    // Direct MongoDB connection fallback
    if (!clientPromise) {
      return NextResponse.json([]);
    }

    const connectedClient = await clientPromise;
    const db = connectedClient.db("EventManagement");
    const collection = db.collection("event");

    let query = {};
    if (eventType && eventType.toLowerCase() !== "all") {
      query.eventType = { $regex: new RegExp(`^${eventType}$`, "i") };
    }

    let sortOrder = 1;
    if (timeframe === "upcoming") {
      query.eventDate = { $gte: today };
      sortOrder = 1;
    } else if (timeframe === "past") {
      query.eventDate = { $lt: today };
      sortOrder = -1;
    }

    let cursor = collection.find(query).sort({ eventDate: sortOrder });
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum) && limitNum > 0) {
      cursor = cursor.limit(limitNum);
    }

    const events = await cursor.toArray();
    return NextResponse.json(events);
  } catch (error) {
    console.error("API /events error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
