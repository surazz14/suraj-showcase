import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Suraj's AI assistant. Feel free to ask me anything about his experience, skills, or projects!",
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
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
      setIsTyping(false);
    }
  };

  // Simulate backend response - replace this with your actual API call
  const simulateBackendCall = async (message: string): Promise<string> => {
    const responses = [
      "Suraj is a Senior Software Engineer at Monotype with expertise in React.js, Node.js, TypeScript, and Generative AI. He's based in Kathmandu, Nepal.",
      "He graduated from Kathmandu University and has extensive experience in the outsourcing/offshoring industry with 500+ professional connections.",
      "His technical skills include Frontend Development (React.js, TypeScript, JavaScript), Backend Development (Node.js, Express.js), and specialization in Generative AI integration.",
      "Suraj has demonstrated leadership experience and has worked on various innovative projects combining modern web technologies with AI integration.",
      "You can connect with him through LinkedIn or email. He's currently open to new opportunities and exciting projects in full-stack development and AI integration."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-primary hover:shadow-glow transition-all duration-300 animate-bounce-gentle"
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
                Chat with Suraj's AI
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
                  placeholder="Ask me anything about Suraj..."
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
                <p className="text-xs text-muted-foreground">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    "What's Suraj's experience?",
                    "Tell me about his skills",
                    "How to contact him?"
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