import { Suspense } from "react";
import ChatLayout from "./_components/ChatLayout";



export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatLayout />
    </Suspense>
  )
}