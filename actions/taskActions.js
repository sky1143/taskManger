'use server';

import { connectToDatabase } from "@/lib/mongodb";

import Task from "@/models/task";

// Function to create a new task
export async function createTask(formData) {
    await connectToDatabase();
      // Connect to MongoDB before performing any operations.


const newTask = await Task.create({
    title: formData.get('title'),
    description: formData.get('description'),
    duedate: formData.get('dueDate'),
});

return {
    id: newTask._id.toString(), // Convert ObjectId to string
    title: newTask.title,
    description: newTask.description,
    duedate: newTask.duedate,
    createdAt: newTask.createdAt?.toISOString(), // Convert date to string
    updatedAt: newTask.updatedAt?.toISOString(),
};

}

//Function to fetch all task from the database

export async function fetchTask() {
  await connectToDatabase();


  const tasks = await Task.find({}).lean(); // Convert to plain objects

  return tasks.map(task => ({
      id: task._id.toString(), // Convert ObjectId to string
      title: task.title,
      description: task.description,
      duedate: task.duedate,
      createdAt: task.createdAt?.toISOString(), // Convert date to string
      updatedAt: task.updatedAt?.toISOString(),
  }));

}

// Function to update a task by its ID

export async function updateTask(id, updatedData) {
    await connectToDatabase();
    
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true }).lean();

    return updatedTask ? {
        id: updatedTask._id.toString(),
        title: updatedTask.title,
        description: updatedTask.description,
        duedate: updatedTask.duedate,
        createdAt: updatedTask.createdAt?.toISOString(),
        updatedAt: updatedTask.updatedAt?.toISOString(),
    } : null;
}

export async function deleteTask(id) {
    await connectToDatabase();

    const deletedTask = await Task.findByIdAndDelete(id).lean();

    return deletedTask ? {
        id: deletedTask._id.toString(),
        title: deletedTask.title,
        description: deletedTask.description,
        duedate: deletedTask.duedate,
        createdAt: deletedTask.createdAt?.toISOString(),
        updatedAt: deletedTask.updatedAt?.toISOString(),
    } : null;
}

