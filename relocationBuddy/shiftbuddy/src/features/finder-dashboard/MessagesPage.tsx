import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { FluidCard } from '@/components/ui/FluidCard';
import { ElasticButton } from '@/components/ui/ElasticButton';
import { MOCK_CONVERSATIONS } from '@/data/finderMockData';

export const MessagesPage = () => {
    const [conversations] = useState(MOCK_CONVERSATIONS);
    const [activeConversation, setActiveConversation] = useState(conversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = conversations.filter(conv =>
        conv.buddyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // TODO: Add message to conversation
            console.log('Sending:', newMessage);
            setNewMessage('');
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = diff / (1000 * 60 * 60);

        if (hours < 24) {
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold mb-8">Messages</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                {/* Conversations List */}
                <div className="lg:col-span-1">
                    <FluidCard className="h-full flex flex-col p-0 overflow-hidden">
                        {/* Search */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredConversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setActiveConversation(conv)}
                                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 text-left ${activeConversation.id === conv.id ? 'bg-primary/5' : ''
                                        }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={conv.buddyPhoto}
                                            alt={conv.buddyName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        {conv.unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center rounded-full">
                                                {conv.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h4 className="font-semibold text-sm truncate">{conv.buddyName}</h4>
                                            <span className="text-xs text-ink-400 whitespace-nowrap ml-2">
                                                {formatTime(conv.lastMessageTime)}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-ink-900' : 'text-ink-400'}`}>
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </FluidCard>
                </div>

                {/* Active Conversation */}
                <div className="lg:col-span-2">
                    <FluidCard className="h-full flex flex-col p-0 overflow-hidden">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={activeConversation.buddyPhoto}
                                    alt={activeConversation.buddyName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold">{activeConversation.buddyName}</h3>
                                    <p className="text-xs text-green-600">● Online</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Phone size={20} />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Video size={20} />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {activeConversation.messages.map((message, index) => {
                                const isOwn = message.senderId === 'finder-1';
                                return (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                                            <div
                                                className={`px-4 py-2 rounded-2xl ${isOwn
                                                        ? 'bg-primary text-white rounded-br-sm'
                                                        : 'bg-white text-ink-900 rounded-bl-sm'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                            <p className={`text-xs text-ink-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                                                {message.timestamp.toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                                <ElasticButton
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="!px-6 gap-2"
                                >
                                    <Send size={18} />
                                    Send
                                </ElasticButton>
                            </div>
                        </div>
                    </FluidCard>
                </div>
            </div>
        </div>
    );
};
