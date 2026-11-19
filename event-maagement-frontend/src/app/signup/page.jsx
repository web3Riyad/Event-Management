"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const { data: resdata, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      if (resdata) {
        router.push("/signin");
      }
    } catch (err) {
      setErrorMessage(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-16 px-4 sm:px-6 bg-[#F5F1E8]">
      <div className="w-full max-w-lg bg-[#101010] text-[#F5F1E8] rounded-3xl border border-[#262626] shadow-2xl p-8 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative gold glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D9A441]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#D9A441]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#181818] border border-[#D9A441]/40 text-[#D9A441] mb-4 shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-[#777777] font-sans mt-2">
            Join ÉLITE to discover and manage bespoke luxury events
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* HeroUI Organized Form */}
        <Form className="flex flex-col gap-5 relative z-10" onSubmit={onSubmit}>
          
          {/* Full Name Field */}
          <TextField
            isRequired
            name="name"
            type="text"
            className="flex flex-col gap-1.5 w-full"
            validate={(value) => {
              if (!value || value.trim().length < 3) {
                return "Full name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
              Full Name
            </Label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-[#777777] pointer-events-none" />
              <Input
                placeholder="Alexander Wright"
                className="w-full pl-10 pr-4 py-3 bg-[#181818] border border-[#2E2E2E] focus:border-[#D9A441] text-white placeholder-[#555555] rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D9A441]/40"
              />
            </div>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Email Address Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5 w-full"
            validate={(value) => {
              if (!value) return "Email is required";
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
              Email Address
            </Label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-[#777777] pointer-events-none" />
              <Input
                placeholder="vip.client@domain.com"
                className="w-full pl-10 pr-4 py-3 bg-[#181818] border border-[#2E2E2E] focus:border-[#D9A441] text-white placeholder-[#555555] rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D9A441]/40"
              />
            </div>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type={showPassword ? "text" : "password"}
            className="flex flex-col gap-1.5 w-full"
            onChange={(e) => setPasswordValue(e.target.value)}
            validate={(value) => {
              if (!value) return "Password is required";
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
              Password
            </Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-[#777777] pointer-events-none" />
              <Input
                placeholder="Create a strong password"
                className="w-full pl-10 pr-11 py-3 bg-[#181818] border border-[#2E2E2E] focus:border-[#D9A441] text-white placeholder-[#555555] rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D9A441]/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-[#777777] hover:text-[#D9A441] focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Description className="text-[11px] text-[#777777] mt-0.5">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Confirm Password Field */}
          <TextField
            isRequired
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="flex flex-col gap-1.5 w-full"
            validate={(value) => {
              if (!value) return "Please confirm your password";
              if (passwordValue && value !== passwordValue) {
                return "Passwords do not match";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
              Confirm Password
            </Label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-[#777777] pointer-events-none" />
              <Input
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-11 py-3 bg-[#181818] border border-[#2E2E2E] focus:border-[#D9A441] text-white placeholder-[#555555] rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#D9A441]/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-[#777777] hover:text-[#D9A441] focus:outline-none transition-colors"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Terms Agreement Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#777777] select-none">
              <input
                type="checkbox"
                required
                name="terms"
                className="mt-0.5 rounded border-[#2E2E2E] bg-[#181818] text-[#D9A441] focus:ring-[#D9A441] focus:ring-offset-0 cursor-pointer w-4 h-4 accent-[#D9A441]"
              />
              <span className="leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#D9A441] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#D9A441] hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* Submit and Reset Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D9A441] hover:bg-[#C59333] text-[#101010] font-semibold text-sm py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </>
              )}
            </Button>

            <Button
              type="reset"
              className="w-full bg-transparent hover:bg-white/5 border border-[#2E2E2E] hover:border-[#777777] text-[#777777] hover:text-white text-xs font-medium py-2 rounded-xl transition-all cursor-pointer"
            >
              Clear Fields
            </Button>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 pt-3 text-[11px] text-[#777777] border-t border-[#222222]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>End-to-end 256-bit SSL secured registration</span>
          </div>
        </Form>

        {/* Footer Link to Sign In */}
        <div className="mt-8 pt-6 border-t border-[#222222] text-center text-xs text-[#777777] relative z-10">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-[#D9A441] hover:text-[#C59333] font-semibold hover:underline ml-1 transition-colors"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
