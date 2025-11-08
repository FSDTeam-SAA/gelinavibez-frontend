"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/web/AuthLayout";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email.trim()) return toast.error("Please enter your email address.");
    if (!password.trim()) return toast.error("Please enter your password.");

    setLoading(true);

    // 1. Show a *loading* toast (id lets us update it later)
    const loadingToastId = toast.loading("Logging you in…", {
      duration: Infinity, // stays until we dismiss/update it
    });

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });

      // 2. Error handling
      if (res?.error) {
        toast.error("Invalid email or password. Please try again.", {
          id: loadingToastId, // replace the loading toast
        });
        return;
      }

      // 3. Remember Me
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      // 4. Success toast (auto-dismiss after 2 s)
      toast.success("Login successful! ", {
        id: loadingToastId,
        duration: 2000,
      });

      // 5. Redirect *after* the toast disappears
      setTimeout(() => {
        router.push(res?.url ?? "/");
      }, 2100); // a tiny buffer so the toast finishes its animation
    } catch (err) {
      // console.error("Login error:", err);
      toast.error("Something went wrong. Please try again." + err , {
        id: loadingToastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Sonner Toaster – put it once in your layout or here */}
      <Toaster position="top-right"  />

      <AuthLayout>
        <div className="w-full max-w-[624px]">
          <div className="bg-[#FFFFFF1A]/10 border border-white/10 p-8 md:p-10 rounded-[6px]">
            {/* Header */}
            <div className="mb-10">
              <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#C5A574] mb-2">
                Hello!
              </h1>
              <h3 className="text-[#F9F6F1] text-base font-normal">
                Access to manage your account
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#F5F5F5] text-base font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-[#C0C3C1] placeholder:text-white/40 focus:border-white/40 pl-5 h-12 rounded-full text-[#F9F6F1]"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#F5F5F5] text-base font-medium">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent border-[#C0C3C1] text-white placeholder:text-white/40 pl-5 focus:border-white/40 h-12 rounded-full pr-12 text-[#F9F6F1]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(c) => setRememberMe(c as boolean)}
                    className="border-white/40 data-[state=checked]:bg-[#D4AF7A] data-[state=checked]:border-[#D4AF7A]"
                  />
                  <label htmlFor="remember" className="text-sm text-white/80 cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#D4AF7A] hover:text-[#E5C08B] transition-colors"
                >
                  Forget Password?
                </Link>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#D4AF7A] hover:bg-[#C5A574] font-medium rounded-full transition-colors text-[18px] text-white"
              >
                {loading ? "Logging in…" : "Sign In"}
              </Button>
            </form>

            {/* Sign-up link */}
            <div className="mt-8 text-center text-sm text-white/80">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-white font-medium hover:text-[#D4AF7A] transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}