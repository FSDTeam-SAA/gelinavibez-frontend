// 'use client';

// import { Search, Archive, Settings, Plus } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// type Chat = {
//   id: string;
//   name: string;
//   avatar: string;
//   lastMessage: string;
//   timestamp: Date;
//   unread: number;
//   online?: boolean;
// };

// const chats: Chat[] = [
//   { id: '1', name: 'Rahim Khan', avatar: 'RK', lastMessage: 'Bhai kemon achis?', timestamp: new Date(Date.now() - 1000 * 60 * 5), unread: 3, online: true },
//   { id: '2', name: 'Karim Bhai', avatar: 'KB', lastMessage: 'Photo pathaisi', timestamp: new Date(Date.now() - 1000 * 60 * 30), unread: 0 },
//   { id: '3', name: 'Shakib Al Hasan', avatar: 'SH', lastMessage: 'Match dekhechish?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), unread: 12, online: true },
//   { id: '4', name: 'Design Team', avatar: 'DT', lastMessage: 'New design approved', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), unread: 0 },
//   { id: '5', name: 'Mahmudullah Riyad', avatar: 'MR', lastMessage: 'আজকে খেলা আছে?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), unread: 1 },
// ];

// interface Props {
//   selectedChat: string | null;
//   onSelectChat: (id: string) => void;
// }

// export default function ChatSidebar({ selectedChat, onSelectChat }: Props) {
//   return (
//     <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">


//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             onClick={() => onSelectChat(chat.id)}
//             className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition ${
//               selectedChat === chat.id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
//             }`}
//           >
//             <div className="relative">
//               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
//                 {chat.avatar}
//               </div>
//               {chat.online && (
//                 <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
//               )}
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-baseline">
//                 <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
//                 <span className="text-xs text-gray-500">
//                   {formatDistanceToNow(chat.timestamp, { addSuffix: true })}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
//             </div>

//             {chat.unread > 0 && (
//               <div className="bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
//                 {chat.unread}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// 'use client'

// import { Plus, Settings } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';
// import { useQuery } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';

// // Types
// type Member = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   profileImage?: string;
// };

// type Conversation = {
//   _id: string;
//   members: Member[];
//   createdAt: string;
//   updatedAt: string;
// };

// interface Props {
//   selectedChat: string | null;
//   onSelectChat: (id: string) => void;
// }

// export default function ChatSidebar({ selectedChat, onSelectChat }: Props) {
//    console.log(onSelectChat)

//   const { data: session, status } = useSession();
//   const token = session?.accessToken as string | undefined;
//   const currentUserId = session?.user?.userId as string | undefined;
//   const UserId= session?.user?.userId as string | undefined;
//   console.log(UserId)

//   // Fetch conversations with Authorization header
//   const fetchConversations = async (): Promise<Conversation[]> => {
//     if (!token) throw new Error('Not authenticated');

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: 'include', // Optional: if you're using cookies too
//     });

//     if (!res.ok) {
//       const error = await res.json().catch(() => ({ message: 'Failed to fetch' }));
//       throw new Error(error.message || 'Failed to fetch conversations');
//     }

//     const json = await res.json();
//     return json.data as Conversation[];
//   };

//   const { data: conversations = [], isLoading, error } = useQuery<Conversation[]>({
//     queryKey: ['conversations'],
//     queryFn: fetchConversations,
//     enabled: !!token && status === 'authenticated', // Only run when logged in
//     staleTime: 1000 * 60, // 1 minute
//   });

//   // Helper: Get the other member (not current user)
//   const getOtherMember = (members: Member[]) => {
//     if (!currentUserId) return members[0];
//     return members.find((m) => m._id !== currentUserId) ?? members[0];
//   };

//   // Loading (initial or refetching)
//   if (status === 'loading' || isLoading) {
//     return (
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex items-center justify-center h-full">
//         <div className="text-gray-500">Loading chats...</div>
//       </div>
//     );
//   }

//   // Not authenticated
//   if (status === 'unauthenticated') {
//     return (
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex items-center justify-center h-full">
//         <div className="text-gray-500">Please sign in to view messages</div>
//       </div>
//     );
//   }

//   // Error from API
//   if (error) {
//     return (
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex items-center justify-center h-full">
//         <div className="text-red-500">Failed to load chats</div>
//       </div>
//     );
//   }

//   // No conversations
//   if (conversations.length === 0) {
//     return (
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col items-center justify-center h-full text-gray-500">
//         <p className="mb-2">No messages yet</p>
//         <p className="text-sm">Start a conversation!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//         <h2 className="text-xl font-bold text-gray-900">Messages</h2>
//         <div className="flex gap-2">
//           <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//             <Plus className="w-5 h-5" />
//           </button>
//           <button className="p-2 hover:bg-gray-100 rounded-lg transition">
//             <Settings className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-y-auto">
//         {conversations.map((conv) => {
//           const other = getOtherMember(conv.members);
//           const displayName = `${other.firstName} ${other.lastName}`.trim();
//           const initials = displayName
//             .split(' ')
//             .map((n) => n[0])
//             .join('')
//             .toUpperCase()
//             .slice(0, 2);

//           const lastMessage = 'Tap to start chatting';
//           const timestamp = new Date(conv.updatedAt);

//           return (
//             <div
//               key={conv._id}
//               onClick={() => onSelectChat(conv._id)}
//               className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
//                 selectedChat === conv._id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
//               }`}
//             >
//               {/* Avatar */}
//               <div className="relative flex-shrink-0">
//                 {other.profileImage ? (
//                   <img
//                     src={other.profileImage}
//                     alt={displayName}
//                     className="w-14 h-14 rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
//                     {initials}
//                   </div>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-baseline">
//                   <h3 className="font-semibold text-gray-900 truncate">{displayName}</h3>
//                   <span className="text-xs text-gray-500 ml-2">
//                     {formatDistanceToNow(timestamp, { addSuffix: true })}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


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
  co
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