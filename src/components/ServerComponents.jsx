import React from 'react'
import { TodoBtn } from './Clients'
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

export const TodoItem = ({title, description, id, completed}) => {
  return (
    <div className='todo'>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div>
        <TodoBtn id={id} completed={completed} />
      </div>
    </div>
  )
}

const getTasks = async(token) => {
  try {
    const res = await fetch(`${process.env.HOST}/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`
      }
    })

    const data = await res.json();

    if(!data.success) return [];

    return data.tasks
  } catch (error) {
    console.error(error.message);
    return []
  }
}

export const Todos = async() => {
  const token = cookies().get("token")?.value;
  if(!token) return redirect("/login");

  const tasks = await getTasks(token);
  return(
    <section className='todosContainer'>
      {tasks?.map((task) => (
        <TodoItem 
          key={task._id}
          title={task.title} 
          description={task.description} 
          id={task._id} 
          completed={task.isCompleted} 
        />
      ))}
    </section>
  )
}