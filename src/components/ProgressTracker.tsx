import { Card } from '@/components/ui/card';

interface ProgressTrackerProps {
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
  todayTasks: number;
}

export const ProgressTracker = ({ totalTasks, completedTasks, progressPercentage, todayTasks }: ProgressTrackerProps) => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="sticky top-8 space-y-6">
      {/* Progress Circle */}
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-4">Overall Progress</h3>
        
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="hsl(var(--progress-bg))"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="hsl(var(--progress-fill))"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </Card>

      {/* Stats Cards */}
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Today's Tasks</p>
                <p className="text-xs text-muted-foreground">Focus for today</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-primary">{todayTasks}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Completed</p>
                <p className="text-xs text-muted-foreground">Tasks finished</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-secondary">{completedTasks}</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Total Tasks</p>
                <p className="text-xs text-muted-foreground">All time</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-accent">{totalTasks}</span>
          </div>
        </Card>
      </div>

      {/* Motivational Message */}
      {progressPercentage > 0 && (
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="text-center">
            <div className="text-lg mb-1">
              {progressPercentage === 100 ? '🎉' : progressPercentage >= 75 ? '🚀' : progressPercentage >= 50 ? '💪' : '🌟'}
            </div>
            <p className="text-sm font-medium text-foreground">
              {progressPercentage === 100 
                ? "Amazing! All tasks completed!"
                : progressPercentage >= 75 
                ? "Almost there! Keep going!"
                : progressPercentage >= 50 
                ? "Great progress! You're halfway!"
                : "Good start! Keep building momentum!"
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};