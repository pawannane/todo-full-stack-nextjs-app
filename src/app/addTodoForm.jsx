"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const TodoForm = () => {
  const [task, setTask] = useState({title: "", description: ""})
  const router = useRouter()

  const handleTask = async(e) => {
    try {
      e.preventDefault();

      const res = await fetch("/api/newtask", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {"Content-Type": "application/json",},
      })

      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      
      toast.success(data.message);

      router.refresh()
      setTask({title: "", description: ""})
    } catch (error) {
      return toast.error(error.message);
    }
  }
  return (
    <div className='login'>
      <section>
        <form onSubmit={(e) => handleTask(e)}>
          <input type="text" placeholder='Enter task title' 
            onChange={(e) => setTask({...task, title: e.target.value})}
            value={task.title}
          />
          <input type="text" placeholder='Enter task description' 
            onChange={(e) => setTask({...task, description: e.target.value})}
            value={task.description}
          />
          <button type='submit'>Add Task</button>
        </form>
      </section>
    </div>
  )
}

export default TodoForm
