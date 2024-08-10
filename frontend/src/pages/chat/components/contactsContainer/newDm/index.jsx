import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { animationDefaultOption } from '@/lib/utils';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';


const NewDm = () => {
  const [openContact, setContactModel] = useState(false);
  const [searchContact, setSearchContact] = useState([]);

  const SearchContact = (search) => {};

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
              <Input type="text" placeholder="Search Contacts" className="rounded-lg bg-[#2c2e3b]" onChang={(e)=>SearchContact(e.target.value)}/>
            </div>

          </div>
          {
            searchContact.length<=0 &&  <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-100 transition-all">
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
        </DialogContent>
      </Dialog>

    </>
  );
};

export default NewDm;
