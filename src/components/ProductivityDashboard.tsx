import { useState } from "react";
import { Brain, Calendar, CheckSquare, FileText, BarChart3, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TaskBoard } from "./TaskBoard";
import { CalendarView } from "./CalendarView";
import { NotesManager } from "./NotesManager";
import { ProjectTracker } from "./ProjectTracker";
import { AIAssistant } from "./AIAssistant";

type ActiveView = 'dashboard' | 'tasks' | 'calendar' | 'notes' | 'projects';

export const ProductivityDashboard = () => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const stats = [
    { title: "Tasks Today", value: "8", icon: CheckSquare, color: "text-primary" },
    { title: "Meetings", value: "3", icon: Calendar, color: "text-ai" },
    { title: "Notes", value: "12", icon: FileText, color: "text-success" },
    { title: "Projects", value: "4", icon: BarChart3, color: "text-warning" },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'tasks':
        return <TaskBoard />;
      case 'calendar':
        return <CalendarView />;
      case 'notes':
        return <NotesManager />;
      case 'projects':
        return <ProjectTracker />;
      default:
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="bg-gradient-to-br from-ai-background to-primary/5 border-ai/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-ai">
                  <Brain className="h-5 w-5" />
                  AI Productivity Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-white/80 dark:bg-card/80 rounded-lg">
                    <p className="font-medium">🎯 Focus Time Suggestion</p>
                    <p className="text-sm text-muted-foreground">Block 2-4 PM for deep work on Project Alpha</p>
                  </div>
                  <div className="p-4 bg-white/80 dark:bg-card/80 rounded-lg">
                    <p className="font-medium">⚡ Quick Win</p>
                    <p className="text-sm text-muted-foreground">Complete 3 small tasks to boost momentum</p>
                  </div>
                  <div className="p-4 bg-white/80 dark:bg-card/80 rounded-lg">
                    <p className="font-medium">📅 Schedule Optimization</p>
                    <p className="text-sm text-muted-foreground">Move tomorrow's meeting to create a 3-hour focus block</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Focus */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Priority Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: "Review Q4 budget proposal", priority: "high", time: "2 hours" },
                    { task: "Prepare client presentation", priority: "medium", time: "1.5 hours" },
                    { task: "Team standup meeting", priority: "low", time: "30 mins" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          item.priority === 'high' ? 'bg-destructive' :
                          item.priority === 'medium' ? 'bg-warning' : 'bg-success'
                        }`} />
                        <span className="font-medium">{item.task}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                AI Productivity Assistant
              </h1>
            </div>
            <Button 
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="bg-gradient-to-r from-ai to-ai-primary text-white hover:shadow-lg transition-all"
            >
              <Brain className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 min-h-screen bg-card border-r p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'notes', label: 'Notes', icon: FileText },
              { id: 'projects', label: 'Projects', icon: Plus },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as ActiveView)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 text-primary'
                    : 'hover:bg-secondary/50 text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderActiveView()}
        </main>

        {/* AI Assistant Sidebar */}
        {showAIAssistant && (
          <div className="w-80 border-l bg-card">
            <AIAssistant onClose={() => setShowAIAssistant(false)} />
          </div>
        )}
      </div>
    </div>
  );
};