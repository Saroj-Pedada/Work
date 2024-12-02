export default function Home({ setUserRole }) {
    return (
        <div className="bg-white w-full h-screen flex items-center justify-center">
            <div className="relative isolate px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-48 sm:py-30 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                            CSM Multipurpose Organisation
                        </h1>
                        <p className="mt-8 text-md font-medium text-gray-500 sm:text-sm">
                            We're a dedicated community group working to improve health across villages in Maharashtra. By organizing free medical camps with the support of local hospitals, we aim to bring health and well-being to all. Through our efforts, we strive to empower each person with the knowledge and resources to care for themselves and their loved ones.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                onClick={() => setUserRole('register')}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </a>
                            <a href="#" className="text-sm font-semibold text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
