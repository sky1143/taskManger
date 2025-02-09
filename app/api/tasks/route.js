import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";

// ✅ Fetch all tasks
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
