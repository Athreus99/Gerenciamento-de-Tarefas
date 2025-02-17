import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Gerenciador de Tarefas
        </h1>
        <TodoList />
      </div>
    </main>
  );
}