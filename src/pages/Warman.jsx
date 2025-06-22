import React from 'react';
import PlyViewer from '../components/PlyViewer';

export default function Warman() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar Table of Contents */}
            <aside className="w-64 bg-[#1d1d1d] text-white p-4 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto shadow-md z-40 hidden md:block">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <nav aria-label="Table of contents">
                    <ol className="list-decimal list-inside space-y-2 text-lg text-left">
                        <li><a href="#Overview" className="!text-white hover:underline">Overview</a></li>
                        <li><a href="#Design" className="!text-white hover:underline">Final Design</a></li>
                        <li><a href="#Stockfish" className="!text-white hover:underline">GUI & Stockfish ROS 2 Node</a></li>
                        <li><a href="#Control" className="!text-white hover:underline">UR3e Robot Control Node</a></li>
                        <li><a href="#Vision" className="!text-white hover:underline">Computer Vision for Player Move Detection</a></li>
                        <li><a href="#Discussion" className="!text-white hover:underline">Discussion & Potential Improvements</a></li>
                    </ol>
                </nav>

                <img 
                    src="/warman/Catbot.jpg" 
                    alt="Table of Contents Footer Image" 
                    className="w-full mt-45 object-cover rounded"
                />
            </aside>

            <div className="flex-1 md:ml-64">
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
                        <img 
                            src="/warman/coverPic.png"
                            alt="Profile"
                            className="w-auto h-110 rounded-2xl shadow-lg"
                        />

                    <h1 className="text-4xl font-bold text-center">Warman Challenge 2024 Robot</h1>
                </div>

                <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

                {/* Overview and gif */}
                <section id='Overview' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">1. Overview</h2>
                        <p className="text-xl text-white leading-relaxed">
                            The Warman Challenge is a competition held yearly by Weir Minerals Australia
                            Ltd. The participants (mostly second-year engineering students) will have to
                            find practical solutions to theoretical problems. For the 2024 challenge, we are
                            tasked with designing and building a robot to collect 6 balls located at
                            different positions and heights. After that, the collected balls will be deposited
                            into a hole on the track within 120 seconds. The final design must adhere
                            strictly to the competition rules, otherwise, the team could be disqualified. 

                            <figure className="mt-4">
                                <img src="/warman/track.png" alt="setup" className="w-140 h-auto object-cover shadow-lg mx-auto"/>
                                <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 1.1. Warman 2024 track
                                </figcaption>
                            </figure> <br/>

                            We have remodelled the track in Solidwork for robot's simulation purpose, also it made scaling the size
                            of components more easy. There is a tree (tall pole) and 2 tennis balls (seed pods) being placed on each 
                            side of the track.  In the middle, a hole (the incinerator) is made for the robot to drop the payload into.
                            Check out the interactive track below!

                            <PlyViewer url='/warman/track.ply'fov={15}/>
                            <br/> 
                            Every team can have a maximum of 5 members. Our team had a combination of mechanical and mechatronics 
                            expertise, whose skills could cover most aspects of robotic design. In this project, I took responsibility as
                            the team lead, and also designed the ball catcher components and single-handedly developed the control software.
                            Please enjoy some footage of our robot scoring max points on the competition day!

                            <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/GrHvrqTiKTE' 
                                    title='Warman Demo CatBot' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                Youtube video unable to load
                            </iframe>
                        </p>
                    </div>
                </section>

                <div className="my-18" />

                <section id='Design' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">2. Final Design</h2>
                        <p className="text-xl text-white leading-relaxed">
                            The robot, which we named "Cat Bot" was equipped with 2 large brushes, driven by 2 geared NEMA17s, to ensure the ball could be picked up even when the robot’s alignment 
                            with the ball was not ideal, providing high tolerance against positional errors. For localisation, the flatness of the Warman track provided an excellent working 
                            surface for an optical mouse, which gave precise x and y offsets of the robot by accumulating the small offsets over time. For navigation, the holonomic 
                            drive configuration (4 NEMA17s & 4 omni-directional wheels) was implemented, which allowed the robot to move horizontally 
                            without having to turn its chassis. A 3d-printed, lightweight electronics housing is mounted on the ball catcher to
                            keep the cables neat, minimising the risk of unwanted disconnection.

                             <figure className="mt-4">
                                <img src="/warman/Final.png" alt="setup" className="w-140 h-auto object-cover shadow-lg mx-auto"/>
                                <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 2.1. Final robot design
                                </figcaption>
                            </figure> <br/>    
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}