import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]);// 1- State mal initialisé

  const [loading, setLoading] = useState(false); // 2- State mal initialisé

  const [error, setError] = useState(null); // 3- State mal initialisé

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos" //API incorrecte pour les todos
      );
      const data = await response.json();
      setTodos(data.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (text) => {
    const newTodo = [
      {
        id: Date.now(),
        title: text.title,
        description: text.description,
        priority: text.priority,
        dueDate: text.dueDate,           // les données du nouveau todo n'etait pas dans un tableau
        completed: false,
      },
    ]
     
    ;
    todos.push(newTodo);
    setTodos((prev) => [...prev, newTodo]);

  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  
  

  const deleteTodo = (id) => {   // 5- implémentation de la fonction de suppression
   const deletedTodos = todos.filter((todo) => todo.id !== id);
   setTodos(deletedTodos);
   return deletedTodos;
  }
  ;

  const updateTodo = (id, newText) => { // 4- implémentation de la fonction de mise à jour
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, title:newText, description:newDescripion} : t
      )
    );


    

  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App - Test Technique</h1>
        <p>Trouvez et corrigez les bugs !</p>
      </header>

      <main className="App-main">
        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />

        <TodoStats todos={todos} />
      </main>
    </div>
  );
}

export default App;


