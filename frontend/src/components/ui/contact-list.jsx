import { useAppStore } from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { HOST } from '@/utils/constant';
const ContactList = ({contacts, isChannel = false}) => {
  const { selectedChatData, setSelectedChatType,  setSelectedChatMessages, setSelectedChatData } = useAppStore.getState();


  const handleClick =(contact)=>{
    if(isChannel){
      setSelectedChatType('channel');
    }else{
      setSelectedChatType('contact');
    }
    setSelectedChatData(contact);
    if(selectedChatData && selectedChatData._id !== contact._id){
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className='mt-5'>
      {
        contacts.map((contact)=>(
          <div className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id? 'bg-[#8417ff] hover:bg-[#8417ff] ' : 'hover:bg-[#f1f1f111] hover:text-gray-50'}`} key={contact._id} onClick={()=>handleClick(contact)}>
            <div className='flex gap-5 items-center justify-start '>
              {
                !isChannel && <div className="flex gap-3 items-center justify-center">
                  <div className="relative gap-3 items-center">
                    <Avatar className="text-gray-800 h-10 w-10 cursor-pointer rounded-full border-2 border-white dark:border-gray-800">
                      <AvatarImage src={`${HOST}/${contact.image}`} alt=""/>
                      <AvatarFallback>{contact?.firstName?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>            
                  </div>
                  <div className='flex flex-col '>
                    <span>
                      {
                        contact?.firstName && contact?.lastName ? `${ contact.firstName} ${ contact.lastName} ` : selectedChatData.email
                      }
                    </span>
                    
                  </div>
                  
                </div>
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ContactList;
