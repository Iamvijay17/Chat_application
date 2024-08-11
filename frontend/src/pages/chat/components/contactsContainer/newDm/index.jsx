import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { apiClient } from '@/lib/api-client';
import { animationDefaultOption } from '@/lib/utils';
import { SEARCH_CONTACTS_ROUTES } from '@/utils/constant';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';
import { HOST } from '@/utils/constant';
import { useAppStore } from '@/store';

const NewDm = () => {
  const {setSelectedChatType, setSelectedChatData} = useAppStore();
  const [openContact, setContactModel] = useState(false);
  const [searchContact, setSearchContact] = useState([]);

  const SearchContact = async (search) => {
    if (!search.trim()) { 
      setSearchContact([]);
      return;
    }
  
    try {
      const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, { search }, { withCredentials: true });
  
      if (response.status === 200 && response.data.contacts) {
        setSearchContact(response.data.contacts);
      } else {
        setSearchContact([]);
      }
    } catch (error) {
      setSearchContact([]);
    }
  };
  

  const handleNewContact=(contact)=>{
    setContactModel(false);
    setSelectedChatType('contact');
    setSelectedChatData(contact);
    setSearchContact([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300' onClick={() => setContactModel(true)} />
          </TooltipTrigger>
          <TooltipContent
            className="bg-[#1c1b1e] border-none mb-2 p-3 text-white"
          >
            <p>New Chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openContact} onOpenChange={setContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white 
        w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please select a contact</DialogTitle>
            <DialogDescription>
        Please select a contact
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search Contacts" className="rounded-lg bg-[#2c2e3b]" onChange={(e)=>SearchContact(e.target.value)}/>
            </div>
            <ScrollArea className="h-[250px]">
              <div className='flex flex-col'>

                {
                  searchContact.length>0 &&
                  searchContact.map(contact=><div key={contact._id} className='flex gap-3 items-center cursor-pointer' onClick={()=>handleNewContact(contact)}>
                    <div className="mt-3 h-16 flex items-center gap-5 px-5 w-full bg-[#212b33]">
                      <div className="relative gap-3 items-center">
                        <Avatar className="h-10 w-10 cursor-pointer rounded-full border-2 border-white dark:border-gray-800">
                          <AvatarImage src={`${HOST}/${contact.image}`} alt=""/>
                          <AvatarFallback>{contact.firstName}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className='flex flex-col'>
                        <span>
                          {
                            contact.firstName && contact.lastName ? `${ contact.firstName} ${ contact.lastName} ` : contact.email
                          }
                        </span>
                        <span className='text-xs'>
                          {contact.email}
                        </span>
                      </div>
                      <div className='flex gap-5'>
                        
                      </div>
                    

                    </div>
                  </div>)
                }

                {
                  searchContact.length<=0 &&  <div className="flex-1 md:flex flex-col justify-center mt-5 items-center duration-100 transition-all">
                    <Lottie
                      isClickToPauseDisabled
                      height={120}
                      width={120}
                      options={animationDefaultOption}
                    />
                    <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-2xl text-3xl transition-all duration-300 text-center'>
                      <h3 className='font-medium'>
          Hi
                        <span className='text-purple-500'>! </span>
          Search
                        <span className='text-purple-500'> Contact</span>
                      </h3>
                    </div>
                  </div>
                }
             
              </div>
            </ScrollArea>

          </div>
         
        </DialogContent>
      </Dialog>

    </>
  );
};

export default NewDm;
