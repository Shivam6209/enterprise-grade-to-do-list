import { format } from 'date-fns';
import { Task } from '@/types/task';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
}

const priorityColors = {
  P1: 'bg-red-100 text-red-700 border-red-200',
  P2: 'bg-orange-100 text-orange-700 border-orange-200',
  P3: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  P4: 'bg-green-100 text-green-700 border-green-200',
};

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then by priority
    const priorityOrder = { P1: 0, P2: 1, P3: 2, P4: 3 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    // Finally by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  const toggleTaskCompletion = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      onTaskUpdate({ ...task, completed: !task.completed });
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
        <div className="max-w-sm mx-auto space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
          <p className="text-sm text-gray-500">
            Try adding a task using natural language like "High priority meeting with John tomorrow at 2pm"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
        <span className="text-sm text-gray-500">{tasks.length} tasks</span>
      </div>

      <div className="space-y-2">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-lg p-4 border transition-all ${
              task.completed ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className="mt-1 text-gray-400 hover:text-blue-600 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                  <h3
                    className={`text-sm font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  {task.dueTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(task.dueTime), 'h:mm a')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 