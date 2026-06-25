import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t('chatbot.greeting'),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate API call to your backend
    try {
      // TODO: Replace with your actual backend API call
      const response = await simulateBackendCall(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('chatbot.error'),
        variant: "destructive"
      });
      setIsTyping(false);
    }
  };

  // Simulate backend response - replace this with your actual API call
  const simulateBackendCall = async (message: string): Promise<string> => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
      return t('chatbot.responses.skills');
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return t('chatbot.responses.experience');
    } else if (lowerMessage.includes('project')) {
      return t('chatbot.responses.projects');
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return t('chatbot.responses.contact');
    } else {
      return t('chatbot.responses.default');
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 hover:shadow-glow transition-all duration-300 animate-bounce-gentle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 animate-scale-in">
          <Card className="bg-gradient-card border-border shadow-card backdrop-blur-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="w-5 h-5 text-primary" />
                {t('chatbot.title')}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Messages Area */}
              <ScrollArea className="h-64 pr-2" ref={scrollAreaRef}>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 animate-fade-in ${
                        message.isUser ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        message.isUser 
                          ? "bg-gradient-primary" 
                          : "bg-secondary"
                      }`}>
                        {message.isUser ? (
                          <User className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <Bot className="w-4 h-4 text-foreground" />
                        )}
                      </div>
                      
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        message.isUser
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-2 animate-fade-in">
                      <div className="p-2 rounded-full bg-secondary">
                        <Bot className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 bg-background border-border"
                  disabled={isTyping}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={isTyping || !inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {/* Quick Questions */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{t('common.loading')}:</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    t('chatbot.responses.experience').substring(0, 25) + '?',
                    t('chatbot.responses.skills').substring(0, 20) + '?',
                    t('chatbot.responses.contact').substring(0, 20) + '?'
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-border hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                      onClick={() => setInputValue(question)}
                      disabled={isTyping}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;