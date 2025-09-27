import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, X, Sparkles, Clock, Target, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface AIAssistantProps {
  onClose: () => void;
}

export const AIAssistant = ({ onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI productivity assistant. I can help you plan your day, organize tasks, and provide insights about your work patterns. What would you like to work on today?",
      timestamp: new Date().toLocaleTimeString(),
      suggestions: [
        "Plan my week",
        "Summarize Project Alpha",
        "Suggest top 3 tasks for today",
        "Optimize my schedule"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Clock, label: "Plan Today", action: "Plan my tasks for today based on priority and deadlines" },
    { icon: Target, label: "Focus Time", action: "Suggest the best 2-hour focus block for deep work" },
    { icon: Calendar, label: "Schedule Review", action: "Review my calendar and suggest optimizations" },
    { icon: Sparkles, label: "Weekly Insights", action: "Provide insights about my productivity this week" }
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date().toLocaleTimeString(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('plan') && (input.includes('day') || input.includes('today'))) {
      return {
        content: "Based on your current tasks and calendar, here's my suggested plan for today:\n\n🎯 **High Priority (Morning 9-11 AM)**\n• Complete Project Alpha design review\n• Respond to client feedback\n\n⚡ **Medium Priority (Afternoon 2-4 PM)**\n• Update project documentation\n• Team sync meeting prep\n\n💡 **Quick Wins (End of day)**\n• Clear email inbox\n• Plan tomorrow's priorities\n\nThis schedule leaves you with a 3-hour focus block and handles your most critical tasks first.",
        suggestions: ["Optimize my schedule", "Show me focus time suggestions", "What about this week?"]
      };
    }
    
    if (input.includes('focus') || input.includes('deep work')) {
      return {
        content: "🧠 **Optimal Focus Block Suggestion**\n\nBased on your calendar analysis:\n\n⏰ **Best Time**: 2:00 PM - 4:00 PM\n• No meetings scheduled\n• Post-lunch energy peak\n• Minimal interruptions expected\n\n📋 **Recommended Tasks**:\n• Project Alpha implementation\n• Technical documentation\n• Code review and optimization\n\n💡 **Tips**: Turn off notifications, use a 25-minute Pomodoro timer, and take a 5-minute break every half hour.",
        suggestions: ["Block this time in calendar", "What tasks should I prioritize?", "Set up focus mode"]
      };
    }
    
    if (input.includes('week') || input.includes('weekly')) {
      return {
        content: "📊 **This Week's Productivity Insights**\n\n✅ **Completed**: 24 tasks (85% completion rate)\n📈 **Trend**: +12% improvement from last week\n🎯 **Focus Time**: 18 hours (goal: 20 hours)\n\n**Key Achievements**:\n• Project Alpha reached 75% completion\n• All client meetings completed on time\n• Documentation backlog cleared\n\n**Areas for Improvement**:\n• Schedule more focus blocks for Thursday/Friday\n• Reduce meeting overlap on Wednesday\n• Consider batching similar tasks together",
        suggestions: ["Plan next week", "Show task breakdown", "Schedule focus blocks"]
      };
    }
    
    if (input.includes('project alpha') || input.includes('summarize')) {
      return {
        content: "📋 **Project Alpha Summary**\n\n**Status**: 75% Complete (On Track)\n**Deadline**: February 15, 2024\n**Team**: 4 members\n**Budget**: $50,000 (68% utilized)\n\n**Recent Progress**:\n✅ Design phase completed\n✅ Core functionality implemented\n🔄 Currently in testing phase\n\n**Next Steps**:\n• Complete QA testing by Feb 1\n• Address client feedback\n• Prepare deployment plan\n• Schedule go-live meeting\n\n**Risks**: Minor - dependency on external API integration",
        suggestions: ["Show project timeline", "View team assignments", "Schedule status meeting"]
      };
    }
    
    // Default response
    return {
      content: "I understand you're looking for productivity assistance. I can help you with:\n\n• **Task Planning**: Organize and prioritize your daily tasks\n• **Schedule Optimization**: Find the best times for focused work\n• **Project Insights**: Get summaries and progress updates\n• **Time Management**: Suggest improvements to your workflow\n\nWhat specific area would you like to focus on?",
      suggestions: ["Plan my day", "Optimize schedule", "Project status", "Weekly review"]
    };
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-ai">
            <Brain className="h-5 w-5" />
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 space-y-4">
        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="h-auto p-3 flex flex-col items-center gap-2 text-xs hover:bg-ai-background/50"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-ai-background border border-ai/20'
                } rounded-lg p-3 space-y-2`}>
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                  <div className="text-xs opacity-70">{message.timestamp}</div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-secondary/80"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-ai-background border border-ai/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-ai rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-ai rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-ai rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about your productivity..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="shrink-0 bg-ai hover:bg-ai/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};