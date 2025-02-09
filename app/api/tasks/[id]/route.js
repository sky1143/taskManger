import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// ✅ Update a task by ID
export async function PATCH(req) {
    try {
        const url = new URL(req.url);  // ✅ Get full URL
        const id = url.pathname.split("/").pop();  // ✅ Extract ID from path

        const updatedData = await req.json();
        await connectToDatabase();

        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: updatedTask._id.toString(),
            title: updatedTask.title,
            description: updatedTask.description,
            dueDate: updatedTask.dueDate ? updatedTask.dueDate.toISOString() : null,
            completed: updatedTask.completed,
        });
    } catch (error) {
        console.error("❌ Error updating task:", error);
        return NextResponse.json({ message: "Error updating task" }, { status: 500 });
    }
}

// ✅ Delete a task by ID
export async function DELETE(req) {
    try {
        const url = new URL(req.url);  // ✅ Get full URL
        const id = url.pathname.split("/").pop();  // ✅ Extract ID from path

        await connectToDatabase();
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting task:", error);
        return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
    }
}
