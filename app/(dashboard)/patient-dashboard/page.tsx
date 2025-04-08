import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarIcon, CreditCardIcon, UserIcon, PlusIcon } from '@/components/icons';
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
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Personal Info */}
                    {/* <Card>
                        <CardContent className="p-6">
                            <UserIcon className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                            <p className="text-gray-600 mb-4">View or update your details</p>
                            <Link href="/patient/info">
                                <Button variant="default">View / Edit Info</Button>
                            </Link>
                        </CardContent>
                    </Card> */}

                    {/* Book Appointment */}
                    <Card>
                        <CardContent className="p-6">
                            <PlusIcon className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-semibold mb-2">Book Appointment</h2>
                            <p className="text-gray-600 mb-4">Find and book available appointments</p>
                            <Link href="/patient-dashboard/appointment">
                                <Button variant="default">Book Now</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Upcoming Appointments */}
                    <Card>
                        <CardContent className="p-6">
                            <CalendarIcon className="w-6 h-6 text-blue-500" />
                            <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
                            <p className="text-gray-600 mb-4">See your scheduled appointments</p>
                            <Link href="/patient-dashboard/appointment">
                                <Button variant="default">View Appointments</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Payment Methods */}
                    {/* <Card>
                        <CardContent className="p-6">
                            <CreditCardIcon className="w-6 h-6 text-blue-500 " />
                            <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
                            <p className="text-gray-600 mb-4">Manage your saved payment options</p>
                            <Link href="/patient/payment">
                                <Button variant="default">View Payment</Button>
                            </Link>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </main>
    );
}