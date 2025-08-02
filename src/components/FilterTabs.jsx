import React from 'react';
import { motion } from 'framer-motion';

export function FilterTabs({ currentFilter, onFilterChange, stats }) {
  const filters = [
    { key: 'all', label: 'All Tasks', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
      <div className="grid grid-cols-3 gap-1">
        {filters.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentFilter === filter.key
                ? 'text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentFilter === filter.key && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-indigo-500 rounded-xl"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              {filter.label}
              <span className={`text-xs px-2 py-1 rounded-full ${
                currentFilter === filter.key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {filter.count}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}