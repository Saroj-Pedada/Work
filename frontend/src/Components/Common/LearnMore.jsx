export default function LearnMore() {
    return (
        <div className="bg-white py-16 px-6 sm:py-24 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Introduction Section */}
                <section className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Welcome to Shri Chhatrapati Shahu Maharaj Multipurpose Organisation, Amravati!
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        <strong>Registration No.:</strong> 515/12 <br />
                        <strong>File No.:</strong> 29813 <br />
                        <strong>Head Office:</strong> Near Panchshil Chowk, Tapovan, Yogiraj Nagar, Amravati, Maharashtra 444602
                    </p>
                </section>

                {/* Divider */}
                <div className="border-t border-gray-300 my-12"></div>

                {/* Mission Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Mission: Health is Wealth</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        We’re a dedicated community group working to improve health across villages in Maharashtra. By organizing free
                        medical camps with the support of local hospitals, we aim to bring health and well-being to all. Through our efforts,
                        we strive to empower each person with the knowledge and resources to care for themselves and their loved ones.
                    </p>
                </section>

                {/* Divider */}
                <div className="border-t border-gray-300 my-12"></div>

                {/* Services Section */}
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services: Medical Discounts for All</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        In collaboration with a panel of doctors, we’ve launched a medical service scheme that provides a 30-50% discount
                        at participating hospitals. This benefit is open to everyone, including ration cardholders and middle-income families.
                    </p>
                    <p className="mt-4 text-lg text-gray-600">
                        To take advantage of this opportunity, speak with our coordinator or supervisor when they visit your area.
                        They’re here to help you understand how to access these benefits.
                    </p>
                </section>

                {/* Call to Action Section */}
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-900">Join us in building a healthier, stronger community!</h3>
                    <p className="mt-4 text-lg text-gray-600">
                        For questions or to get involved, contact us at:
                    </p>
                    <a href="mailto:csm@csmmultipurposeorganisation.com" className="mt-2 text-lg font-semibold text-indigo-600 hover:text-indigo-500">
                        📧 csm@csmmultipurposeorganisation.com
                    </a>
                </div>
            </div>
        </div>
    );
}
