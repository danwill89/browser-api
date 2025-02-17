'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/**
 * PermitConfirmation component displays the confirmation page for the permit application.
 *
 * This component retrieves user data from the URL parameters and presents it for review
 * before final submission. It includes personal and vehicle information, allowing users
 * to verify their details.
 *
 * @returns {JSX.Element} The rendered confirmation page component.
 *
 * @example
 * <PermitConfirmation />
 */
export default function PermitConfirmation() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dateOfRegistrationParam = searchParams.get('date_of_registration');
    const formData = {
        givenName: searchParams.get('given_name') || '',
        familyName: searchParams.get('family_name') || '',
        registrationNumber: searchParams.get('registration_number') || '',
        dateOfRegistration: dateOfRegistrationParam ? new Date(dateOfRegistrationParam).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) : '',
        vehicleIdentificationNumber: searchParams.get('vehicle_identification_number') || '',
        ageOver21: searchParams.get('age_over_21') === 'true'
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirm Your Details</h2>
                            <p className="text-gray-600">Please review the information below before submitting your permit application.</p>
                        </div>

                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Given Name</label>
                                        <input
                                            type="text"
                                            value={formData.givenName}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Family Name</label>
                                        <input
                                            type="text"
                                            value={formData.familyName}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Age Verification</label>
                                        <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                                            {formData.ageOver21 ? (
                                                <>
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-green-600 font-medium">Age Verified (Over 21)</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    <span className="text-red-600 font-medium">Age Not Verified</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800">Vehicle Information</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Registration Number</label>
                                        <input
                                            type="text"
                                            value={formData.registrationNumber}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Date of Registration</label>
                                        <input
                                            type="text"
                                            value={formData.dateOfRegistration}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle Identification Number</label>
                                        <input
                                            type="text"
                                            value={formData.vehicleIdentificationNumber}
                                            readOnly
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Permit Duration</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                                        <option value="12">12 months</option>
                                        <option value="6">6 months</option>
                                        <option value="3">3 months</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Additional Notes</label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
                                        placeholder="Any additional information you'd like to provide..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Here you would typically send the form data to your backend
                                        // For now, we'll just simulate a successful submission
                                        router.push('/permit-application/success');
                                    }}
                                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-700 focus:outline-none"
                                >
                                    Submit Application
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                >
                                    Go Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
