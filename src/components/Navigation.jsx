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
    <nav className="card-modern p-2">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Button
            key={item.key}
            onClick={() => onViewChange(item.key)}
            variant={currentView === item.key ? "default" : "ghost"}
            className={`flex items-center gap-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${
              currentView === item.key 
                ? 'btn-primary text-white shadow-lg' 
                : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className={`transition-transform duration-300 ${currentView === item.key ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className="font-semibold">{item.label}</span>
            <span className={`px-3 py-1 text-xs rounded-full font-bold transition-all duration-300 ${
              currentView === item.key
                ? 'bg-white/20 text-white backdrop-blur-sm'
                : 'bg-muted text-muted-foreground'
            }`}>
              {item.count}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
};