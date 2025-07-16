import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="bg-opacity-80 fixed top-0 z-10 w-full bg-gray-900 p-4 text-white shadow-lg backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    <Link href="/">Vision4k</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/" className="transition-colors hover:text-cyan-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" className="transition-colors hover:text-cyan-400">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin" className="transition-colors hover:text-cyan-400">
                                Admin
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
