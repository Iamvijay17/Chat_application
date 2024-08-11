import { useEffect, useRef, useState } from 'react';
import { GrAttachment } from 'react-icons/gr';
import { RiEmojiStickerLine } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import EmojiPicker from 'emoji-picker-react';
import { useAppStore } from '@/store';
import { useSocket } from '@/context/SocketContext';

const MessageBar = ({ getMessages }) => {
  const emojiRef = useRef(null);
  const inputRef = useRef(null);
  const socket = useSocket();
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();
  const [message, setMessage] = useState('');
  const [emojiPicker, setEmojiPicker] = useState(false);

  // Handle click outside to close the emoji picker
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

  // Focus input field when component mounts or after sending a message
  useEffect(() => {
    inputRef.current?.focus();
  }, [message]);

  // Handle Enter key to send the message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessageSend();
    }
  };

  // Handle emoji click
  const handleEmoji = (e) => {
    setMessage((msg) => msg + e.emoji);
  };

  // Handle sending the message
  const handleMessageSend = () => {
    if (message.trim() === '') return; // Prevent sending empty messages

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
      // Refocus the input field
      inputRef.current?.focus();
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
          onKeyDown={handleKeyDown} // Handle keydown on the input field itself
        />

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>

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
