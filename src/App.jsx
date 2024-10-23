import  TodoList  from "./components/TodoList";
import { TodoProvider } from './context/TodoContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </BrowserRouter>
  );
}

export default App;