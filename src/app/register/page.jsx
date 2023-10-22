"use client";
import { Context } from "@/components/Clients";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const Register = () => {
  const [currentUser, setcurrentUser] = useState({ name: "", email: "", password: "" });
  const {user, setUser} = useContext(Context);

  const handleRegister = async(e) => {
    try {
      e.preventDefault();

      const res = await fetch("/api/auth/register", {
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
    <div className="login">
      <section>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setcurrentUser({ ...currentUser, name: e.target.value })}
            value={currentUser.name}
          />
          <input type="email" placeholder="Enter your email" 
            onChange={(e) => setcurrentUser({ ...currentUser, email: e.target.value })}
            value={currentUser.email}
          />
          <input type="password" placeholder="Enter your password" 
            onChange={(e) => setcurrentUser({ ...currentUser, password: e.target.value })}
            value={currentUser.password}
          />
          <button type="submit">sign up</button>
          <p>OR</p>
          <Link href={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
