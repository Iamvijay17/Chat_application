import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactsContainer from './components/contactsContainer';
import ChatContainer from './components/chatContainer';
import EmptyChatContainer from './components/emptyChatContainer';

const Chat = () => {
  const {userInfo, selectedChatType} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){  
      navigate('/profile');
      toast('Please setup profile to continue.');
    } 
  },[userInfo, navigate]);
  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'> 
      <ContactsContainer/>
      {
        selectedChatType === undefined ? <EmptyChatContainer/>:<ChatContainer/>
      }
      {/* <EmptyChatContainer/> */}
    </div>
  );
};

export default Chat;
