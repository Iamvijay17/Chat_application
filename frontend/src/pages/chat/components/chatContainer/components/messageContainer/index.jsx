import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import PDF from '@/assets/icons/pdf';
import { apiClient } from '@/lib/api-client';
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constant';
import moment from 'moment';

const MessageContainer = ({ getMessages }) => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages } = useAppStore((state) => state);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedChatData._id && selectedChatType === 'contact') {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, getMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [selectedChatMessages]);

  const CheckIfImage = (filePath) => {
    const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
    return imageReg.test(filePath);
  };

  const CheckIfPdf = (filePath) => {
    const pdfReg = /[\/.](pdf)$/i;
    return pdfReg.test(filePath);
  };

  const CheckIfZip = (filePath) => {
    const zipReg = /[\/.](zip)$/i;
    return zipReg.test(filePath);
  };

  const DownloadFile = async (fileUrl) => {
    const response = await apiClient.get(`${HOST}/${fileUrl}`, {
      responseType: 'blob',
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = urlBlob;
    link.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  };

  const renderDMMessage = (message) => {
    const isSender = message.sender !== selectedChatData._id;

    return (
      <div className={`my-1 max-w-[100%] break-words ${isSender ?'text-right' : 'text-left'}`}>
        {message.messageType === 'text' && (
          <div
            className={`border inline-block p-4 rounded ${isSender
              ? 'bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50'
              : 'bg-[#2a2b33]/5 text-white border-[#ffffff]/20'
            }`}
          >
            {message.content}
          </div>
        )}
        {message.messageType === 'file' && (
          <>
            {CheckIfImage(message.fileUrl) ? (
              <div className={`cursor-pointer flex ${isSender ? 'justify-end' : 'justify-start'}`} onClick={() => {
                setImageUrl(message.fileUrl);
                setShowImage(true);
              }}>
                <img src={`${HOST}/${message.fileUrl}`} width={300} height={300} alt={`${message.fileUrl}`} />
              </div>
            ) : CheckIfZip(message.fileUrl) ? (
              <div>
                <div className="flex items-start gap-2.5">
                  <div className="flex flex-col gap-2.5">
                    <div className="leading-1.5 flex w-full max-w-[320px] flex-col">
                      <div className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-xl p-2">
                        <div className="me-2">
                          <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                            <PDF />
                            {message.fileUrl.substring(message.fileUrl.lastIndexOf('/') + 1)}
                          </span>
                          <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                            12 Pages
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                              <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                            </svg>
                            18 MB
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                              <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
                            </svg>
                            ZIP
                          </span>
                        </div>
                        <div className="inline-flex self-center items-center">
                          <button
                            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            type="button"
                            onClick={() => DownloadFile(message.fileUrl)}
                          >
                            <svg className="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
        <div className='text-xs text-gray-600'>
          {moment(message.date).format('LT')}
        </div>
      </div>
    );
  };

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

  return (
    <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessage()}
      <Dialog open={showImage} onOpenChange={setShowImage}>
        <DialogContent>
          <img className="h-auto w-full rounded-lg shadow-xl dark:shadow-gray-800" src={`${HOST}/${imageUrl}`} alt={imageUrl} />
          <DialogFooter>
            <Button type="submit">Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageContainer;
