
'use client'

import { Plus, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

// Types
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

// Updated Props: now receives object with conversationId + receiverId
interface Props {
  selectedChat: string | null;
  onSelectChat: (data: { conversationId: string; receiverId: string }) => void;
}

export default function ChatSidebar({ selectedChat, onSelectChat }: Props) {

  const  data = useSession();
  const session = data.data;
  const status = data.status;

  const token = session?.accessToken as string | undefined;
  const currentUserId = session?.user?.userId as string | undefined;
  const currentUserRole = session?.user?.role as 'user' | 'contractor' | undefined;

  // Fetch conversations
  const fetchConversations = async (): Promise<Conversation[]> => {
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Failed to fetch' }));
      throw new Error(error.message || 'Failed to fetch conversations');
    }

    const json = await res.json();
    return json.data as Conversation[];
  };

  const { data: conversations = [], isLoading, error } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    enabled: !!token && status === 'authenticated',
    staleTime: 1000 * 60,
  });

  // Get the correct receiver based on role
  const getReceiver = (members: Member[]): Member | null => {
    if (!currentUserRole || !currentUserId) return null;

    if (currentUserRole === 'contractor') {
      return members.find(m => m.role === 'user') || null;
    } else {
      // role === 'user'
      return members.find(m => m.role === 'contractor') || null;
    }
  };

  // Get display member (other person) for UI)
  const getOtherMember = (members: Member[]) => {
    return members.find(m => m._id !== currentUserId) || members[0];
  };

  // Handle chat click
  const handleChatClick = (conversation: Conversation) => {
    const receiver = getReceiver(conversation.members);

    if (!receiver) {
      console.error("Could not determine receiver for conversation:", conversation._id);
      return;
    }

    const conversationId = conversation._id;
    const receiverId = receiver._id;

  

    onSelectChat({ conversationId, receiverId });
  };

  // Loading states
  if (status === 'loading' || isLoading) {
    return (
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex items-center justify-center h-full">
        <div className="text-gray-500">Loading chats...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex items-center justify-center h-full">
        <div className="text-gray-500">Please sign in to view messages</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex items-center justify-center h-full">
        <div className="text-red-500">Failed to load chats</div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col items-center justify-center h-full text-gray-500">
        <p className="mb-2">No messages yet</p>
        <p className="text-sm">Start a conversation!</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const other = getOtherMember(conv.members);
          const displayName = `${other.firstName} ${other.lastName}`.trim() || 'Unknown';
          const initials = displayName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

          const timestamp = new Date(conv.updatedAt);

          return (
            <div
              key={conv._id}
              onClick={() => handleChatClick(conv)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedChat === conv._id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                {other.profileImage ? (
                  <img
                    src={other.profileImage}
                    alt={displayName}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {initials}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900 truncate">{displayName}</h3>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatDistanceToNow(timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">Tap to start chatting</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}