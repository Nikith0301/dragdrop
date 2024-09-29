import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

function App() {
  const [draggedId, setDraggedId] = useState(null);
  const [data, setData] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleDrag(event) {
    event.preventDefault();
  }

  function handleEnter(color) {
    const toChangeIndex = tasks.findIndex((task) => task.uid === draggedId);
    if (toChangeIndex === -1) return;

    const updatedTask = { ...tasks[toChangeIndex], tag: color }; // Update task color
    const updatedTasks = [...tasks]; // Copy tasks array
    updatedTasks[toChangeIndex] = updatedTask; // Replace the specific task
    setTasks(updatedTasks); // Set new state
  }

  function handleDrop(event) {
    event.preventDefault();
    // Drop logic (if needed)
    console.log('Item dropped');
  }

  function handleStart(uid) {
    setDraggedId(uid); // Track the ID of the dragged task
    console.log('Dragging task with ID:', uid);
  }

  function addData() {
    setTasks((prevTasks) => [
      ...prevTasks,
      { data: data, tag: 'green', uid: uuidv4() },
    ]);
    setData(''); // Clear input after adding
  }

  return (
    <div className='bg-red-300 h-screen flex flex-col justify-center items-center'>
      <input
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder='Add a task'
      />
      <button onClick={addData}>Add Task</button>

      <div
        onDragOver={handleDrag}
        className='bg-green-300 h-[200px] w-[200px] mt-5 flex flex-col items-center justify-center'
        onDragEnter={() => handleEnter('green')}
        onDrop={handleDrop}
      >
        {tasks
          .filter((task) => task.tag === 'green')
          .map((task, idx) => (
            <p
              key={task.uid}
              onDragStart={() => handleStart(task.uid)}
              id={task.uid}
              draggable='true'
            >
              {task.data}
            </p>
          ))}
      </div>

      <div
        onDragOver={handleDrag}
        onDragEnter={() => handleEnter('blue')}
        onDrop={handleDrop}
        className='bg-blue-300 h-[200px] w-[200px] mt-7 flex flex-col items-center justify-center'
      >
        {tasks
          .filter((task) => task.tag === 'blue')
          .map((task, idx) => (
            <p
              key={task.uid}
              onDragStart={() => handleStart(task.uid)}
              id={task.uid}
              draggable='true'
            >
              {task.data}
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;
