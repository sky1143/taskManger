import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// Update a task by ID
export async function PATCH(req, { params }) {
    const updatedData = await req.json();
    await connectToDatabase();
    const updatedTask = await Task.findByIdAndUpdate(params.id, updatedData, { new: true }).lean();
    
    return NextResponse.json({
        id: updatedTask._id.toString(),
        title: updatedTask.title,
        description: updatedTask.description,
        duedate: updatedTask.dueDate,
        completed: updatedTask.completed,
        createdAt: updatedTask.createdAt?.toISOString(),
        updatedAt: updatedTask.updatedAt?.toISOString(),
    });
}

// Delete a task by ID
export async function DELETE(req, { params }) {
    await connectToDatabase();
    await Task.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Task deleted" });
}
