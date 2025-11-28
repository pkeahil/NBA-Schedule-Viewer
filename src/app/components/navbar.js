import Link from "next/link";

export default function Navbar() {
  return (
        <div className="bg-zinc-50 min-w-full font-sans dark:bg-black">
            <nav className="bg-zinc-700 p-5 w-full flex items-center py-4">
                <ul className="flex space-x-4">
                    <li><Link href="/">Home</Link></li>
                </ul>
            </nav>
        </div>
    );
}