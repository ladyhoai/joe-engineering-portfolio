import React from 'react';


export default function Chess() {
    return (
        <div>
            {/* Nav Bar */}
            <nav className="bg-gray-600 text-white px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="text-xl font-bold">Joseph's Portfolio</div>
                <div className="space-x-6">
                    <a href="/" className="!text-white hover:underline cursor-pointer">Home</a>
                    <a href="/#projects" className="!text-white hover:underline cursor-pointer">Projects</a>
                    <a href="/#contact" className="!text-white hover:underline cursor-pointer">Contact</a>
                </div>
            </nav>

            
        </div>
      );
    
}






