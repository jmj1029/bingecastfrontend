"use client";
import 'flowbite/dist/flowbite.css';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");  // Clear token or session data
    router.push("/");  // Redirect to homepage after sign-out
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BingeCast</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/sign-in">Sign In</Link>  {/* Fixed Link usage */}
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/sign-up">Sign Up</Link>  {/* Fixed Link usage */}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to BingeCast</h1>
        <p className="text-2xl">Your favorite podcasts, all in one place.</p>
      </section>

      {/* Featured Episodes Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Featured Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
            {/* Episode 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
              <img src="/public/file.svg" alt="Podcast 1" className="mb-4 w-full h-48 object-cover rounded" />
              <h3 className="text-2xl font-bold mb-2">Podcast Episode 1</h3>
              <p className="text-gray-600">A short description of the first podcast episode.</p>
            </div>
            {/* Episode 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
              <img src="/public/file.svg" alt="Podcast 2" className="mb-4 w-full h-48 object-cover rounded" />
              <h3 className="text-2xl font-bold mb-2">Podcast Episode 2</h3>
              <p className="text-gray-600">A short description of the second podcast episode.</p>
            </div>
            {/* Episode 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
              <img src="/public/file.svg" alt="Podcast 3" className="mb-4 w-full h-48 object-cover rounded" />
              <h3 className="text-2xl font-bold mb-2">Podcast Episode 3</h3>
              <p className="text-gray-600">A short description of the third podcast episode.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-xl mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="hover:text-blue-400 transition-all">Twitter</a>
            <a href="#" className="hover:text-blue-400 transition-all">Instagram</a>
            <a href="#" className="hover:text-blue-400 transition-all">Facebook</a>
          </div>
          <p>&copy; 2024 BingeCast. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

