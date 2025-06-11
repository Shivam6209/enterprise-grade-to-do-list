'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { TaskGroups } from '@/components/TaskGroups';
import { Brain, Sparkles, ListTodo } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                {process.env.NEXT_PUBLIC_APP_NAME || 'Natural Language Task Manager'}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4" />
              <span>Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* AI Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Natural Language Input</h2>
            </div>
            <p className="text-sm text-gray-600">
              Add tasks using natural language. Our AI understands context, dates, and priorities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Smart Grouping</h2>
            </div>
            <p className="text-sm text-gray-600">
              AI-powered task grouping suggests related tasks and identifies patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ListTodo className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="font-semibold text-gray-900">Priority Detection</h2>
            </div>
            <p className="text-sm text-gray-600">
              Automatic priority assignment based on task context and urgency.
            </p>
          </div>
        </div>

        {/* Task Input */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <TaskInput onTaskAdd={handleAddTask} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Task List */}
          <div className="lg:col-span-3">
            <TaskList tasks={tasks} onTaskUpdate={handleUpdateTask} />
          </div>

          {/* AI Suggestions */}
          <div className="lg:col-span-2">
            <TaskGroups tasks={tasks} />
          </div>
        </div>
      </main>
    </div>
  );
}
