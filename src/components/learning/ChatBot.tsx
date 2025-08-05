import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  ExternalLink
} from 'lucide-react';
import { GrokLoadingBar } from '../common/GrokLoadingBar';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  links?: Array<{
    title: string;
    url: string;
    description: string;
  }>;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your friendly government contracting helper! 😊\n\nI explain everything super simply - like you're 14 and hearing about this for the first time. I can help you understand how to sell your business services to the government!\n\nAsk me anything about signing up, finding opportunities, or using GovChime to win contracts!",
      timestamp: new Date(),
      links: [
        {
          title: "GovChime Dashboard",
          url: "/",
          description: "See what we can do for you"
        },
        {
          title: "Beginner's Guide",
          url: "https://www.sba.gov/federal-contracting/contracting-guide-for-small-businesses",
          description: "Start here if you're new"
        },
        {
          title: "Sign Up for SAM.gov",
          url: "https://sam.gov/content/entity-registration",
          description: "Register your business"
        }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // OpenAI API configuration
  const OPENAI_API_KEY = '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';
  const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

  // Enhanced AI response with OpenAI API
  const getAIResponse = async (userMessage: string): Promise<{ content: string; links?: Array<{title: string; url: string; description: string}> }> => {
    console.log('Attempting OpenAI API call...');
    
    try {
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a friendly federal contracting assistant for GovChime. Follow these STRICT rules:

            COMMUNICATION STYLE:
            - Keep ALL answers SHORT (2-3 sentences max)
            - Explain everything like you're talking to a 14-year-old who's never heard of government contracting
            - Use simple words and avoid jargon
            - If you must use technical terms, immediately explain them in simple terms
            - Be encouraging and positive

            CONTENT FOCUS:
            - ONLY answer questions about government contracting topics
            - If asked about anything else, politely redirect to contracting topics
            - Focus on: SAM.gov, set-aside programs, NAICS codes, proposals, GovChime features
            - Always mention how GovChime can help when relevant

            EXAMPLE STYLE:
            Instead of: "SAM.gov is the System for Award Management where entities must register..."
            Say: "SAM.gov is like a sign-up website where your business needs to register before you can sell anything to the government. Think of it like creating an account before you can shop online, but for businesses!"

            Be helpful, simple, and brief!`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      };

      console.log('Sending to OpenAI API...');

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('OpenAI Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('OpenAI API Response:', data);
        
        // Extract the response message from OpenAI format
        let aiMessage = '';
        if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
          aiMessage = data.choices[0].message.content;
        }
        
        if (aiMessage && aiMessage.trim().length > 0) {
          const suggestedLinks = generateContextualLinks(userMessage, aiMessage);
          return {
            content: aiMessage.trim(),
            links: suggestedLinks
          };
        }
      } else {
        const errorText = await response.text();
        console.error('OpenAI API Error:', response.status, errorText);
      }
    } catch (error) {
      console.error('OpenAI API request failed:', error);
    }
    
    // If API fails, throw error to use fallback
    throw new Error('OpenAI API request failed');
  };

  // Generate contextual links based on conversation content
  const generateContextualLinks = (userMessage: string, aiResponse: string): Array<{title: string; url: string; description: string}> => {
    const message = userMessage.toLowerCase();
    const response = aiResponse.toLowerCase();
    const links: Array<{title: string; url: string; description: string}> = [];

    // Always include GovChime platform links when relevant
    if (message.includes('govchime') || message.includes('platform') || message.includes('dashboard')) {
      links.push(
        {
          title: "GovChime Dashboard",
          url: "/",
          description: "Main analytics dashboard"
        },
        {
          title: "Spending Analysis",
          url: "/spending",
          description: "Interactive spending data"
        }
      );
    }

    // SAM.gov related links
    if (message.includes('sam.gov') || message.includes('registration') || response.includes('sam.gov')) {
      links.push({
        title: "SAM.gov Registration",
        url: "https://sam.gov/content/entity-registration",
        description: "Official registration portal"
      });
    }

    // Set-aside program links
    if (message.includes('set-aside') || message.includes('small business') || response.includes('set-aside')) {
      links.push(
        {
          title: "Set-Aside Intelligence",
          url: "/set-aside",
          description: "GovChime set-aside analysis"
        },
        {
          title: "SBA Set-Aside Programs",
          url: "https://www.sba.gov/federal-contracting/contracting-assistance-programs",
          description: "Official SBA guidance"
        }
      );
    }

    // Market research and analysis
    if (message.includes('market research') || message.includes('analysis') || message.includes('competitor')) {
      links.push(
        {
          title: "Spending Analytics",
          url: "/spending",
          description: "Market research dashboard"
        },
        {
          title: "Contract Activity",
          url: "/chatter",
          description: "Real-time contract feed"
        }
      );
    }

    // NAICS codes
    if (message.includes('naics') || response.includes('naics')) {
      links.push(
        {
          title: "NAICS Directory",
          url: "/awards",
          description: "Industry code explorer"
        },
        {
          title: "SBA Size Standards",
          url: "https://www.sba.gov/federal-contracting/contracting-guide/size-standards",
          description: "Official SBA NAICS guidance"
        }
      );
    }

    // Proposal and bidding
    if (message.includes('proposal') || message.includes('bidding') || response.includes('proposal')) {
      links.push({
        title: "Proposal Writing Guide",
        url: "https://www.sba.gov/federal-contracting/contracting-guide-for-small-businesses/how-win-government-contracts",
        description: "SBA proposal guidance"
      });
    }

    // USASpending data
    if (message.includes('usaspending') || message.includes('spending data') || response.includes('spending')) {
      links.push({
        title: "USASpending.gov",
        url: "https://www.usaspending.gov/search",
        description: "Federal spending database"
      });
    }

    // If no specific links, provide general helpful resources
    if (links.length === 0) {
      links.push(
        {
          title: "Federal Contracting Guide",
          url: "https://www.sba.gov/federal-contracting/contracting-guide-for-small-businesses",
          description: "Complete beginner's guide"
        },
        {
          title: "GovChime Platform",
          url: "/",
          description: "Return to dashboard"
        }
      );
    }

    return links.slice(0, 4); // Limit to 4 links max
  };

  // Enhanced fallback responses with more intelligence
  const getFallbackResponse = (userMessage: string): { content: string; links?: Array<{title: string; url: string; description: string}> } => {
    const message = userMessage.toLowerCase();

    if (message.includes('govchime') || message.includes('platform')) {
      return {
        content: "GovChime is like a super smart helper for government contracts! It shows you who's getting contracts, how much money they're making, and helps you find opportunities. Think of it as your personal coach for winning government business!",
        links: generateContextualLinks(userMessage, "govchime platform features")
      };
    }

    if (message.includes('sam.gov') || message.includes('registration')) {
      return {
        content: "SAM.gov is like signing up for a club before you can play! Every business must register there (for free) before they can sell anything to the government. It's like creating your business profile so the government knows you exist.",
        links: generateContextualLinks(userMessage, "sam.gov registration process")
      };
    }

    if (message.includes('set-aside') || message.includes('small business')) {
      return {
        content: "Set-aside programs are like special lanes at the store just for small businesses! The government saves certain contracts only for small companies, making it easier for them to compete and win.",
        links: generateContextualLinks(userMessage, "set-aside programs")
      };
    }

    if (message.includes('naics') || message.includes('code')) {
      return {
        content: "NAICS codes are like categories that describe what your business does! It's like picking the right section in a store - you need to choose the code that matches your business so the government knows what you sell.",
        links: generateContextualLinks(userMessage, "naics codes")
      };
    }

    if (message.includes('proposal') || message.includes('bidding') || message.includes('bid')) {
      return {
        content: "Writing a proposal is like writing a really good application for a job! You need to show the government why your business is the best choice and how you'll do the work they need.",
        links: generateContextualLinks(userMessage, "proposal writing")
      };
    }

    if (message.includes('opportunity') || message.includes('find') || message.includes('contract')) {
      return {
        content: "Finding government contracts is like treasure hunting! GovChime shows you all the contracts being awarded so you can see what opportunities are out there. It's way easier than searching through boring government websites!",
        links: generateContextualLinks(userMessage, "finding opportunities")
      };
    }

    // Default enhanced response
    return {
      content: "I'm here to help you learn about selling to the government! I can explain things like registering your business, finding opportunities, and using GovChime's tools. What would you like to know about government contracting?",
      links: generateContextualLinks(userMessage, "federal contracting assistance")
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // TRY OPENAI API FIRST - Your OpenAI key should provide excellent responses
      console.log('Using OpenAI API for enhanced responses...');
      
      try {
        const apiResponse = await getAIResponse(currentInput);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: apiResponse.content,
          timestamp: new Date(),
          links: apiResponse.links
        };
        setMessages(prev => [...prev, botMessage]);
        console.log('✅ OpenAI API response successful!');
        return;
      } catch (apiError) {
        console.log('❌ OpenAI API failed, using enhanced local response:', apiError);
      }
      
      // Fallback to enhanced local responses if API fails
      const fallbackResponse = getFallbackResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: fallbackResponse.content,
        timestamp: new Date(),
        links: fallbackResponse.links
      };
      setMessages(prev => [...prev, botMessage]);
      
      console.log('💡 Local AI Response used as fallback');
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Oops! I'm having trouble connecting right now. But don't worry - I can still help you with government contracting questions! Try asking me something simple like 'What is SAM.gov?' or 'How does GovChime work?'",
        timestamp: new Date(),
        links: [
          {
            title: "GovChime Dashboard",
            url: "/",
            description: "Check out our platform"
          },
          {
            title: "Beginner's Guide",
            url: "https://www.sba.gov/federal-contracting/contracting-guide-for-small-businesses",
            description: "Learn the basics"
          }
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What is government contracting in simple terms?",
    "How do I sign up to sell to the government?",
    "What is SAM.gov and why do I need it?",
    "What are set-aside programs?",
    "How can GovChime help my business?",
    "What is a NAICS code?",
    "How do I write a proposal?",
    "Where do I find contract opportunities?"
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-950/95 to-gray-950/95 border border-slate-700/60 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)] w-full max-w-2xl h-[600px] flex flex-col backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/60 bg-gradient-to-r from-slate-900/80 to-gray-900/80 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_12px_40px_rgba(6,182,212,0.4)]">
              <Bot className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white drop-shadow-sm font-mono tracking-wide">AI Assistant</h2>
              <p className="text-xs text-slate-300 font-mono tracking-wider">FEDERAL CONTRACTING INTEL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-950/60 to-gray-950/80">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                <div className={`p-2.5 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                    : 'bg-gradient-to-br from-cyan-500 to-blue-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white drop-shadow-lg" />
                  ) : (
                    <Bot className="w-5 h-5 text-white drop-shadow-lg" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none"></div>
                </div>
                <div className={`p-4 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] border backdrop-blur-sm ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-emerald-600/90 to-teal-700/90 text-white border-emerald-500/40'
                    : 'bg-gradient-to-br from-slate-900/95 to-gray-950/95 text-slate-100 border-slate-600/50'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono tracking-wide">{message.content}</div>
                  {message.links && (
                    <div className="mt-4 space-y-2">
                      {message.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-slate-800/60 border border-slate-600/50 rounded-lg hover:bg-slate-700/70 transition-all duration-200 text-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_rgba(6,182,212,0.3)]"
                        >
                          <ExternalLink className="w-4 h-4 mr-3 text-cyan-400 drop-shadow-sm" />
                          <div>
                            <div className="font-medium text-slate-100 drop-shadow-sm font-mono">{link.title}</div>
                            <div className="text-slate-400 text-xs font-mono">{link.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="text-xs opacity-60 mt-3 text-slate-300 font-mono">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none"></div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-[0_8px_32px_rgba(6,182,212,0.4)]">
                  <Bot className="w-5 h-5 text-white drop-shadow-lg" />
                </div>
                <div className="p-4 bg-gradient-to-br from-slate-900/95 to-gray-950/95 border border-slate-600/50 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <GrokLoadingBar color="blue" size="sm" />
                    <span className="text-sm text-slate-300 font-mono">PROCESSING...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4 bg-gradient-to-t from-gray-900 to-gray-850">
            <p className="text-sm text-gray-300 mb-3 font-medium">Quick questions to get started:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.2)] border border-gray-600/40 backdrop-blur-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-slate-700/60 bg-gradient-to-r from-slate-900/90 to-gray-950/90 rounded-b-2xl">
          <div className="flex space-x-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ENTER QUERY: Federal contracting intel..."
              className="flex-1 p-4 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none bg-gradient-to-br from-slate-900/95 to-gray-950/95 text-slate-100 placeholder-slate-400 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-200 font-mono text-sm"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_8px_32px_rgba(6,182,212,0.4)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.6)] backdrop-blur-sm border border-cyan-400/30"
            >
              <Send className="w-5 h-5 drop-shadow-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;