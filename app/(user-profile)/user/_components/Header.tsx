"use client"

import { Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-20 bg-white  flex items-center justify-between px-6 lg:px-10  sticky  top-0 z-50">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="David Judal" />
          <AvatarFallback>DJ</AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <div className="text-sm font-medium text-gray-900">David Judal</div>
          <div className="text-xs text-gray-500">davidjudal@bps.com</div>
        </div>
      </div>
    </header>
  )
}
