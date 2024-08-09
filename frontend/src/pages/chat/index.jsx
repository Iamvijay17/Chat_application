import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.profileSetup){  
      navigate('/profile');
      toast('Please setup profile to continue.');
    } 
  },[userInfo, navigate]);
  
  return (
    <div> 
      {userInfo.firstName}
    </div>
  );
};

export default Chat;
