'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/**
 * PermitSuccess component displays the success message after the permit application is submitted.
 *
 * This component provides feedback to the user, confirming that their application has been
 * received and is being processed. It includes the application reference number and submission
 * date, along with a link to return to the home page.
 *
 * @returns {JSX.Element} The rendered success page component.
 *
 * @example
 * <PermitSuccess />
 */
export default function PermitSuccess() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Application Submitted Successfully!</h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-gray-600">
                                Thank you for submitting your resident permit application. Your application has been received and is being processed.
                            </p>
                            <p className="text-gray-600">
                                You will receive a confirmation email shortly with your application reference number and next steps.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                Application Reference: {new Date().getTime().toString(36).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Submission Date: {new Date().toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/"
                                className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-700 focus:outline-none inline-block"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
