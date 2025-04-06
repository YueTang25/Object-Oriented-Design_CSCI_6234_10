'use client';

import { useState } from 'react';
import { FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b shadow-sm bg-white">
        <div className="text-2xl font-bold"></div>
        <nav className="space-x-6">
          <a href="#" className="text-gray-600 hover:text-black">Contact</a>
          <a href="#" className="text-gray-600 hover:text-black">About Us</a>
          <button className="bg-black text-white px-4 py-2 rounded-md">Logout</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 flex flex-col items-center p-10 text-center">
        <h1 className="text-2xl text-gray-600 mb-6">Hello Patient...</h1>
        <h2 className="text-lg font-semibold text-left w-full max-w-4xl">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-4xl w-full">
          {[
            { title: 'Personal Information', desc: 'Review body' },
            { title: 'Appointments', desc: 'Review body' },
            { title: 'Payments', desc: 'Review body' },
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border text-left">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white p-6 flex flex-col items-center">
        <div className="text-2xl font-bold"></div>
        <div className="flex space-x-4 mt-2">
          <FaTwitter className="text-gray-600 hover:text-black cursor-pointer" size={20} />
          <FaInstagram className="text-gray-600 hover:text-black cursor-pointer" size={20} />
          <FaYoutube className="text-gray-600 hover:text-black cursor-pointer" size={20} />
          <FaLinkedin className="text-gray-600 hover:text-black cursor-pointer" size={20} />
        </div>
      </footer>
    </div>
  );
}
