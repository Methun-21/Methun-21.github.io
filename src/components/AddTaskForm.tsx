import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface AddTaskFormProps {
  onAddTask: (title: string, description?: string) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <Card className="p-4 border-2 border-dashed border-border hover:border-primary/50 transition-colors duration-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-primary/30 flex items-center justify-center mt-2">
            <svg className="w-3 h-3 text-primary/50" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div className="flex-1 space-y-3">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              className="border-none bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
              autoComplete="off"
            />
            
            {isExpanded && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                <Textarea
                  placeholder="Add description (optional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-none bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 p-0 min-h-[60px] resize-none"
                  rows={2}
                />
                
                <div className="flex items-center gap-2">
                  <Button 
                    type="submit" 
                    disabled={!title.trim()}
                    size="sm"
                    className="bg-primary hover:bg-primary-hover text-primary-foreground"
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
                  >
                    Cancel
                  </Button>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Press ⌘+Enter to add
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </Card>
  );
};