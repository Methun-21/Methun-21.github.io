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
    <Card className="p-4 transition-all duration-300 hover:shadow-[var(--shadow-medium)] group">
      <div className="flex items-start gap-3">
        {/* Completion Toggle */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-secondary border-secondary text-white'
              : 'border-border hover:border-primary group-hover:border-primary'
          }`}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                className="font-medium"
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description (optional)"
                rows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} variant="default">
                  Save
                </Button>
                <Button size="sm" onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`font-medium text-lg transition-all duration-300 ${
                task.completed 
                  ? 'line-through text-muted-foreground' 
                  : 'text-foreground'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 transition-all duration-300 ${
                  task.completed 
                    ? 'line-through text-muted-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  Created {formatDate(task.createdAt)}
                  {task.completedAt && (
                    <span className="text-success ml-2">
                      ✓ Completed {formatDate(task.completedAt)}
                    </span>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};