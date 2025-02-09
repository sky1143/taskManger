'use client';

import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch tasks when page loads
    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch("/api/tasks");
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        }
        fetchTasks();
    }, []);

    // Function to add a new task instantly
    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
        
    };

    // Function to update or delete a task instantly
    const updateTask = (taskId, updatedData) => {
        if (updatedData === null) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId)); // ✅ Remove from UI
        } else {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, ...updatedData } : task
                )
            );
        }
    };

    return (
        <main className="max-w-lg mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} loading={loading} updateTask={updateTask} />
    </main>
    );
}
