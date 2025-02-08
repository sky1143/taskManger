import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// Fetch all tasks
export async function GET() {
    await connectToDatabase();
    const tasks = await Task.find({}).lean();
    return NextResponse.json(tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        duedate: task.dueDate,
        completed: task.completed,
        createdAt: task.createdAt?.toISOString(),
        updatedAt: task.updatedAt?.toISOString(),
    })));
}

// Create a task
export async function POST(req) {
    const data = await req.json();
    await connectToDatabase();
    const newTask = await Task.create(data);
    return NextResponse.json({
        id: newTask._id.toString(),
        title: newTask.title,
        description: newTask.description,
        duedate: newTask.dueDate,
        completed: newTask.completed,
        createdAt: newTask.createdAt?.toISOString(),
        updatedAt: newTask.updatedAt?.toISOString(),
    });
}
