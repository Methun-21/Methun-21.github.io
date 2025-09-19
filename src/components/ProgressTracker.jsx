import { Card } from '@/components/ui/card';

export const ProgressTracker = ({ totalTasks, completedTasks, progressPercentage, todayTasks }) => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="sticky top-8 space-y-6">
      {/* Modern Progress Circle */}
      <div className="card-modern p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-6 text-glow">Progress Overview</h3>
        
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle with glow */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
              fill="transparent"
              opacity="0.3"
            />
            {/* Progress circle with gradient */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out drop-shadow-lg"
              style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))' }}
            />
            {/* SVG Gradient Definition */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Complete</div>
            </div>
          </div>
        </div>

        <p className="text-base text-muted-foreground">
          <span className="text-primary font-semibold">{completedTasks}</span> of <span className="text-foreground font-semibold">{totalTasks}</span> tasks completed
        </p>
      </div>

      {/* Modern Stats Cards */}
      <div className="space-y-4">
        <div className="card-modern p-5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Today's Focus</p>
                <p className="text-sm text-muted-foreground">Tasks for today</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-primary">{todayTasks}</span>
          </div>
        </div>

        <div className="card-modern p-5 border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Completed</p>
                <p className="text-sm text-muted-foreground">Finished tasks</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-secondary">{completedTasks}</span>
          </div>
        </div>

        <div className="card-modern p-5 border border-accent/20 hover:border-accent/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Total Tasks</p>
                <p className="text-sm text-muted-foreground">All time</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-accent">{totalTasks}</span>
          </div>
        </div>
      </div>

      {/* Modern Motivational Card */}
      {progressPercentage > 0 && (
        <div className="card-modern p-6 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-primary/30">
          <div className="text-center">
            <div className="text-3xl mb-3">
              {progressPercentage === 100 ? '🎉' : progressPercentage >= 75 ? '🚀' : progressPercentage >= 50 ? '💪' : '🌟'}
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">
              {progressPercentage === 100 
                ? "Outstanding! All tasks conquered!"
                : progressPercentage >= 75 
                ? "Incredible momentum! Nearly there!"
                : progressPercentage >= 50 
                ? "Fantastic progress! You're crushing it!"
                : "Great start! Building that momentum!"
              }
            </p>
            <p className="text-sm text-muted-foreground">
              Keep pushing forward, you're doing amazing!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};