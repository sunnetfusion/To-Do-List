import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Clock, AlertCircle } from 'lucide-react';

export function TaskItem({ task, onToggle, onDelete }) {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const priorityColors = {
    low: 'border-l-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10',
    medium: 'border-l-amber-400 bg-amber-50/50 dark:bg-amber-900/10',
    high: 'border-l-red-400 bg-red-50/50 dark:bg-red-900/10',
  };

  const priorityDots = {
    low: 'bg-emerald-400',
    medium: 'bg-amber-400',
    high: 'bg-red-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${priorityColors[task.priority]} ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <motion.button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed 
                ? 'bg-indigo-500 border-indigo-500' 
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-medium text-gray-900 dark:text-white ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
                <motion.button
                  onClick={() => onDelete(task.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {task.description && (
              <p className={`mt-1 text-sm text-gray-600 dark:text-gray-400 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}

            <div className="mt-2 flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                <Clock className="w-4 h-4" />
                <span>
                  {task.dueDate.toLocaleDateString()}
                  {isOverdue && ' (Overdue)'}
                  {!task.completed && daysUntilDue > 0 && daysUntilDue <= 3 && ` (${daysUntilDue} days left)`}
                </span>
              </div>

              <span className="text-xs text-gray-400 dark:text-gray-500 capitalize flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {task.priority} priority
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}