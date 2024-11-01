"use client";
import 'flowbite/dist/flowbite.css';
import { TextInput, Button, Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import Link from 'next/link';  // Importing Link for routing

export function Header() {
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
            <Link href="/sign-in">Sign In</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/sign-up">Sign Up</Link>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export default function HomePage() {
  return (
    <main>
      <Header />
      {/* Additional homepage content goes here */}
    </main>
  );
}

