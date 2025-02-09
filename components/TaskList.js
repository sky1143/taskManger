'use client';

export default function TaskList({ tasks, loading, updateTask }) {
    if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;

    return (
        <div className="mt-4 space-y-4">
            {tasks.map(task => (
                <div key={task.id} className="border p-4 rounded shadow-md bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="w-full sm:w-auto">
                        <h3 className={`text-lg font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>
                            {task.title}
                        </h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <p className="text-xs text-gray-400">
                        Due: {task.dueDate ? new Date(task.dueDate).toDateString() : "No Due Date"}  {/* ✅ Fix date display */}
                        </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex space-x-2">
                        <button
                            onClick={async () => {
                                const response = await fetch(`/api/tasks/${task.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ completed: !task.completed })
                                });
                                const updatedTask = await response.json();
                                updateTask(task.id, updatedTask);
                            }}
                            className={`px-4 py-2 rounded text-white text-sm ${task.completed ? "bg-green-500" : "bg-yellow-500"} hover:opacity-80`}
                        >
                            {task.completed ? "Completed" : "Mark Done"}
                        </button>
                        <button
                            onClick={async () => {
                                await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
                                updateTask(task.id, null);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:opacity-80"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
