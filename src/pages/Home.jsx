import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            {/* Nav Bar */}
            <nav className="bg-gray-600 text-white px-8 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="text-xl font-bold">Joe's Portfolio</div>
                <div className="space-x-6">
                    <Link to='/' className="!text-white hover:underline">Home</Link>
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
                <h1 className="text-4xl font-bold text-center">Welcome to Joe's engineering portfolio!</h1>
            </div>

            {/* Scroll Spacer */}
            <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />


            {/* About Me Section */}
            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center md:items-start gap-12">
                {/* Left Side - Text */}
                <div className="flex-1 text-left">
                    <h2 className="text-3xl font-semibold mb-6">About Me</h2>
                    <p className="text-xl text-white leading-relaxed">
                        Hello, my name is Joe and I am currently a fourth-year mechatronic engineering student at the University of Technology, Sydney.
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
                        alt="Joe"
                        className="mt-20 w-80 h-80 object-cover rounded-2xl shadow-lg"
                    />
                </div>
            </section>

            <div className="my-36" />

            <section className="w-full max-w-6xl mx-auto px-8">
                <h2 className="text-3xl font-semibold text-left mb-8">Explore My Projects!</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Autonomous chess playing robot */}
                    <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
                        <img 
                            src="/ChessImg.png"
                            alt="Chess"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2 text-white text-left">Autonomous Chess Cobot</h3>
                        <p className="text-white text-left">
                            Robot to play conventional chess against human opponents, using ROS2, Stockfish, and chess engine trained by supervised learning. 
                        </p>
                    </div>

                    <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
                        <img 
                            src="/Sketch.png"
                            alt="Draw"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2 text-white text-left">Selfie Sketcher</h3>
                        <p className="text-white text-left">
                            Using UR3e and a genetic algorithm to process and draw a highly accurate replica of a given image on A4 paper. 
                        </p>
                    </div>

                    <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
                        <img 
                            src="/4inarowo2.gif"
                            alt="Dual Cobot"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2 text-white text-left truncate max-w-xs" 
                        title="Four in a Row - MATLAB Dual Cobot Simulation">Four in a Row - MATLAB Dual Cobot Simulation</h3>

                        <p className="text-white text-left">
                            MATLAB simulation featuring a FANUC CRX10IA robot autonomously playing Four in a Row against 
                            an UR3e controlled by the human opponents.
                        </p>
                    </div>

                    <div className="bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer">
                        <img 
                            src="/ChessImg.png"
                            alt="Chess"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold mb-2 text-white text-left">Autonomous Chess Cobot</h3>
                        <p className="text-white text-left">
                            Robot to play conventional chess against human opponents, using ROS2, Stockfish, and chess engine trained by supervised learning. 
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
}