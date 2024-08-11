import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import { RiCloseFill } from 'react-icons/ri';
import { HOST } from '@/utils/constant';

const ChatHeader = () => {

  const {closeChat, selectedChatData, selectedChatType} = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="relative gap-3 items-center">
            <Avatar className="h-10 w-10 cursor-pointer rounded-full border-2 border-white dark:border-gray-800">
              <AvatarImage src={`${HOST}/${selectedChatData.image}`} alt=""/>
              <AvatarFallback>{selectedChatData.firstName}</AvatarFallback>
            </Avatar>            
          </div>
          { selectedChatType === 'contact' &&
            <div className='flex flex-col'>
              <span>
                {
                  selectedChatData.firstName && selectedChatData.lastName ? `${ selectedChatData.firstName} ${ selectedChatData.lastName} ` : selectedChatData.email
                }
              </span>
              <span className='text-xs'>
                {selectedChatData.email}
              </span>
            </div>
          }
        </div>
        <div className="flex items-center justify-center gap-3"></div>
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'
          onClick={closeChat}
        >
          <RiCloseFill className='text-3xl'/>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
