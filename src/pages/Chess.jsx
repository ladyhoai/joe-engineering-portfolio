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
                <h1 className="text-4xl font-bold text-center">The Autonomous Chess Cobot</h1>
            </div>

            <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

            {/* Overview and gif */}
            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* Text */}
                <div className="text-left">
                    <h2 className="text-5xl font-semibold mb-6">Overview</h2>
                    <p className="text-xl text-white leading-relaxed">
                        The chess playing system was built by my team of 4 for the Robotic Studio 2 subject at UTS. 
                        It used the UR3e robot arm, computer vision, chess AI, and a GUI powered by the Raspberry Pi 5, 
                        with the goal of creating a unique chess experience. The final product includes selectable difficulty, 
                        a Gazebo simulation environment, autonomous localisation of the chessboard, 
                        and a chess bin to store captured pieces — all designed to provide the best experience for the end user. 
                        <br/> <br/>
                        Over 12 weeks, our team successfully delivered the product to our project's client, 
                        meeting 100% of the contractual requirements. This project gave me the opportunity to significantly 
                        improve my skills in ROS 2, ArUco marker localisation, and transfer learning for image classification.
                    </p> <br/>
                
                    <p className="text-white text-lg">
                    Check out the full test video on 
                    <a 
                        href="https://www.youtube.com/watch?v=lQcVdSzdOmk&t=309s" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-bold ml-1"
                    >
                        YouTube
                    </a>.
                    </p>
                </div>

                {/* GIF Below */}
                <figure className="mt-4">
                    <img 
                        src="/chessImg/chessfast.gif"
                        alt="setup"
                        className="w-140 h-auto object-cover shadow-lg rounded-2xl mx-auto"
                    />
                    <figcaption className="text-center font-bold text-sm text-white mt-2">
                        This is me playing chess against the system!
                    </figcaption>
                </figure>
            </section>

            <div className="my-24" />

            {/* Hardware SetUp Section */}
            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center md:items-start gap-12">
                {/* Left Side - Text */}
                <div className="flex-1 text-left">
                    <h2 className="text-5xl font-semibold mb-6">Hardware Setup</h2>
                    <p className="text-xl text-white leading-relaxed">
                        The following components are required to use Chess Bot: <br/><br/>
                        <ul className="list-disc list-inside text-white text-lg leading-relaxed">
                        <li>Universal Robots UR3e</li>
                        <li>Robot Trolley with Control Computer and Networking</li>
                        <li>Chess Clock (includes: Raspberry Pi, Touchscreen, Arduino Nano, Power Electronics)</li>
                        <li>Chess Board (includes Aruco localisation markers)</li>
                        <li>36 Chess Pieces</li>
                        <li>Chess Bin</li> 
                        <li>End Effector</li>
                        <li>Intel Realsense D435i Camera</li>
                        <li>Velcro Straps (for wiring harness management)</li>
                        <li>USB Drive (includes all required software, drivers, and documentation)</li>
                        </ul>
                    </p>
                </div>

                {/* Right Side - Picture */}
                <div className="flex-shrink-0">
                    <img 
                        src="/chessImg/hardwareSetup.webp"
                        alt="setup"
                        className="mt-18 w-80 h-auto object-cover shadow-lg rounded-2xl"
                    />
                    <figcaption className="text-center font-bold text-sm text-white-600 mt-2">
                        Hardware Setup
                    </figcaption>
                </div>
            </section>

            <div className="my-24" />

            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* Text */}
                <div className="text-left">
                    <h2 className="text-5xl font-semibold mb-6">Graphic User Interface Design</h2>
                    <p className="text-xl text-white leading-relaxed">
                        The chess playing system was built by my team of 4 for the Robotic Studio 2 subject at UTS. 
                        It used the UR3e robot arm, computer vision, chess AI, and a GUI powered by the Raspberry Pi 5, 
                        with the goal of creating a unique chess experience. The final product includes selectable difficulty, 
                        a Gazebo simulation environment, autonomous localisation of the chessboard, 
                        and a chess bin to store captured pieces — all designed to provide the best experience for the end user. 
                        <br/> <br/>
                        Over 12 weeks, our team successfully delivered the product to our project's client, 
                        meeting 100% of the contractual requirements. This project gave me the opportunity to significantly 
                        improve my skills in ROS 2, ArUco marker localisation, and transfer learning for image classification.
                    </p> <br/>
                
                </div>

                {/* GIF Below */}
                <figure className="mt-4">
                    <img 
                        src="/chessImg/chessfast.gif"
                        alt="setup"
                        className="w-140 h-auto object-cover shadow-lg rounded-2xl mx-auto"
                    />
                    <figcaption className="text-center font-bold text-sm text-white mt-2">
                        This is me playing chess against the system!
                    </figcaption>
                </figure>
            </section>
        </div>
      );
    
}






