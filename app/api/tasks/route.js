import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// ✅ Fetch all tasks from MongoDB
export async function GET() {
    await connectToDatabase();
    const tasks = await Task.find({});
    return NextResponse.json(tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null, // ✅ Ensure correct date format
        completed: task.completed,
    })));
}

// ✅ Create a new task
export async function POST(req) {
    const data = await req.json();
    await connectToDatabase();

    const newTask = new Task({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        completed: data.completed || false,
    });

    const savedTask = await newTask.save();
    
    console.log("✅ Task saved to MongoDB:", savedTask);
    return NextResponse.json({
        id: savedTask._id.toString(),
        title: savedTask.title,
        description: savedTask.description,
        dueDate: savedTask.dueDate ? savedTask.dueDate.toISOString() : null,
        completed: savedTask.completed,
    });
}

// ✅ Update a task by ID
export async function PATCH(req) {
    const updatedData = await req.json();
    await connectToDatabase();

    const id = req.nextUrl.pathname.split("/").pop();
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });

    return NextResponse.json({
        id: updatedTask._id.toString(),
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        completed: updatedTask.completed,
    });
}

// ✅ Delete a task by ID
export async function DELETE(req) {
    await connectToDatabase();
    const id = req.nextUrl.pathname.split("/").pop();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" });
}
