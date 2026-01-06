
import React, { useRef, useEffect } from 'react';
import { Message, Role } from '../types';

interface Props {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<Props> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const renderText = (text: string) => {
    // Simple markdown-style rendering for bold and lists
    return text.split('\n').map((line, i) => {
      let content: React.ReactNode = line;
      
      // Bold
      if (line.includes('**')) {
        const parts = line.split('**');
        content = parts.map((part, index) => index % 1 === 0 && index % 2 !== 0 ? <strong key={index} className="text-indigo-900 font-bold">{part}</strong> : part);
      }

      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-bold text-indigo-700 mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold text-slate-800 mt-6 mb-3 border-b border-indigo-100 pb-1">{line.replace('## ', '')}</h2>;
      }

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return <li key={i} className="ml-4 mb-1 list-disc">{line.trim().substring(2)}</li>;
      }

      return <p key={i} className="mb-3 leading-relaxed">{content}</p>;
    });
  };

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[85%] flex gap-4 ${msg.role === Role.USER ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white ${
              msg.role === Role.USER ? 'bg-slate-400' : 'bg-indigo-600'
            }`}>
              <i className={`fas ${msg.role === Role.USER ? 'fa-user' : 'fa-user-tie'} text-xs`}></i>
            </div>
            
            <div className={`p-5 rounded-2xl shadow-sm border ${
              msg.role === Role.USER 
                ? 'bg-slate-50 border-slate-200 text-slate-700' 
                : 'bg-white border-indigo-100 text-slate-800'
            }`}>
              {renderText(msg.text)}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-indigo-50 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <i className="fas fa-spinner fa-spin text-xs"></i>
            </div>
            <div className="text-sm text-slate-500 italic">Bahit 2 AI analyse vos données et structure ses arguments critiques...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
