

"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signOut, useSession } from "next-auth/react";
import { useChnagePassword } from "@/hooks/ApiClling";

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { data: session } = useSession();
  const token = session?.accessToken || "";
  const changePasswordMutation = useChnagePassword(token);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const payload = {
      oldPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    changePasswordMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        signOut({ callbackUrl: "/login" });
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      },
      onError: (error) => {
        const errorMessage = (error as { message?: string })?.message || "Failed to change password";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal information and profile details.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        <Link
          href="/profile"
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Profile Settings
        </Link>
        <Link
          href="/change-password"
          className="px-4 py-2 text-sm font-medium text-blue-700 border-b-2 border-blue-700"
        >
          Change Password
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 md:p-8 w-full h-full"
      >
        <h2 className="text-xl font-semibold text-[#0F3D61] mb-6">
          Change Password
        </h2>

        <div className="space-y-6 mt-9">
          {/* Current Password */}
          <div>
            <label className="block text-[18px] font-semibold text-[#616161] mb-2">
              Current Password
            </label>
            <div className="relative">
              <Input
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pr-10 h-[50px] bg-[#E7ECEF] rounded-[8px] border-none placeholder:text-[#616161]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-5 h-5 text-[#616161]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#616161]" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[18px] font-semibold text-[#616161] mb-2">
              New Password
            </label>
            <div className="relative">
              <Input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pr-10 h-[50px] bg-[#E7ECEF] rounded-[8px] border-none placeholder:text-[#616161]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5 text-[#616161]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#616161]" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[18px] font-semibold text-[#616161] mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pr-10 h-[50px] bg-[#E7ECEF] rounded-[8px] border-none placeholder:text-[#616161]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-[#616161]" />
                ) : (
                  <Eye className="w-5 h-5 text-[#616161]" />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[50px] rounded-[8px] text-white text-[18px] font-semibold"
            >
              {changePasswordMutation.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
