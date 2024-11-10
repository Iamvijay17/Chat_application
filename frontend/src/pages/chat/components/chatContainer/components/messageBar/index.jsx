import { useEffect, useRef, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import EmojiPicker from 'emoji-picker-react';
import { useAppStore } from '@/store';
import { useSocket } from '@/context/SocketContext';
import { apiClient } from '@/lib/api-client';
import { UPLOAD_FILE_ROUTES } from '@/utils/constant';

const MessageBar = ({ getMessages }) => {
  const emojiRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef();
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const [message, setMessage] = useState('');
  const [emojiPicker, setEmojiPicker] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessageSend();
    }
  };

  const handleEmoji = (e) => {
    setMessage((msg) => msg + e.emoji);
  };

  const handleMessageSend = () => {
    if (message.trim() === '') return; 

    if (selectedChatType === 'contact') {
      socket.emit('sendMessage', {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: 'text',
        fileUrl: undefined,
      });
      getMessages();
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleAttachmentClick = (e) => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async(e) => {
    try {
      
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post(UPLOAD_FILE_ROUTES, formData, {
        withCredentials: true,
      });
      
      if (response.status === 200 && response.data) {
        if (selectedChatType === 'contact') {

          socket.emit('sendMessage', {
            sender: userInfo.id,
            content: undefined,
            recipient: selectedChatData._id,
            messageType: 'file',
            fileUrl: response.data.filePath,
          });
        }
      }


    } catch (error) {
      
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} lf
        />

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          onClick={handleAttachmentClick}>
          <GrAttachment className="text-2xl" />
        </button>
        <input type='file' className='hidden' ref={fileInputRef} onChange={handleAttachmentChange}/>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setEmojiPicker(!emojiPicker)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>

          {emojiPicker && (
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker
                theme="dark"
                open={emojiPicker}
                onEmojiClick={handleEmoji}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>

      <button
        className="bg-[#8417ff] hover:bg-[#741bda] focus:bg-[#741bda] rounded-md items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleMessageSend}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
