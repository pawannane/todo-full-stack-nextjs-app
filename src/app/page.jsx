import React, { Suspense } from 'react'
import Form from './addTodoForm'
import { Todos } from '@/components/ServerComponents'
import Loading from './loading'

const Home = () => {
  return (
    <div className='container'>
      <Form />
      <Suspense fallback={<Loading />}>
        <Todos />
      </Suspense>
    </div>
  )
}

export default Home
