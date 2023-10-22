"use client"
import { Context } from '@/components/Clients';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { redirect } from "next/navigation";

const Login = () => {
  const [currentUser, setcurrentUser] = useState({ name: "", email: "", password: "" });
  const {user, setUser} = useContext(Context);

  const handleLogin = async(e) => {
    try {
      e.preventDefault();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(currentUser),
        headers: {"Content-Type": "application/json",},
      })

      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      
      toast.success(data.message);
      setUser(data.user)
    } catch (error) {
      toast.error(error.message);
    }
  }

  if(user._id) return redirect("/");

  return (
    <div className='login'>
      <section>
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder='Enter your email' 
          onChange={(e) => setcurrentUser({ ...currentUser, email: e.target.value })}
          value={currentUser.email}
          />
          <input type="password" placeholder='Enter your password' 
          onChange={(e) => setcurrentUser({ ...currentUser, password: e.target.value })}
          value={currentUser.password}
          />
          <button type='submit'>Login</button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  )
}

export default Login
