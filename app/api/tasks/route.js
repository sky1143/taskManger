import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// ✅ Fetch all tasks from MongoDB
export async function GET() {
    try {
        await connectToDatabase();
        const tasks = await Task.find({});
        return NextResponse.json(tasks.map(task => ({
            id: task._id.toString(),
            title: task.title,
            description: task.description,
            dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : null, 
            completed: task.completed,
        })));
    } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
    }
}

// ✅ Create a new task
export async function POST(req) {
    try {
        const data = await req.json();
        await connectToDatabase();

        if (!data.title || !data.description) {
            return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
        }

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
    } catch (error) {
        console.error("❌ Error creating task:", error);
        return NextResponse.json({ message: "Error creating task" }, { status: 500 });
    }
}

// ✅ Update a task by ID
export async function PATCH(req) {
    try {
        const urlParts = req.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];
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
        const urlParts = req.nextUrl.pathname.split("/");
        const id = urlParts[urlParts.length - 1];

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
