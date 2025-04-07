export default async function Page() {
    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header with subtle shadow and accent */}
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <span className="mr-2">👋</span>
                        <span>
                            Hello <span className="text-blue-600">Patient</span>...
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
            </div>
        </main>
    );
  }