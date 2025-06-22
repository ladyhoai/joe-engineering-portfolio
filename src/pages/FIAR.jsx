import React, { useEffect } from 'react';

export default function FIAR() {
    useEffect(() => {
            window.scrollTo(0, 0); // or: { top: 0, behavior: 'smooth' }
          }, []);
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

            <div className="mt-20 p-8 space-y-8 flex flex-col items-center">
                <div className="flex flex-row space-x-8 items-center">
                    <img 
                        src="/chessImg/coverPic.webp"
                        alt="Profile"
                        className="w-auto h-110 rounded-2xl shadow-lg"
                    />

                    <img 
                        src="/chessImg/coverPic2.jpeg"
                        alt="Profile"
                        className="w-145 h-auto rounded-2xl shadow-lg"
                    />
                </div>
                <h1 className="text-4xl font-bold text-center">Dual Cobot MATLAB - 4 in a row</h1>
            </div>

            <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

        </div>
    );
}