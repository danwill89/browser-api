import Image from 'next/image';
import Link from 'next/link';

/**
 * Header component renders the top navigation bar of the application.
 *
 * This component includes the application logo, title, and navigation links
 * to different sections of the application.
 *
 * @returns {JSX.Element} The rendered header component.
 *
 * @example
 * <Header />
 */
export default function Header() {
    return (
        <header className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-900 font-bold text-xl">LC</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Local Council</h1>
                        <p className="text-sm text-blue-200">Official Permit Portal</p>
                    </div>
                </Link>
                <nav className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
                    <Link href="/permit-application" className="hover:text-blue-200 transition-colors">Apply for Permit</Link>
                    <a href="#" className="hover:text-blue-200 transition-colors">Contact</a>
                </nav>
            </div>
        </header>
    );
}
