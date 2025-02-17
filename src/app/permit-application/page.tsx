'use client';

import RequestTest from '../components/request-test';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * PermitApplication component renders the resident permit application form.
 *
 * This component provides a user interface for applicants to fill out the necessary
 * information to apply for or renew their resident permit. It ensures that all information
 * provided is accurate and up to date.
 *
 * @returns {JSX.Element} The rendered permit application form component.
 *
 * @example
 * <PermitApplication />
 */
export default function PermitApplication() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resident Permit Application</h2>
                        <p className="text-gray-600 mb-8">Please fill out the form below to apply for or renew your resident permit. Ensure all information provided is accurate and up to date.</p>
                        
                        <div className="space-y-8">
                            <RequestTest />
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
