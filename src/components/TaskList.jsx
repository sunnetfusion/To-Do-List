import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <CheckCircle2 className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Add a new task to get started with your productivity journey!
          </p>
        </div>
      </motion.div>
    );
  }

  const sortedTasks = tasks.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}