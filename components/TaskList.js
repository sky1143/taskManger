'use client';

import { useEffect, useState } from "react";

export default function TaskList()  {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch("/api/tasks");
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        }
        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div className="mt-4">
            {tasks.map(task => (
                <div key={task.id} className="border p-4 mb-2 flex justify-between items-center">
                    <div>
                        <h3 className={`text-lg font-bold ${task.completed ? "line-through" : ""}`}>
                            {task.title}
                        </h3>
                        <p>{task.description}</p>
                        <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toDateString()}</p>
                    </div>
                    <div>
                        <button
                            onClick={async () => {
                                await fetch(`/api/tasks/${task.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ completed: !task.completed })
                                });
                            }}
                            className={`p-2 rounded ${task.completed ? "bg-green-500" : "bg-yellow-500"} text-white`}
                        >
                            {task.completed ? "Completed" : "Mark Done"}
                        </button>
                        <button
                            onClick={async () => {
                                await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
                                setTasks(tasks.filter(t => t.id !== task.id));
                            }}
                            className="ml-2 p-2 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
