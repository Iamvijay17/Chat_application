import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import {FaEdit} from 'react-icons/fa';
import {IoPowerOutline} from 'react-icons/io5';
import { HOST, LOGOUT_ROUTES } from '@/utils/constant';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import { toast } from 'react-toastify';
  

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const LogOut = async ()=>{
    const response =await apiClient.post(LOGOUT_ROUTES,{}, { withCredentials: true });
    if (response.status === 200 ) {
      toast.success('Logout successfully');
      navigate('/auth');
      setUserInfo(null);
    }
  };

  return (
    <div className=" absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#212b33]">
      <div className="flex gap-3 items-center">
        <Avatar className=" text-gray-800 h-10 w-10 cursor-pointer rounded-full border-2 border-white dark:border-gray-800 mx-auto my-4">
          <AvatarImage  src={`${HOST}/${userInfo.image}`} alt=""/>
          <AvatarFallback>{userInfo?.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className=''>
        {
          userInfo.firstName && userInfo.lastName ? `${ userInfo.firstName} ${ userInfo.lastName}` : ''
        }
      </div>
      <div className='flex gap-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaEdit className='font-medium text-xl text-purple-500' onClick={()=>navigate('/profile')}/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerOutline className='font-medium text-xl text-purple-500' onClick={()=>LogOut}/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </div>
  );
};


export default ProfileInfo;