import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, TrendingUp, Trash2 } from 'lucide-react';

export function TaskStats({ stats, onClearCompleted }) {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      icon: Clock,
      label: 'Active',
      value: stats.active,
      color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
    },
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: stats.completed,
      color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: `${completionRate}%`,
      color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {stats.completed > 0 && (
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <button
            onClick={onClearCompleted}
            className="w-full p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear {stats.completed} Completed Task{stats.completed !== 1 ? 's' : ''}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}