'use client';

import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

/**
 * Home component renders the main landing page of the application.
 *
 * This component serves as the entry point for users and provides
 * an overview of the application's features and functionalities.
 *
 * @returns {JSX.Element} The rendered home page component.
 *
 * @example
 * <Home />
 */
export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Welcome to Local Council Services</h1>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resident Permits</h2>
                            <p className="text-gray-600 mb-6">Apply for or renew your resident parking permit. Our online system makes it quick and easy to manage your permit needs.</p>
                            <Link 
                                href="/permit-application" 
                                className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                            >
                                Apply for Permit
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Other Services</h2>
                            <ul className="space-y-3 text-gray-600">
                                <li>• Council Tax Payments</li>
                                <li>• Waste Collection</li>
                                <li>• Planning Applications</li>
                                <li>• Report an Issue</li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-500">More services coming soon</p>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
