import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Calendar, Users, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'planning' | 'active' | 'review' | 'completed';
  team: string[];
  deadline: string;
  milestones: Milestone[];
  budget: string;
  priority: 'low' | 'medium' | 'high';
}

interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  description: string;
}

export const ProjectTracker = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Project Alpha',
      description: 'Next-generation productivity dashboard with AI integration',
      progress: 75,
      status: 'active',
      team: ['Sarah Chen', 'Mike Johnson', 'Lisa Wong', 'David Kim'],
      deadline: '2024-02-15',
      budget: '$50,000',
      priority: 'high',
      milestones: [
        {
          id: '1',
          title: 'Requirements Gathering',
          dueDate: '2024-01-05',
          completed: true,
          description: 'Complete stakeholder interviews and requirement documentation'
        },
        {
          id: '2',
          title: 'Design Phase',
          dueDate: '2024-01-15',
          completed: true,
          description: 'UI/UX design and prototype creation'
        },
        {
          id: '3',
          title: 'Development Phase',
          dueDate: '2024-02-01',
          completed: false,
          description: 'Core functionality implementation'
        },
        {
          id: '4',
          title: 'Testing & QA',
          dueDate: '2024-02-10',
          completed: false,
          description: 'Comprehensive testing and bug fixes'
        },
        {
          id: '5',
          title: 'Deployment',
          dueDate: '2024-02-15',
          completed: false,
          description: 'Production deployment and go-live'
        }
      ]
    },
    {
      id: '2',
      name: 'Mobile App Redesign',
      description: 'Complete overhaul of mobile application user experience',
      progress: 45,
      status: 'active',
      team: ['Alex Rivera', 'Emma Thompson', 'Ryan Park'],
      deadline: '2024-03-01',
      budget: '$30,000',
      priority: 'medium',
      milestones: [
        {
          id: '6',
          title: 'User Research',
          dueDate: '2024-01-10',
          completed: true,
          description: 'Conduct user interviews and usability testing'
        },
        {
          id: '7',
          title: 'Wireframes',
          dueDate: '2024-01-20',
          completed: false,
          description: 'Create detailed wireframes for all screens'
        },
        {
          id: '8',
          title: 'Visual Design',
          dueDate: '2024-02-05',
          completed: false,
          description: 'Design system and high-fidelity mockups'
        }
      ]
    },
    {
      id: '3',
      name: 'API Documentation',
      description: 'Comprehensive API documentation and developer portal',
      progress: 90,
      status: 'review',
      team: ['Chris Martinez', 'Julia Adams'],
      deadline: '2024-01-25',
      budget: '$15,000',
      priority: 'low',
      milestones: [
        {
          id: '9',
          title: 'Content Creation',
          dueDate: '2024-01-15',
          completed: true,
          description: 'Write comprehensive API documentation'
        },
        {
          id: '10',
          title: 'Code Examples',
          dueDate: '2024-01-20',
          completed: true,
          description: 'Create code examples for all endpoints'
        },
        {
          id: '11',
          title: 'Final Review',
          dueDate: '2024-01-25',
          completed: false,
          description: 'Technical review and publication'
        }
      ]
    }
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-secondary text-secondary-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      case 'review': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 25) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Button className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">All Projects</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <Card 
                key={project.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedProject?.id === project.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm leading-tight">{project.name}</h4>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.deadline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.team.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject ? (
            <div className="space-y-6">
              {/* Project Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{selectedProject.name}</CardTitle>
                      <p className="text-muted-foreground">{selectedProject.description}</p>
                    </div>
                    <Badge className={getStatusColor(selectedProject.status)}>
                      {selectedProject.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedProject.progress}%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedProject.team.length}</div>
                      <div className="text-sm text-muted-foreground">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedProject.budget}</div>
                      <div className="text-sm text-muted-foreground">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getPriorityColor(selectedProject.priority)}`}>
                        {selectedProject.priority.toUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground">Priority</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-sm">{member}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {milestone.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {milestone.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {milestone.dueDate}
                              </Badge>
                              {!milestone.completed && new Date(milestone.dueDate) < new Date() && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a project to view details</h3>
                <p className="text-sm">Choose a project from the list to see progress and milestones</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};