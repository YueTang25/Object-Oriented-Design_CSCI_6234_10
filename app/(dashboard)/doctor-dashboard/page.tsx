import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarIcon, FileTextIcon, PlusIcon } from '@/components/icons';
import { getUserName, getUserId } from '@/lib/session';
export default async function Page() {
    const name = await getUserName();
    const id = await getUserId();
    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="p-6 max-w-7xl mx-auto">
                {/* Header with subtle shadow and accent */}
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <span className="mr-2">👋</span>
                        <span>
                            Hello <span className="text-blue-600">Doctor</span>... {name} ID: {id}
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
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Upcoming Appointments */}
                    <Card>
                        <CardContent className="p-6">
                            <CalendarIcon className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
                            <p className="text-gray-600 mb-4">See your scheduled appointments</p>
                            <Link href="/doctor-dashboard/schedule">
                                <Button variant="default">View Appointments</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Add Availability */}
                    <Card>
                        <CardContent className="p-6">
                            <PlusIcon className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-semibold mb-2">Add Availability</h2>
                            <p className="text-gray-600 mb-4">Add available time for the next week</p>
                            <Link href="/doctor-dashboard/availability">
                                <Button variant="default">Add Now</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Patient History */}
                    {/* <Card>
                        <CardContent className="p-6">
                            <FileTextIcon className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-semibold mb-2">Patient History</h2>
                            <p className="text-gray-600 mb-4">See your patients' appointment history</p>
                            <Link href="/patient/book">
                                <Button variant="default">View History</Button>
                            </Link>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </main>
    );
}