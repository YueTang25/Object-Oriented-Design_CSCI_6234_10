export default async function Page() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header with subtle shadow and accent */}
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <span className="mr-2">👋</span>
                        <span>
                            Hello <span className="text-blue-600">Admin</span>...
                            <span className="ml-2 text-lg font-normal text-gray-500">Dashboard Overview</span>
                        </span>
                    </h1>

                    {/* Date indicator */}
                    <div className="mt-2 text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                {/* Stats cards grid - would go here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Example stat card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Active Rooms</h3>
                        <p className="text-3xl font-bold mt-2 text-gray-800">24</p>
                    </div>
                </div>

                {/* Recent activity section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
                    <div className="space-y-4">
                        {/* Sample activity item */}
                        <div className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium">New exam room added</p>
                                <p className="text-sm text-gray-500">2 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}