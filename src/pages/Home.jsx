import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Simulate sending
        setTimeout(() => {
        console.log("Form submitted:", data);
        setLoading(false);
        e.target.reset();
        }, 2000);
    };

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
        setTimeout(() => {
            const el = document.getElementById(location.hash.replace("#", ""));
            if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
        }
    }, [location]);

    return (
        <div>
            {/* Nav Bar */}
            <nav className="bg-gray-600 text-white px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="text-xl font-bold">Joseph's Portfolio</div>
                <div className="space-x-6">
                    <a href="/" className="!text-white hover:underline cursor-pointer">Home</a>
                    <a href="#projects" className="!text-white hover:underline cursor-pointer">Projects</a>
                    <a href="#contact" className="!text-white hover:underline cursor-pointer">Contact</a>
                </div>

            </nav>
            
            {/* Main Content */}
            <div className="mt-20 p-8 space-y-8 flex flex-col items-center">
                <div className="flex flex-row space-x-8 items-center">
                    <img 
                        src="/content.png"
                        alt="Profile"
                        className="w-120 h-auto"
                    />

                    <img 
                        src="/demoShow.png"
                        alt="Profile"
                        className="w-120 h-64 object-cover object-center"
                    />
                </div>
                <h1 className="text-4xl font-bold text-center">Welcome to Joseph's engineering portfolio!</h1>
            </div>

            {/* Scroll Spacer */}
            <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />


            {/* About Me Section */}
            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center md:items-start gap-12">
                {/* Left Side - Text */}
                <div className="flex-1 text-left">
                    <h2 className="text-3xl font-semibold mb-6 ">About Me</h2>
                    <p className="text-xl text-white leading-relaxed">
                        Hello, my name is Joseph and I am currently a fourth-year mechatronic engineering student at the University of Technology, Sydney.
                        Ever since I was a kid, I have wondered about the prosperous future of our civilisation on planet Earth and among the distant stars! 
                        To contribute myself to the process of turning such exciting scenarios into reality, I have selected engineering to be the career path
                        to dedicate my time and efforts to.<br /><br />
                        From programming firmware for custom PCB to CAD modeling and leading team projects, my journey in engineering has shaped both my technical
                        and interpersonal skills. Apart from course-related projects, I use my free time to work on side projects to constantly revise my skills.
                        This portfolio highlights what I've built, what I've learned, and what I strive to do in the future.
                    </p>
                </div>

                {/* Right Side - Picture */}
                <div className="flex-shrink-0">
                    <img 
                        src="/ProfilePic.jpeg"
                        alt="Joseph"
                        className="mt-20 w-80 h-80 object-cover rounded-2xl shadow-lg"
                    />
                </div>
            </section>

            <div className="my-36" />

            <section id="projects" className="w-full max-w-6xl mx-auto px-8" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                <h2 className="text-3xl font-semibold text-left mb-8">Explore my projects!</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Autonomous chess playing robot */}
                    <Link to="projects/chess" className="block">
                        <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition 
                                        cursor-pointer hover:ring hover:ring-blue-400 hover:ring-offset-2 group">
                            <img 
                                src="/ChessImg.png"
                                alt="Chess"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2 text-white text-left group-hover:underline">Autonomous Chess Cobot</h3>
                            <p className="text-white text-left">
                                Robot to play conventional chess against human opponents, using ROS2, Stockfish, and chess engine trained by supervised learning. 
                            </p>
                        </div>
                    </Link>

                    {/* Selfie sketching robot */}
                    <Link to="projects/sketch" className="block">
                        <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition 
                                        cursor-pointer hover:ring hover:ring-blue-400 hover:ring-offset-2 group">
                            <img 
                                src="/Sketch.png"
                                alt="Draw"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2 text-white text-left group-hover:underline">Selfie Sketcher</h3>
                            <p className="text-white text-left">
                                Using UR3e robot arm and a genetic algorithm to process and draw a highly accurate replica of a given image by pencil on A4 paper. 
                            </p>
                        </div>
                    </Link>

                    {/* Matlab simulation of 2 robot arms */}
                    <Link to="projects/FIAR" className="block">
                        <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition 
                                        cursor-pointer hover:ring hover:ring-blue-400 hover:ring-offset-2 group">
                            <img 
                                src="/4inarowo2.gif"
                                alt="Dual Cobot"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2 text-white text-left truncate max-w-xs group-hover:underline" 
                            title="Four in a Row - MATLAB Dual Cobot Simulation">Four in a Row - MATLAB Dual Cobot Simulation</h3>

                            <p className="text-white text-left">
                                MATLAB simulation featuring a FANUC CRX10IA robot autonomously playing Four in a Row against 
                                an UR3e controlled by the human opponents.
                            </p>
                        </div>
                    </Link>

                    {/* Warman 2024 */}
                    <Link to="projects/warman" className="block">
                        <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition 
                                        cursor-pointer hover:ring hover:ring-blue-400 hover:ring-offset-2 group">
                            <div className="w-full h-48 rounded-lg mb-4 bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/CatBot.PNG')",
                                    backgroundSize: "145%", // Zoom level
                                    backgroundPosition: "center"
                                }}
                            ></div>

                            <h3 className="text-xl font-bold mb-2 text-white text-left group-hover:underline">Warman Challenge 2024 Robot</h3>
                            <p className="text-white text-left">
                                Custom-made autonomous robot to pick up and deposit 6 tennis balls located at different heights on the Warman 2024 track.   
                            </p>
                        </div>
                    </Link>
                    
                    <Link to="projects/arm" className="block">
                        {/* Robot arm */}
                        <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition 
                                        cursor-pointer hover:ring hover:ring-blue-400 hover:ring-offset-2 group">
                            <img 
                                src="/robotArm.jpg"
                                alt="Chess"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2 text-white text-left group-hover:underline">5 DOFs 3D Printed Robot Arm</h3>
                            <p className="text-white text-left">
                                5 Degrees of Freedom (DOF) robot arm, with the reach of 600mm and mostly printed in PLA, driven by NEMA17 stepper motors. 
                            </p>
                        </div>
                    </Link>

                    {/* Global Surveillance Vehicle */}
                    <Link to="projects/GSV" className="block">
                        <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition 
                                        cursor-pointer hover:ring hover:ring-blue-400 hover:ring-offset-2 group">
                            <img 
                                src="/car.png"
                                alt="Chess"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <h3 className="text-xl font-bold mb-2 text-white text-left group-hover:underline">Global Surveillance Vehicle</h3>
                            <p className="text-white text-left">
                                Robot controlled via the cellular network, capable of near real-time, 2-way audio and video transmission, using custom ECU and firmware. 
                            </p>
                        </div>
                    </Link>

                </div>
            </section>
        
            <div className="my-36" />

            <section className="w-full max-w-6xl mx-auto px-8 py-16" id="contact" style={{ paddingTop: '80px', marginTop: '-80px' }}>

                <h2 className="text-3xl font-semibold text-center mb-8">Contact Me</h2>

                {/* Right: Contact Form */}
                <div className="flex justify-center items-center min-h-[300px]">
                    <form className="space-y-6 border p-6 rounded-xl shadow-md max-w-md w-full" 
                            action="https://formspree.io/f/xdkzzevy" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-lg font-medium mb-1">Message</label>
                            <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your message..."
                            required
                            ></textarea>
                        </div>

                        <button
                        type="submit"
                        disabled={loading}
                        className={`relative bg-blue-600 text-white px-6 py-2 rounded-lg transition ${
                            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
                        }`}
                        >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Sending...</span>
                            </div>
                        ) : (
                            "Send"
                        )}
                        </button>
                    </form>
                </div>
                <div className="my-12" />

                {/* Left: Contact Icons */}
                <div className="flex flex-row space-x-10 text-2xl justify-center">
                    {/* Email */}
                    <a
                    href="mailto:xuankien.nguyen@student.uts.edu.au"
                    className="text-gray-700 hover:text-blue-500 transition"
                    title="Email"
                    >
                    <FaEnvelope className="text-3xl" />
                    </a>

                    {/* GitHub */}
                    <a
                    href="https://github.com/ladyhoai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition"
                    title="GitHub"
                    >
                    <FaGithub className="text-3xl" />
                    </a>

                    {/* LinkedIn */}
                    <a
                    href="https://linkedin.com/in/xuan-kien-nguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-700 transition"
                    title="LinkedIn"
                    >
                    <FaLinkedin className="text-3xl" />
                    </a>
                </div>
            </section>
        
            <footer className="w-full max-w-6xl mx-auto px-8 py-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Joseph Nguyen. All rights reserved.
            </footer>
        </div>
    );
}