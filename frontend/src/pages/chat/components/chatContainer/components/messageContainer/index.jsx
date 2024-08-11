import { useAppStore } from '@/store';
import moment from 'moment';
import { useEffect, useRef } from 'react';

const MessageContainer = ({getMessages}) => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, setSelectedChatMessages, selectedChatMessages } = useAppStore((state) => state);

  useEffect(() => {     

    if (selectedChatData._id && selectedChatType === 'contact') {
      getMessages();
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, []);





  const renderMessage = () => {
    let lastDate = null;

    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.date).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id} ref={index === selectedChatMessages.length - 1 ? scrollRef : null}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.date).format('LL')}
            </div>
          )}
          {selectedChatType === 'contact' && renderDMMessage(message)}
        </div>
      );
    });
  };
  
  const renderDMMessage = (message) => (
    <div className={`my-1 max-w-[100%] break-words ${message.sender === selectedChatData._id ? 'text-left' : 'text-right'}`}>
      {message.messageType === 'text' && (
        <div
          className={`border inline-block p-4 rounded ${message.sender !== selectedChatData._id
            ? 'bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50'
            : 'bg-[#2a2b33]/5 text-white border-[#ffffff]/20'
          }`}
        >
          {message.content}
        </div>
      )}
      <div className='text-xs text-gray-600'>
        {moment(message.date).format('LT')}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
    </div>
  );
};

export default MessageContainer;
