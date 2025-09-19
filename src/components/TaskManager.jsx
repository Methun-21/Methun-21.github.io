import { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import { ProgressTracker } from './ProgressTracker';
import { Navigation } from './Navigation';
import { AddTaskForm } from './AddTaskForm';
import { useToast } from '@/hooks/use-toast';

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [currentView, setCurrentView] = useState('today');
  const { toast } = useToast();

  // Load tasks from localStorage on mount
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

  // Save tasks to localStorage whenever tasks change
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
    <div className="min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted-foreground">Stay productive and track your progress</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Task Area */}
          <div className="lg:col-span-2 space-y-6">
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
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
                  <p className="text-muted-foreground">
                    {currentView === 'today' && "No tasks for today. Add your first task to get started!"}
                    {currentView === 'completed' && "No completed tasks yet. Keep working!"}
                    {currentView === 'all' && "Your task list is empty. Create your first task above."}
                  </p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                ))
              )}
            </div>
          </div>

          {/* Progress Sidebar */}
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