import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { GET_ALL_MESSAGES_ROUTES } from '@/utils/constant';
import ChatHeader from './components/chatHeader';
import MessageBar from './components/messageBar';
import MessageContainer from './components/messageContainer';

const ChatContainer = () => {
  const { selectedChatData, setSelectedChatMessages, selectedChatMessages } = useAppStore.getState();

  
  const getMessages = async () => {
    try {
      const response = await apiClient.post(
        GET_ALL_MESSAGES_ROUTES,
        { id: selectedChatData._id },
        { withCredentials: true },
      );
      
      if (JSON.stringify(response.data.messages) !== JSON.stringify(selectedChatMessages)) {
        console.log('Updating messages');
        setSelectedChatMessages(response?.data?.messages);
      }
      
     
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };


  return (
    <div className="top-0 fixed h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer getMessages={getMessages} />
      <MessageBar getMessages={getMessages} />

    </div>
  );
};

export default ChatContainer;
