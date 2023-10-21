import React from "react"
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative flex w-full flex-wrap items-center bg-gray-900 text-white py-3 px-3 shadow-lg lg:flex-wrap lg:justify-start">
    <ul className="flex px-3 space-x-4 items-center">
      <li className="transition ease-in-out delay-50 hover:bg-gray-700 p-2 rounded-md">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded-md">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
        <button className="p-2 bg-sky-500 rounded-md text-white" type="button">Sign In</button>
        </li>
    </ul>
    
    </nav>
    
  );
}
