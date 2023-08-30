import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
export default function Navbar() {

const [login, setlogin]= useState(false);

const handlelogin = () => {
  setlogin(!login);

}
  return (
    
<nav className="relative flex space-x-4 w-full flex-wrap items-center justify-around bg-neutral-100 py-3 shadow-lg text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start">
  <div className="ml-2">
    <Link href='/' className="text-3xl font-medium leading-tight text-primary">
      BDRIVE
    </Link>
  </div>
  {/* <div className="flex px-3">
    <input defaultValue="Search Here"/>
  </div> */}
  <div className="flex items-center">
    
        { login ? 
        (<div className="flex items-center space-x-4">
          <div>
            <input defaultValue="Search Here"/>
          </div>

          <div>
          <button 
            onClick={handlelogin}
            className="inline-block rounded p-1 bg-sky-500 text-white hover:bg-sky-600"
          > Sign Out</button>
          </div>
        
        </div> 
        
        ) : 
        (<div className="flex justify-between items-center space-x-4">
          <p>Welcome to BDrive! Please Login.</p>
          <button 
            onClick={handlelogin}
            className="inline-block rounded p-1 bg-sky-500 text-white hover:bg-sky-600"
          > Sign In</button> 
        </div>
        )}
  </div>
</nav>
    
  );
}