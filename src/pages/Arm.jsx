import React, { useEffect } from 'react';
import Figure from '../components/Figure';
import { InlineMath, BlockMath } from 'react-katex';
import StlViewer from '../components/StlViewer';
import ExternalLink from '../components/ExternalLink';

export default function Arm() {
    useEffect(() => {
            window.scrollTo(0, 0); // or: { top: 0, behavior: 'smooth' }
            document.documentElement.style.backgroundColor = '#242526';
          }, []);
    return (
        <div className="flex min-h-screen">
            {/* Sidebar Table of Contents */}
            <aside className="w-64 bg-[#1d1d1d] text-white p-4 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto shadow-md z-40 hidden md:flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                    <nav aria-label="Table of contents">
                        <ol className="list-decimal list-outside space-y-2 text-base text-left font-semibold ml-5">
                            <li><a href="#Overview" className="!text-white hover:underline">Overview</a></li>
                            <li><a href="#Link" className="!text-white hover:underline">Links Design</a></li>
                            <li><a href="#Control" className="!text-white hover:underline">Control Software</a></li>
                            <li><a href="#Discussion" className="!text-white hover:underline">Discussion & Potential Improvements</a></li>
                        </ol>
                    </nav>
                </div>
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
                        src="/robotArm.jpg"
                        alt="Profile"
                        className="w-auto h-110 rounded-2xl shadow-lg"
                    />
                    <h1 className="text-4xl font-bold text-center !text-white">5 DOFs Robot Arm (Not Completed)</h1>
                </div>

                <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

                {/* Overview and gif */}
                <section id='Overview' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">1. Overview</h2>
                        <div className="text-xl text-white leading-relaxed">
                            The 5 DOFs robot arm was made as a replacement for the UR3e to perform my personal project: Selfie Sketching, in the comfort of my home.
                            The arm was mostly 3D-printed in PLA, a small amount of important structural components used aluminium tubes. The current control software
                            allows for Joint Angle Control and Resolved-Rate Motion Control (RRMC). From calculations, the arm has an expected payload of 2kg, however with
                            link rigidity problems and the reduced efficiency of the 3D-printed planetary gearbox, the real payload capacity would be lower. 
                            <br/> <br/>
                            Here is a short video showing the arm in operation:
                            <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/xDRQqHsJhEQ' 
                                    title='Warman Demo CatBot' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                Youtube video unable to load
                            </iframe>
                        </div>
                    </div>
                </section>

                <div className="my-18" />
                <section id='Link' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">2. Links Design</h2>
                        <div className="text-xl text-white leading-relaxed">
                            Side note: The robot has 5 joints in total, however, the mechanical design of the last 2 joints is currently unreliable and work needs to be
                            done to improve them, therefore I won't document these joints.
                        </div> <br/>
                        <h3 className="text-xl font-semibold mb-6 !text-white">2.1. Base Link</h3>
                        <div className="text-xl text-white leading-relaxed">
                            The rotating base link has a 3D-printed 120-tooth GT2 pulley driven by a belt attached to a NEMA17 stepper motor. 
                            This pulley will hold the entire weight of other links on the arm. <br/><br/>
                            <div className="flex justify-center">
                                <figure className="max-w-4xl mx-auto text-center">
                                    <video className="rounded-xl shadow-lg w-3/4 mx-auto" controls>
                                        <source src="/arm/base1.mp4" type="video/mp4" />
                                        Your browser does not support MP4 unfortunately.
                                    </video>
                                    <figcaption className="mt-2 text-white text-lg italic">
                                        GT2 pulley rotating.
                                    </figcaption>
                                </figure>
                            </div> <br/>

                            To connect the second link to this GT2 pulley, I made a big connector block. In the video above, you can notice a white pole
                            press fitted inside the big 52mm bearing. This pole is reinforced with a metal rod inside, helping the connector block stay upright 
                            under load. <br/><br/>

                            <div className="flex justify-center">
                                <figure className="max-w-4xl mx-auto text-center">
                                    <video className="rounded-xl shadow-lg w-3/4 mx-auto" controls>
                                        <source src="/arm/baseblock.mp4" type="video/mp4" />
                                        Your browser does not support MP4 unfortunately.
                                    </video>
                                    <figcaption className="mt-2 text-white text-lg italic">
                                        Connector block.
                                    </figcaption>
                                </figure>
                            </div> <br/>

                            <h3 className="text-xl font-semibold mb-6 !text-white">2.2. Shoulder Link (Link 2)</h3>
                            <div className="text-xl text-white leading-relaxed">
                                The shoulder link will have 2 identical panels that are connected to a single aluminium rod, and this rod is driven by a 
                                higher torque NEMA17 with a 5:1 gear ratio via a timing belt system similar to the base link. 
                                <Figure src="/arm/panels1.jpg" alt="setup" caption="Figure 2.1. Shoulder link assembly" width='w-180'/> <br/>
                                This way the motion of the 2 panels is synced which prevents unwanted twisting. 
                                These panels have mounting holes for the third link and its pulley system. The video below shows the pulley system in motion: <br/><br/>
                                <video className="rounded-xl shadow-lg w-1/2 mx-auto" controls>
                                    <source src="/arm/shoulder.mp4" type="video/mp4" />
                                    Your browser does not support MP4 unfortunately.
                                </video> <br/>
                                This is how the link look in 3D:
                                <StlViewer url="/arm/Arm1Left2.STL" fov={10}/>
                            </div> <br/>

                            <h3 className="text-xl font-semibold mb-6 !text-white">2.3. Elbow Link (Link 3)</h3>
                            <div className="text-xl text-white leading-relaxed">
                                This third link has the same axis of rotation as Link 2. However, it has a smaller NEMA17 as it is closer to the load. This video shows the 
                                first 3 links work together. <br/> <br/>
                                <video className="rounded-xl shadow-lg w-1/2 mx-auto" controls>
                                    <source src="/arm/first3.mp4" type="video/mp4" />
                                    Your browser does not support MP4 unfortunately.
                                </video> <br/>
                                For the next joint, it will have a different axis of rotation (<InlineMath math='90^\circ'/> offset), therefore the bracket for the 
                                stepper will not have 2 panels as Link 2.
                                <StlViewer url="/arm/NemaMount.STL" fov={20}/> <br/>
                                I did a quick test to confirm all joints didn't struggle with the weight of the links themselves. A small rocket was also 
                                attached as a payload. 
                                <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/8p9_Y2xsvy0' 
                                        title='Warman Demo CatBot' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                    Youtube video unable to load
                                </iframe>
                            </div> 
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='Control' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">3. Control Software</h2>
                        <div className="text-xl text-white leading-relaxed">
                            For this project, we used MATLAB to generate the control commands for complex trajectories, which will be sent to an Arduino to control the 
                            steppers. The stepper drivers used were DRV8825, similar to the ones in my Warman robot. These programs can be found
                            on my<ExternalLink href="https://github.com/ladyhoai/Custom-robot-arm-control-">GitHub</ExternalLink> repository.
                        </div> 
                    </div>
                </section>
                <div className="my-18" />

                <section id='Discussion' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">4. Discussion & Potential Improvements</h2>
                        <div className="text-xl text-white leading-relaxed">
                            Unfortunately, this project is not completed yet at the time of this post. There have been both software (the control loop doesn't run at a fast enough rate) and
                            hardware (links not rigid enough, lack of encoders, etc...) issues. I hope I can revisit this project at some point in the future when time and finance allow!
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}