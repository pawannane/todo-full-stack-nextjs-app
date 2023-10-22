"use client";
import Link from "next/link";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    fetch("/api/auth/me")
    .then((res) => res.json())
    .then((data) => {
      if(data.success) setUser(data.user)
    })
  }, [])
  
  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const router = useRouter()

  const logoutHandler = async() => {
    try {
      const res = await fetch("/api/auth/logout")
      const data = await res.json();

      if(!data.success) return toast.error(data.message);

      setUser({})
      toast.success(data.message);

      router.refresh()
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
      user._id ? (
        <button className="btn" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <Link href={"/login"}>login</Link>
      )
  );
};

export const TodoBtn = ({id, completed}) => {
  const router = useRouter()

  const deleteHandler = async(id) => {
    try {
      const res = await fetch(`/api/deletetask?${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",},
      })

      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      
      toast.success(data.message);
      router.refresh()
    } catch (error) {
      return toast.error(error.message);
    }
  }

  const updateHanlder = async(id) => {
    try {
      const res = await fetch(`/api/updatetask?${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
      })

      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      
      toast.success(data.message);
      router.refresh()
    } catch (error) {
      return toast.error(error.message);
    }
  }

  return (
    <>
      <input type="checkbox" checked={completed} onChange={() => updateHanlder(id)} />
      <button className="btn" onClick={() => deleteHandler(id)}>Delete</button>
    </>
  )
}
