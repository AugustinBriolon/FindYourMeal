import { useState } from "react";
import { Heading } from "@radix-ui/themes"
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className='grid grid-cols-2  sm:grid-cols-header w-full p-4 border-b'>
      <Link className="flex items-center justify-center space-x-2" to="/">
        <img src="/favicon/favicon.ico" alt="Logo d'un cerveau vu du haut" className="h-8" />
        <Heading as="h1" size="5">Get your Meal</Heading>
      </Link>

      <nav className="items-center justify-center space-x-4 hidden sm:flex">
        <Link to="/" className="text-primary hover:text-secondary">Home</Link>
        <Link to="/area" className="text-primary hover:text-secondary">Area</Link>
        <Link to="/category" className="text-primary hover:text-secondary">Category</Link>
      </nav>

      <div className='items-center justify-end space-x-4 hidden sm:flex'>
        <DarkMode />
      </div>

      <div className="flex items-center justify-end space-x-4 sm:hidden">
        <DarkMode />
        <button onClick={handleNav}>
          {isNavOpen ? <Cross1Icon className="w-auto h-18" color="#ec4e20" /> : <HamburgerMenuIcon className="w-auto h-18" color="#ec4e20" />}
        </button>
      </div>
      <div className={`flex flex-col items-center justify-center space-y-4 sm:hidden absolute h-screen w-full top-0 left-0 bg-white z-10 transition-all duration-300 ${isNavOpen ? 'flex' : 'hidden'}`}>
        <button onClick={handleNav}>
          {isNavOpen ? <Cross1Icon className="w-auto h-18" color="#ec4e20" /> : <HamburgerMenuIcon className="w-auto h-18" color="#ec4e20" />}
        </button>
        <Link to="/" className="text-primary hover:text-secondary" onClick={handleNav}>Home</Link>
        <Link to="/area" className="text-primary hover:text-secondary" onClick={handleNav}>Area</Link>
        <Link to="/category" className="text-primary hover:text-secondary" onClick={handleNav}>Category</Link>
      </div>
    </header>
  )
}