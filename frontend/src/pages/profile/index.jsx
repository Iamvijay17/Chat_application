import { useAppStore } from '@/store';


const Profile = () => { 
  const {userInfo} = useAppStore();
  
  return (
    <div> 
      {userInfo.email}
    </div>
  );
};

export default Profile; 
