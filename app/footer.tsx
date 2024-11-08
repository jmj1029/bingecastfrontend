import 'flowbite/dist/flowbite.css';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Footer(){
    return( <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 BingeCast. All rights reserved.</p>
        </div>
      </footer>
      )
}