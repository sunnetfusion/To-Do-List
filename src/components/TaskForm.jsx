import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, AlertCircle } from 'lucide-react';

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate),
      completed: false,
      priority,
    });

    setTitle('');
    setDescription('');
    setDueDate(new Date().toISOString().split('T')[0]);
    setPriority('medium');
    setIsExpanded(false);
  };

  const priorityColors = {
    low: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
    medium: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
    high: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex gap-3 items-start">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            onFocus={() => setIsExpanded(true)}
          />
          <motion.button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
            />

            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-500" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${priorityColors[priority]}`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!title.trim()}
              className="w-full px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-xl font-medium transition-colors duration-200 disabled:cursor-not-allowed"
              whileHover={{ scale: title.trim() ? 1.02 : 1 }}
              whileTap={{ scale: title.trim() ? 0.98 : 1 }}
            >
              Add Task
            </motion.button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}