import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// Update a task by ID
export async function PATCH(req) {
    const updatedData = await req.json();
    await connectToDatabase();

    // Extract ID from URL
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    
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
export async function DELETE(req) {
    await connectToDatabase();

    // Extract ID from URL
    const urlParts = req.nextUrl.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted" });
}
