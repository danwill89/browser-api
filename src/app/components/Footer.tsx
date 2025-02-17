/**
 * Footer component displays the footer section of the application.
 *
 * This component includes contact information, quick links, and office hours.
 *
 * @returns {JSX.Element} The rendered footer component.
 *
 * @example
 * <Footer />
 */
export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-700 mb-3">Contact Us</h3>
                        <p className="text-gray-600">
                            123 Council Street<br />
                            City Center<br />
                            Phone: (555) 123-4567<br />
                            Email: permits@localcouncil.gov
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-600">Accessibility</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-700 mb-3">Office Hours</h3>
                        <p className="text-gray-600">
                            Monday - Friday: 9:00 AM - 5:00 PM<br />
                            Saturday - Sunday: Closed
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Local Council. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
