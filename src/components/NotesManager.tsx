import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Search, Brain, Hash, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  aiSummary?: string;
  actionItems?: string[];
}

export const NotesManager = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Project Alpha Kickoff Meeting',
      content: `Attended the kickoff meeting for Project Alpha today. Key stakeholders were present including Sarah from Product, Mike from Engineering, and Lisa from Design.

Main discussion points:
- Timeline: 8 weeks to completion
- Budget: $50k allocated
- Team size: 6 developers, 2 designers
- Key challenges: Integration with legacy system
- Success metrics: 95% uptime, <200ms response time

Next steps:
- Schedule technical architecture review
- Create detailed project timeline
- Set up development environment
- Schedule weekly check-ins with stakeholders`,
      tags: ['meeting', 'project-alpha', 'kickoff'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      aiSummary: 'Project Alpha kickoff with 8-week timeline, $50k budget, and 8-person team.',
      actionItems: [
        'Schedule technical architecture review',
        'Create detailed project timeline',
        'Set up development environment',
        'Schedule weekly check-ins'
      ]
    },
    {
      id: '2',
      title: 'Design System Guidelines',
      content: `Creating comprehensive design system guidelines for consistency across all products.

Color Palette:
- Primary: #6366F1 (Indigo)
- Secondary: #F59E0B (Amber)
- Success: #10B981 (Emerald)
- Error: #EF4444 (Red)

Typography:
- Headings: Inter (Bold)
- Body: Inter (Regular)
- Code: Fira Code

Component Standards:
- Buttons: 8px padding, 6px border radius
- Cards: 12px padding, subtle shadow
- Forms: Consistent spacing, clear labels`,
      tags: ['design', 'guidelines', 'ui-ux'],
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15',
      aiSummary: 'Design system with indigo primary color, Inter typography, and standardized component spacing.',
      actionItems: [
        'Document component library',
        'Create Figma design tokens',
        'Share guidelines with team'
      ]
    },
    {
      id: '3',
      title: 'Customer Feedback Summary',
      content: `Compiled feedback from user interviews and support tickets this month.

Positive Feedback:
- 89% satisfaction with new dashboard
- Users love the search functionality
- Mobile experience greatly improved

Areas for Improvement:
- Loading times still too slow (avg 3.2s)
- Export feature needs better format options
- Some users want dark mode

Feature Requests:
- Bulk operations
- Advanced filtering
- API access for power users`,
      tags: ['feedback', 'users', 'improvements'],
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12',
      aiSummary: 'High user satisfaction (89%) but need to address loading times and add requested features.',
      actionItems: [
        'Optimize loading performance',
        'Add export format options',
        'Implement dark mode',
        'Research bulk operations feature'
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '', tags: '' });
    setIsCreatingNew(false);
    setSelectedNote(note);
  };

  const generateAISummary = (note: Note) => {
    // Simulate AI processing
    const summaries = [
      "AI-generated summary: Key insights and main topics identified.",
      "Summary: Meeting outcomes with actionable next steps.",
      "Overview: Important decisions and follow-up items noted."
    ];
    
    const summary = summaries[Math.floor(Math.random() * summaries.length)];
    
    setNotes(prev => prev.map(n => 
      n.id === note.id 
        ? { ...n, aiSummary: summary }
        : n
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Notes</h2>
        <Button onClick={() => setIsCreatingNew(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredNotes.map((note) => (
              <Card 
                key={note.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedNote?.id === note.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedNote(note)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm leading-tight line-clamp-2">
                      {note.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {note.updatedAt}
                      </div>
                      {note.tags.length > 0 && (
                        <div className="flex gap-1">
                          {note.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              +{note.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Note Editor/Viewer */}
        <div className="lg:col-span-2">
          {isCreatingNew ? (
            <Card>
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[300px] resize-none"
                />
                <Input
                  placeholder="Tags (comma-separated)..."
                  value={newNote.tags}
                  onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
                />
                <div className="flex gap-2">
                  <Button onClick={createNote}>Save Note</Button>
                  <Button variant="outline" onClick={() => setIsCreatingNew(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : selectedNote ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{selectedNote.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Created: {selectedNote.createdAt}</span>
                        <span>Updated: {selectedNote.updatedAt}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generateAISummary(selectedNote)}
                      className="flex items-center gap-2"
                    >
                      <Brain className="h-4 w-4" />
                      AI Summary
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedNote.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-muted-foreground" />
                      <div className="flex gap-2">
                        {selectedNote.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedNote.content}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedNote.aiSummary && (
                <Card className="bg-gradient-to-br from-ai-background to-primary/5 border-ai/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-ai">
                      <Brain className="h-5 w-5" />
                      AI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedNote.aiSummary}</p>
                  </CardContent>
                </Card>
              )}

              {selectedNote.actionItems && selectedNote.actionItems.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Action Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedNote.actionItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a note to view</h3>
                <p className="text-sm">Choose a note from the list or create a new one</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};