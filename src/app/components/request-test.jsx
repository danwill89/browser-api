"use client";

import { decodeCredential } from "../actions";
import { useState } from "react";
import { useRouter } from 'next/navigation';

/**
 * RequestTest component handles the request testing functionality.
 *
 * This component allows users to test various requests and view responses.
 *
 * @returns {JSX.Element} The rendered request test component.
 *
 * @example
 * <RequestTest />
 */
export default function RequestTest() {
    const router = useRouter();
    const [licenseData, setLicenseData] = useState(null);
    const [vrcData, setVrcData] = useState(null);

    /**
     * Handles the continue button click event.
     *
     * This function is called when the user clicks the continue button.
     * It checks if both the license and vehicle registration have been uploaded.
     * If both are uploaded, it extracts the required fields from the uploaded documents and
     * creates a URL with query parameters. It then navigates to the confirmation page.
     */
    const handleContinue = () => {
        if (!licenseData || !vrcData) {
            alert('Please upload both your license and vehicle registration before continuing.');
            return;
        }

        // Extract the required fields from the uploaded documents
        const givenName = Array.from(licenseData).find(([key]) => key === 'org.iso.18013.5.1')?.[1]?.get('given_name');
        const familyName = Array.from(licenseData).find(([key]) => key === 'org.iso.18013.5.1')?.[1]?.get('family_name');
        const ageOver21 = Array.from(licenseData).find(([key]) => key === 'org.iso.18013.5.1')?.[1]?.get('age_over_21');
        const registrationNumber = Array.from(vrcData).find(([key]) => key === 'org.iso.7367.1')?.[1]?.get('registration_number');
        const dateOfRegistration = Array.from(vrcData).find(([key]) => key === 'org.iso.7367.1')?.[1]?.get('date_of_registration');
        const vehicleIdentificationNumber = Array.from(vrcData).find(([key]) => key === 'org.iso.7367.1')?.[1]?.get('vehicle_identification_number');

        // Create the URL with query parameters
        const queryParams = new URLSearchParams({
            given_name: givenName || '',
            family_name: familyName || '',
            age_over_21: ageOver21?.toString() || 'false',
            registration_number: registrationNumber || '',
            date_of_registration: dateOfRegistration || '',
            vehicle_identification_number: vehicleIdentificationNumber || ''
        });

        // Navigate to the confirmation page
        router.push(`/permit-application/confirmation?${queryParams.toString()}`);
    };

    /**
     * Request the user's mDL and vehicle registration.
     *
     * This function is called when the user clicks the request button.
     * It requests the user's mDL and vehicle registration using the
     * Identity API.
     */
    const onRequest = async () => {
        const dcRequestProtocol = "openid4vp";
        const openid4vpRequest = {
            response_type: 'vp_token',
            nonce: 'Z2Y2OWtlcFYrbTV0R3hVSXNGdExpNnB3Zz1kYW4',
            client_id: "www.mysite.com",
            client_metadata: {},
            presentation_definition: {
                id: 'mDL-request-demo',
                input_descriptors: [{
                    id: "org.iso.18013.5.1.mDL",
                    format: {
                        mso_mdoc: {
                            alg: ["ES256"]
                        }
                    },
                    constraints: {
                        limit_disclosure: "required",
                        fields: [
                            {
                                path: ["$['org.iso.18013.5.1']['family_name']"],
                                intent_to_retain: false
                            }, {
                                path: ["$['org.iso.18013.5.1']['given_name']"],
                                intent_to_retain: false
                            }, {
                                path: ["$['org.iso.18013.5.1']['age_over_21']"],
                                intent_to_retain: false
                            }, {
                                path: ["$['org.iso.18013.5.1']['portrait']"],
                                intent_to_retain: false
                            }
                        ]
                    }
                }]
            }
        }

        try {
            const credentialResponse = await navigator.identity.get({
                digital: {
                    providers: [
                        {
                            protocol: dcRequestProtocol,
                            request: openid4vpRequest,
                        },
                    ],
                },
                mediation: "required",
            });
            const data = await decodeCredential(JSON.parse(credentialResponse.data))
            setLicenseData(data);
        } catch (err) {
            alert(err);
        }
    };

    /**
     * Request a Verifiable Registration Certificate (VRC) from the user's digital wallet.
     * The VRC is a verifiable credential that contains the user's vehicle registration details.
     * The request is sent to the user's digital wallet using the OpenID Connect for Verifiable
     * Presentations (OpenID4VP) protocol.
     */
    const requestVRC = async () => {
        const dcRequestProtocol = "openid4vp";
        const openid4vpRequest = {
            response_type: 'vp_token',
            nonce: 'Z2Y2OWtlcFYrbTV0R3hVSXNGdExpNnB3Zz1kYW4',
            client_id: "www.mysite.com",
            client_metadata: {},
            presentation_definition: {
                id: 'vrc-request-demo',
                input_descriptors: [{
                    id: "org.iso.7367.1.mVRC",
                    format: {
                        mso_mdoc: {
                            alg: ["ES256"]
                        }
                    },
                    constraints: {
                        limit_disclosure: "required",
                        fields: [
                            {
                                path: ["$['org.iso.7367.1']['registration_number']"],
                                intent_to_retain: false
                            },
                            {
                                path: ["$['org.iso.7367.1']['date_of_registration']"],
                                intent_to_retain: false
                            }, {
                                path: ["$['org.iso.7367.1']['vehicle_identification_number']"],
                                intent_to_retain: false
                            }
                        ]
                    }
                }]
            }
        }

        try {
            const credentialResponse = await navigator.identity.get({
                digital: {
                    providers: [
                        {
                            protocol: dcRequestProtocol,
                            request: openid4vpRequest,
                        },
                    ],
                },
                mediation: "required",
            });
            const data = await decodeCredential(JSON.parse(credentialResponse.data), ["org.iso.7367.1"]);
            setVrcData(data);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Driver's License</h3>
                    <div className={`px-3 py-1 rounded-full text-sm ${licenseData ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {licenseData ? 'Uploaded' : 'Not Uploaded'}
                    </div>
                </div>

                {!licenseData ? (
                    <div className="space-y-4">
                        <p className="text-gray-600">Please upload your driver's license to proceed with the permit application.</p>
                        <button
                            onClick={() => onRequest()}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-700 focus:outline-none w-full"
                        >
                            Upload License
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {Array.from(licenseData, ([namespace, fields]) => (
                            <div key={namespace} className="space-y-3">
                                {Array.from(fields, ([field, value]) => (
                                    <div key={field} className="space-y-2">
                                        <div className="text-sm text-gray-500 capitalize">{field.replace(/_/g, ' ')}</div>
                                        {field === 'portrait' ? (
                                            <img
                                                src={`data:image/jpeg;base64,${value}`}
                                                alt="Portrait"
                                                className="w-32 h-32 object-cover rounded-lg shadow-sm"
                                            />
                                        ) : field === 'age_over_21' ? (
                                            <div className="flex items-center space-x-2">
                                                {value.toString() === 'true' ? (
                                                    <>
                                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-green-600 font-medium">Verified</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        <span className="text-red-600 font-medium">Not Verified</span>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-gray-900">{value.toString()}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button
                            onClick={() => onRequest()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none text-sm w-full"
                        >
                            Upload Different License
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Vehicle Registration</h3>
                    <div className={`px-3 py-1 rounded-full text-sm ${vrcData ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {vrcData ? 'Uploaded' : 'Not Uploaded'}
                    </div>
                </div>

                {!vrcData ? (
                    <div className="space-y-4">
                        <p className="text-gray-600">Please upload your vehicle registration certificate to proceed with the permit application.</p>
                        <button
                            onClick={() => requestVRC()}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-700 focus:outline-none w-full"
                        >
                            Upload VRC
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {Array.from(vrcData, ([namespace, fields]) => (
                            <div key={namespace} className="space-y-3">
                                {Array.from(fields, ([field, value]) => {
                                    // Format the date of registration if the field is 'date_of_registration'
                                    const displayValue = field === 'date_of_registration' && value ?
                                        new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long', // Change to 'short' for abbreviated month names
                                            day: 'numeric'
                                        }).format(new Date(value))
                                        : value.toString();

                                    return (
                                        <div key={field} className="space-y-2">
                                            <div className="text-sm text-gray-500 capitalize">{field.replace(/_/g, ' ')}</div>
                                            <div className="text-gray-900">{displayValue}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        <button
                            onClick={() => requestVRC()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none text-sm w-full"
                        >
                            Upload Different VRC
                        </button>
                    </div>
                )}
            </div>
            {licenseData && vrcData && (
                <div className="col-span-full mt-6">
                    <button
                        onClick={handleContinue}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-green-500 focus:outline-none w-full md:w-auto"
                    >
                        Continue to Application
                    </button>
                </div>
            )}
        </div>
    );
}
