import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  const addTask = useCallback((taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  }, [updateTask, tasks]);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, [setTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    stats,
  };
}