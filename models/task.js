import mongoose from "mongoose";


// Defining the schema for the Task model
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: String,
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);