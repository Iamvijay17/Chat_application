import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.ProfileSetup){  
      toast('Please setup profile to continue.');
      navigate('/profile');
    } 
  });
  
  return (
    <div> 
      {userInfo.email}
    </div>
  );
};

export default Chat;
