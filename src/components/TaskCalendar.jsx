import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

export function TaskCalendar({ tasks, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getTasksForDate = (date) => {
    return tasks.filter(task => 
      task.dueDate.toDateString() === date.toDateString()
    );
  };

  const getTileContent = ({ date }) => {
    const dayTasks = getTasksForDate(date);
    if (dayTasks.length === 0) return null;

    const completedCount = dayTasks.filter(t => t.completed).length;
    const pendingCount = dayTasks.length - completedCount;

    return (
      <div className="flex justify-center gap-1 mt-1">
        {pendingCount > 0 && (
          <div className="w-2 h-2 bg-indigo-500 rounded-full" />
        )}
        {completedCount > 0 && (
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        )}
      </div>
    );
  };

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-left hover:text-indigo-500 transition-colors duration-200"
        >
          <CalendarIcon className="w-5 h-5" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Task Calendar
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4">
          <div className="react-calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileContent={getTileContent}
              className="w-full border-none"
              nextLabel={<ChevronRight className="w-4 h-4" />}
              prevLabel={<ChevronLeft className="w-4 h-4" />}
            />
          </div>

          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Tasks for {selectedDate.toLocaleDateString()}
              </h4>
              {getTasksForDate(selectedDate).length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tasks scheduled for this date
                </p>
              ) : (
                <ul className="space-y-2">
                  {getTasksForDate(selectedDate).map(task => (
                    <li
                      key={task.id}
                      className={`text-sm flex items-center gap-2 ${
                        task.completed 
                          ? 'text-gray-500 dark:text-gray-400 line-through' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        task.completed ? 'bg-emerald-400' : 'bg-indigo-400'
                      }`} />
                      {task.title}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}