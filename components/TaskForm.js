'use client';

import { useState } from 'react';

export default function TaskForm({ addTask }) { // ✅ Receive addTask function
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            dueDate: new Date(formData.get('dueDate')).toISOString(), // ✅ Fix date format
        };

        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) throw new Error("❌ Failed to save task");

            const newTask = await response.json();
            addTask(newTask);  // ✅ Update UI immediately
            event.target.reset();
        } catch (error) {
            console.error("❌ Error saving task:", error);
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name='title'
                placeholder='Task title'
                required
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <textarea
                name='description'
                placeholder='Task description'
                required
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
                type='date'
                name='dueDate'
                required
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <button
                type='submit'
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
                {loading ? "Creating..." : "Add Task"}
            </button>
        </form>
    );
}
