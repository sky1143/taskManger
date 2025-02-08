'use client';

import { useState } from 'react';

export default function TaskForm() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            dueDate: formData.get('dueDate'),
        };

        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData)
        });

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='title' placeholder='Task title' required className='p-2 border rounded w-full mb-2' />
            <textarea name='description' placeholder='Task description' required className='p-2 border rounded w-full mb-2' />
            <input type='date' name='dueDate' className='p-2 border rounded w-full mb-2' />
            <button type='submit' disabled={loading} className="bg-blue-500 text-white p-2 rounded">
                {loading ? "Creating..." : "Add Task"}
            </button>
        </form>
    );
}
