

'use client';

import { formatDistanceToNow } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SelectedChatType } from './ChatLayout';
import Image from 'next/image';

type Member = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'contractor';
  profileImage?: string;
};

type Conversation = {
  _id: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
};

interface Props {
  selectedChat: SelectedChatType | null;
  onSelectChat: (data: SelectedChatType) => void;
}

export default function ChatSidebar({ selectedChat, onSelectChat }: Props) {
  const { data: session, status } = useSession();
  const token = session?.accessToken as string | undefined;
  const currentUserId = session?.user?.userId as string | undefined;
  // const currentUserRole = session?.user?.role as 'user' | 'contractor' | undefined;

  const searchParams = useSearchParams();
  // const queryClient = useQueryClient();

  const fetchConversations = async (): Promise<Conversation[]> => {
    if (!token) throw new Error('Not authenticated');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch conversations');
    const json = await res.json();
    return json.data as Conversation[];
  };

  const { data: conversations = [], isLoading } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    enabled: !!token && status === 'authenticated',
    staleTime: 1000 * 60,
  });

  // URL থেকে conversationId পড়ে স্বয়ংক্রিয়ভাবে সিলেক্ট করা
  useEffect(() => {
    const convId = searchParams.get('conversationId');
    if (convId && conversations.length > 0) {
      const found = conversations.find(c => c._id === convId);
      if (found) {
        const receiver = found.members.find(m => m._id !== currentUserId);
        if (receiver) {
          onSelectChat({
            conversationId: found._id,
            receiverId: receiver._id,
          });
        }
      }
    }
  }, [searchParams, conversations, currentUserId, onSelectChat]);

  const getOtherMember = (members: Member[]) => {
    return members.find(m => m._id !== currentUserId) || members[0];
  };

  const handleChatClick = (conversation: Conversation) => {
    const receiver = getOtherMember(conversation.members);
    if (!receiver) return;

    onSelectChat({
      conversationId: conversation._id,
      receiverId: receiver._id,
    });
  };

  if (status === 'loading' || isLoading) {
    return <div className="w-full md:w-96 bg-white flex items-center justify-center h-full">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div className="w-full md:w-96 bg-white flex items-center justify-center h-full">Please sign in</div>;
  }

  if (conversations.length === 0) {
    return <div className="w-full md:w-96 bg-white flex flex-col items-center justify-center h-full">No messages yet</div>;
  }

  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const other = getOtherMember(conv.members);
          const displayName = `${other.firstName} ${other.lastName}`;
          const initials = displayName
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={conv._id}
              onClick={() => handleChatClick(conv)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer ${
                selectedChat?.conversationId === conv._id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              {other.profileImage ? (
                <Image
                  src={other.profileImage}
                  alt={displayName}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{displayName}</h3>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Tap to chat</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}