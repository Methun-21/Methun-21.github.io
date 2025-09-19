import { Button } from '@/components/ui/button';

export const Navigation = ({ currentView, onViewChange, taskCounts }) => {
  const navItems = [
    {
      key: 'today',
      label: 'Today',
      count: taskCounts.today,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      key: 'completed',
      label: 'Completed',
      count: taskCounts.completed,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      key: 'all',
      label: 'All Tasks',
      count: taskCounts.all,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ];

  return (
    <nav className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
      {navItems.map((item) => (
        <Button
          key={item.key}
          onClick={() => onViewChange(item.key)}
          variant={currentView === item.key ? "default" : "ghost"}
          className={`flex items-center gap-2 text-sm transition-all duration-200 ${
            currentView === item.key 
              ? 'bg-background shadow-sm' 
              : 'hover:bg-background/50'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
          <span className={`px-2 py-0.5 text-xs rounded-full transition-colors ${
            currentView === item.key
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted-foreground/20 text-muted-foreground'
          }`}>
            {item.count}
          </span>
        </Button>
      ))}
    </nav>
  );
};