
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useProfileInfoUpdate, useProfileQuery } from "@/hooks/ApiClling";
import { ProfileUpdatePayload } from "@/types/userDataType";

export function ProviderProfileSetting() {
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  // Fetch profile info
  const getProfile = useProfileQuery(token);
  const profile = getProfile.data?.data;

  // Mutation for profile update
  const updateProfileMutation = useProfileInfoUpdate(token);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    bio: "",
    phoneNumber: "",
    location: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form with fetched profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        jobTitle: profile.jobTitle || "",
        bio: profile.bio || "",
        phoneNumber: profile.phone || "",
        location: profile.location || "",
      });
    }
  }, [profile]);

  // Handle image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // Handle text input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ProfileUpdatePayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      jobTitle: formData.jobTitle,
      bio: formData.bio,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
    };
    if (profileImage) {
      payload.avatar = profileImage;
    }

    updateProfileMutation.mutate(payload);

  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#0F3D61]">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal information and profile details.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        <Link
          href="/contractor/profile"
          className="px-4 py-2 text-sm font-medium text-blue-700 border-b-2 border-blue-700"
        >
          Profile Settings
        </Link>
        <Link
          href="/contractor/provider-change-password"
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Change Password
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        <h2 className="text-xl font-bold text-[#0F3D61] mb-6">
          Profile Settings
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-[110px] h-[110px]">
                {profileImage ? (
                  <Image
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile"
                    width={1000}
                    height={1000}
                    className="rounded-full object-cover"
                    priority
                  />
                ) : (
                  <>
                    <AvatarImage
                      src={profile?.profileImage || "/placeholder.svg"}
                      alt="Profile"
                    />
                    <AvatarFallback>
                      {profile?.firstName?.[0]}
                      {profile?.lastName?.[0]}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>

              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 p-1.5 bg-blue-900 text-white rounded-full hover:bg-blue-800"
              >
                <Camera className="w-3 h-3" />
              </button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Text Fields */}
          <div className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[18px] text-[#616161] mb-2">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  placeholder="Jack"
                  onChange={handleInputChange}
                  className="w-full bg-[#E7ECEF] h-[48px] rounded-[8px] border-none placeholder:text-[#929292]"
                />
              </div>
              <div>
                <label className="block text-[18px] text-[#616161] mb-2">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Mackie"
                  onChange={handleInputChange}
                  className="w-full bg-[#E7ECEF] h-[48px] rounded-[8px] border-none placeholder:text-[#929292]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[18px] text-[#616161] mb-2">
                Email Address
              </label>
              <Input
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-[#E7ECEF] h-[48px] rounded-[8px] border-none text-[#000000]"
              />
            </div>

            <div>
              <label className="block text-[18px] text-[#616161] mb-2">
                Job Title
              </label>
              <Input
                name="jobTitle"
                value={formData.jobTitle}
                placeholder="Administrator"
                onChange={handleInputChange}
                className="w-full bg-[#E7ECEF] h-[48px] rounded-[8px] border-none placeholder:text-[#929292]"
              />
            </div>

            <div>
              <label className="block text-[18px] text-[#616161] mb-2">
                Bio
              </label>
              <Textarea
                name="bio"
                value={formData.bio}
                placeholder="Short description about you..."
                onChange={handleInputChange}
                className="w-full min-h-[118px] bg-[#E7ECEF] rounded-[8px] border-none placeholder:text-[#929292]"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#0F3D61] mb-4 mt-[32px] border-t pt-[30px]">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[18px] text-[#616161] mb-2">
                Phone Number
              </label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="+1 (415) 123-4567"
                onChange={handleInputChange}
                className="w-full bg-[#E7ECEF] h-[48px] rounded-[8px] border-none placeholder:text-[#929292]"
              />
            </div>

            <div>
              <label className="block text-[18px] text-[#616161] mb-2">
                Location
              </label>
              <Input
                name="location"
                value={formData.location}
                placeholder="Los Angeles, CA"
                onChange={handleInputChange}
                className="w-full bg-[#E7ECEF] h-[48px] rounded-[8px] border-none placeholder:text-[#929292]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-[32px]">
          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="bg-[#0F3D61] hover:bg-[#0F3D61]/90 h-[50px] rounded-[8px] text-white text-base"
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
