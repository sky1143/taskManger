import TaskForm from "@/components/TaskForm";
import  TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}