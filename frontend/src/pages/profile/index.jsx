import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userInfo.ProfileSetup){  
      toast('Please setup profile to continue.');
    } 
  });
  
  return (
    <div> 
      {userInfo.email}
    </div>
  );
};

export default Profile; 
