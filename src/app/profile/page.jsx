"use client"
import { Context } from '@/components/Clients';
import React, { useContext } from 'react'
import { redirect } from 'next/navigation';

const Profile = () => {
  const {user} = useContext(Context)
  if(!user._id) return redirect("/login");

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Your name: {user.name}</p>
      <p>Your Email: {user.email}</p>
    </div>
  )
}

export default Profile
