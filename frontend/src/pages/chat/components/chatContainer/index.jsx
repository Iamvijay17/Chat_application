import ChatHeader from './components/chatHeader';
import MessageBar from './components/messageBar';
import MessageContainer from './components/messageContainer';

const ChatContainer = () => {
  return (
    <div className="top-0 fixed h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
      
    </div>
  );
};

export default ChatContainer;
