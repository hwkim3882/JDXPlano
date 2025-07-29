import { useState } from 'react';
import {
  ChatBubbleOvalLeftEllipsisIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import { post } from '@aws-amplify/api';
import './AiChat.css';

function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: 'Hello! How can I help you with blinds, shades, curtains, or shutters today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = { from: 'user', text: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const restOperation = post({
        apiName: 'aiConsultant', // The first parameter 'aiConsultant' is the name of the API configured in Amplify
        path: '/ai-consult',
        options: {
          body: {
            messages: newMessages,
          },
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();

      const aiResponse = { from: 'ai', text: response.message };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      const errorResponse = {
        from: 'ai',
        text: 'Sorry, I am having trouble connecting to my brain right now. Please try again later.',
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button onClick={toggleChat} className="chat-button">
          <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="chat-title">AI Consultation</h3>
            <button onClick={toggleChat}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message-bubble ai">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about our products..."
              className="chat-input"
              disabled={isLoading}
            />
            <button type="submit" className="send-button" disabled={isLoading}>
              <PaperAirplaneIcon className="h-5 w-5 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AiChat;
