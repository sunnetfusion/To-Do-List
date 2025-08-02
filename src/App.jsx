import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterTabs } from './components/FilterTabs';
import { TaskCalendar } from './components/TaskCalendar';
import { TaskStats } from './components/TaskStats';
import { useTasks } from './hooks/useTasks';

function AppContent() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    stats,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Task Scheduler
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your day, achieve your goals
              </p>
            </div>
          </div>
          <ThemeToggle />
        </motion.header>

        {/* Task Form */}
        <div className="mb-8">
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TaskStats stats={stats} onClearCompleted={clearCompleted} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Tabs */}
            <FilterTabs
              currentFilter={filter}
              onFilterChange={setFilter}
              stats={stats}
            />

            {/* Task List */}
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TaskCalendar tasks={allTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;