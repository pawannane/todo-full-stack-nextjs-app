import { LogoutBtn } from '@/components/Clients'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='header'>
      <div>
        <h2>Todo</h2>
      </div>
      <article>
        <Link href={"/"}>home</Link>
        <Link href={"/profile"}>profile</Link>
        {/* <Link href={"/login"}>login</Link> */}
        <LogoutBtn />
      </article>
    </header>
  )
}

export default Header
