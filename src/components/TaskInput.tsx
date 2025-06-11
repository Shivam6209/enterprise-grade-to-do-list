import { useState } from 'react';
import { Task } from '@/types/task';
import { parseTask } from '@/lib/taskParser';
import { Sparkles, Send } from 'lucide-react';

interface TaskInputProps {
  onTaskAdd: (task: Task) => void;
}

export function TaskInput({ onTaskAdd }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const parsedTask = parseTask(input);
    if (parsedTask) {
      onTaskAdd(parsedTask);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Add a New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try: 'High priority meeting with John tomorrow at 2pm'"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <p className="font-medium mb-2">AI understands:</p>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <li className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Natural dates
            </li>
            <li className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Priorities (P1-P4)
            </li>
            <li className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Context
            </li>
            <li className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Categories
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
} 