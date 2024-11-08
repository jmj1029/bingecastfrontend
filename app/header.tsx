import 'flowbite/dist/flowbite.css';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Header() {
    const router = useRouter();

    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        router.push("/");
    };

    const handleSignIn = () => {
        router.push("/sign-in");
    };

    const handleSignUp = () => {
        router.push("/sign-up");
    };
    //<img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />

    //<Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BingeCast</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={handleSignIn}>Sign In</Dropdown.Item>
                    <Dropdown.Item onClick={handleSignUp}>Sign Up</Dropdown.Item>
                    <Dropdown.Divider />
                    
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>Home</Navbar.Link>
                <Navbar.Link href="/home">User Home</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}