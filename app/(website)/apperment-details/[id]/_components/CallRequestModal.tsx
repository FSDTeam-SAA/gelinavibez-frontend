"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CallRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CallRequestModal({ open, onOpenChange }: CallRequestModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    visitingIn: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Call request submitted:", formData)
    // Handle form submission here
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[602px] p-0 gap-0 bg-white !rounded-[4px] ">
        <DialogHeader className="px-8 pt-8 pb-10">
          <DialogTitle className=" ">
            <h1 className="text-[40px] font-normal text-[#0F3D61]">CALL REQUEST</h1>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-base text-[#343A40] font-midium">First Name</label>
              <Input
                placeholder="Name Here"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#C0C3C1] text-sm "
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-[#343A40] font-midium">Last Name</label>
              <Input
                placeholder="Name Here"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#C0C3C1] text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-base text-[#343A40] font-midium">Email Address</label>
            <Input
              type="email"
              placeholder="hello@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#C0C3C1] text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base text-[#343A40] font-midium">Visiting in</label>
            <Input
              placeholder="The Harbor Crown"
              value={formData.visitingIn}
              onChange={(e) => setFormData({ ...formData, visitingIn: e.target.value })}
              className="h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#C0C3C1] text-sm"
            />
          </div>

          <div className="space-y-2 pb-10">
            <label className="ttext-base text-[#343A40] font-midium">Phone Number</label>
            <Input
              type="tel"
              placeholder="+1234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-[48px] rounded-[4px] border-[#C0C3C1] placeholder:text-[#C0C3C1] text-sm"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-[48px] bg-[#0F3D61] hover:bg-[#0F3D61]/90 text-white rounded-[8px] text-base font-medium "
          >
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
