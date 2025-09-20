import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Check, Pencil, Trash2 } from 'lucide-react';

export const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="p-6 group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-start gap-4">
        {/* Modern Completion Toggle */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-gradient-to-br from-secondary to-accent border-secondary text-white shadow-lg'
              : 'border-border hover:border-primary group-hover:border-primary hover:scale-110'
          }`}
        >
          {task.completed && <Check className="w-5 h-5" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                className="font-medium text-lg"
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description (optional)"
                rows={3}
                className="text-base"
              />
              <div className="flex gap-3">
                <Button size="sm" onClick={handleSave} className="btn-primary">
                  Save Changes
                </Button>
                <Button size="sm" onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`font-semibold text-xl transition-all duration-300 ${
                task.completed 
                  ? 'line-through text-muted-foreground opacity-70' 
                  : 'text-foreground'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-base mt-2 transition-all duration-300 ${
                  task.completed 
                    ? 'line-through text-muted-foreground opacity-70' 
                    : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  Created {formatDate(task.createdAt)}
                  {task.completedAt && (
                    <span className="text-secondary ml-3 font-medium">
                      ✓ Completed {formatDate(task.completedAt)}
                    </span>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modern Action Buttons */}
        {!isEditing && (
          <div className="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-10 w-10 p-0 hover:bg-accent/20 hover:text-accent rounded-full"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-10 w-10 p-0 hover:bg-destructive/20 hover:text-destructive rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};