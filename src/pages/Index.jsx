import { TaskManager } from '@/components/TaskManager';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center py-4 bg-primary text-primary-foreground text-lg font-semibold mb-4 rounded-lg shadow-md">
        Task Flow ✨
        <br />
        Your personal hub for productivity. Let's get things done!
      </div>
      <TaskManager />
    </div>
  );
};

export default Index;