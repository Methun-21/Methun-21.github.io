import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className="card-modern p-6 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 group">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mt-2 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="flex-1 space-y-4">
            <Input
              type="text"
              placeholder="What needs to be done today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              className="border-none bg-transparent text-xl placeholder:text-muted-foreground focus-visible:ring-0 p-0 font-medium"
              autoComplete="off"
            />
            
            {isExpanded && (
              <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                <Textarea
                  placeholder="Add more details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 p-0 min-h-[80px] resize-none text-lg"
                  rows={3}
                />
                
                <div className="flex items-center gap-3">
                  <Button 
                    type="submit" 
                    disabled={!title.trim()}
                    size="sm"
                    className="btn-primary px-6 py-2 font-semibold"
                  >
                    Add Task
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => {
                      setIsExpanded(false);
                      setTitle('');
                      setDescription('');
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </Button>
                  <span className="text-sm text-muted-foreground ml-auto flex items-center gap-1">
                    <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘</kbd>
                    <span>+</span>
                    <kbd className="px-2 py-1 text-xs bg-muted rounded">↵</kbd>
                    to add
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};