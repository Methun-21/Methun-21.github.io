import { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import { ProgressTracker } from './ProgressTracker';
import { Navigation } from './Navigation';
import { AddTaskForm } from './AddTaskForm';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('today');
  const { toast } = useToast();

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task added!",
      description: "Your new task has been created successfully.",
    });
  };

  const toggleTask = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, completedAt: task.completed ? undefined : new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
      variant: "destructive",
    });
  };

  const editTask = (id, title, description) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, title, description }
          : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your changes have been saved.",
    });
  };

  const getFilteredTasks = () => {
    const today = new Date().toDateString();
    switch (currentView) {
      case 'today':
        return tasks.filter(task => 
          new Date(task.createdAt).toDateString() === today
        );
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'all':
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
        {/* Modern Header */}
        <header className="text-center mb-16">
          
        </header>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Task Area */}
          <div className="lg:col-span-3 space-y-8">
            <AddTaskForm onAddTask={addTask} />
            
            <Navigation 
              currentView={currentView} 
              onViewChange={setCurrentView}
              taskCounts={{
                today: tasks.filter(task => 
                  new Date(task.createdAt).toDateString() === new Date().toDateString()
                ).length,
                completed: completedCount,
                all: totalCount
              }}
            />

            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <Card className="text-center py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                  <div className="text-6xl mb-6">📝</div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">No tasks found!</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    {currentView === 'today' && "Ready to tackle today? Add your first task and let's get productive!"}
                    {currentView === 'completed' && "No completed tasks yet. Keep pushing forward to finish your tasks!"}
                    {currentView === 'all' && "Your journey starts here. Create your first task and make it happen!"}
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modern Progress Sidebar */}
          <div className="lg:col-span-1">
            <ProgressTracker
              totalTasks={totalCount}
              completedTasks={completedCount}
              progressPercentage={progressPercentage}
              todayTasks={tasks.filter(task => 
                new Date(task.createdAt).toDateString() === new Date().toDateString()
              ).length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
