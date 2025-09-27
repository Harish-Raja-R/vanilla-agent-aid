import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Clock, Video, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'task' | 'deadline' | 'personal';
  attendees?: string[];
}

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const events: Record<string, Event[]> = {
    '2024-01-15': [
      {
        id: '1',
        title: 'Team Standup',
        time: '09:00',
        duration: '30 min',
        type: 'meeting',
        attendees: ['Alice', 'Bob', 'Charlie']
      },
      {
        id: '2',
        title: 'Design Review',
        time: '14:00',
        duration: '1 hour',
        type: 'meeting',
        attendees: ['Design Team']
      },
      {
        id: '3',
        title: 'Project Alpha Deadline',
        time: '18:00',
        duration: 'All day',
        type: 'deadline'
      }
    ],
    '2024-01-16': [
      {
        id: '4',
        title: 'Client Presentation',
        time: '10:00',
        duration: '2 hours',
        type: 'meeting',
        attendees: ['Client Team']
      },
      {
        id: '5',
        title: 'Code Review',
        time: '15:30',
        duration: '45 min',
        type: 'task'
      }
    ],
    '2024-01-17': [
      {
        id: '6',
        title: 'Lunch with Sarah',
        time: '12:30',
        duration: '1 hour',
        type: 'personal'
      }
    ]
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-ai text-ai-foreground';
      case 'task': return 'bg-primary text-primary-foreground';
      case 'deadline': return 'bg-destructive text-destructive-foreground';
      case 'personal': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Video;
      case 'task': return Clock;
      case 'deadline': return Calendar;
      case 'personal': return Users;
      default: return Calendar;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWeekDates = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Calendar</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === 'week' ? 'default' : 'outline'} 
              onClick={() => setViewMode('week')}
              size="sm"
            >
              Week
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'default' : 'outline'} 
              onClick={() => setViewMode('month')}
              size="sm"
            >
              Month
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[200px] text-center">
              {formatDate(currentDate)}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'week' && (
        <div className="grid grid-cols-7 gap-4">
          {weekDates.map((date, index) => {
            const dateKey = date.toISOString().split('T')[0];
            const dayEvents = events[dateKey] || [];
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <Card key={index} className={`min-h-[400px] ${isToday ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${isToday ? 'text-primary' : ''}`}>
                      {date.getDate()}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dayEvents.map((event) => {
                    const EventIcon = getEventIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        className="p-2 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <EventIcon className="h-3 w-3 mt-1 flex-shrink-0 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{event.title}</div>
                            <div className="text-xs text-muted-foreground">{event.time}</div>
                            <Badge className={`text-xs mt-1 ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events['2024-01-15']?.map((event) => {
              const EventIcon = getEventIcon(event.type);
              return (
                <div key={event.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <EventIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{event.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.duration}</div>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                  {event.attendees && (
                    <div className="text-sm text-muted-foreground">
                      {event.attendees.join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};