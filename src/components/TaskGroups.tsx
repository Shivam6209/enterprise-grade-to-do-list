'use client';

import { useEffect, useState } from 'react';
import { Task } from '@/types/task';
import { TaskGroup, GroupSuggestion } from '@/types/taskGroup';
import { suggestTaskGroups } from '@/lib/services/geminiService';
import { Brain, ChevronDown, ChevronRight } from 'lucide-react';

interface TaskGroupsProps {
  tasks: Task[];
}

export function TaskGroups({ tasks }: TaskGroupsProps) {
  const [suggestion, setSuggestion] = useState<GroupSuggestion | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateGroups = async () => {
      if (tasks.length === 0) {
        setSuggestion(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await suggestTaskGroups(tasks);
        setSuggestion(result);
      } catch (err) {
        setError('Failed to generate task groups. Please try again later.');
        console.error('Error generating task groups:', err);
      } finally {
        setLoading(false);
      }
    };

    updateGroups();
  }, [tasks]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  if (tasks.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
          <h2 className="text-lg font-semibold text-gray-900">Analyzing Tasks...</h2>
        </div>
        <p className="text-sm text-gray-500">
          AI is analyzing your tasks to suggest meaningful groups...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-red-100">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">Analysis Failed</h2>
        </div>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!suggestion || suggestion.groups.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">No Groups Found</h2>
        </div>
        <p className="text-sm text-gray-500">
          Add more tasks to see AI-suggested groupings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Smart Groups</h2>
        </div>
        <span className="text-sm text-gray-500">
          Last updated: {new Date(suggestion.timestamp).toLocaleTimeString()}
        </span>
      </div>

      <div className="space-y-2">
        {suggestion.groups.map((group) => (
          <div
            key={group.id}
            className="bg-white rounded-lg border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedGroups.has(group.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">{group.name}</h3>
                  <p className="text-xs text-gray-500">{group.tasks.length} tasks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    group.confidence >= 0.8
                      ? 'bg-green-100 text-green-700'
                      : group.confidence >= 0.7
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {Math.round(group.confidence * 100)}% confidence
                </span>
              </div>
            </button>

            {expandedGroups.has(group.id) && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                <ul className="space-y-2">
                  {group.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="text-sm text-gray-900 flex items-center gap-2"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          task.completed
                            ? 'bg-gray-300'
                            : task.priority === 'P1'
                            ? 'bg-red-500'
                            : task.priority === 'P2'
                            ? 'bg-orange-500'
                            : task.priority === 'P3'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      />
                      <span className={task.completed ? 'line-through text-gray-500' : ''}>
                        {task.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 