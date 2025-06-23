import React, { useEffect } from 'react';
import PlyViewer from '../components/PlyViewer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Figure from '../components/Figure';
import ExternalLink from '../components/ExternalLink';
import { CodeBlock, InlineCode } from '../components/CodeBlock';

const mouseUpdate = ` void updateMouse() {
    if (!update) {
      update = true;
      MouseData data = mouse.readData();
      x += data.position.x; // Offset accumulation in x
      if (!invertedY) y += data.position.y; 
      else y -= data.position.y}}`

const holoDrive = `while (PINK != 191) { // 191 means Stop
    if (PINK == 251) { // go straight
        stepStepper(1, 0, 1, 0, speedUsed);
        mainNav = PINK; }

    else if (PINK == 247) { // go back
        stepStepper(0, 1, 0, 1, speedUsed);
        mainNav = PINK; }

    else if (PINK == 254) { // go left
        stepStepper(0, 0, 1, 1, speedUsed);
        mainNav = PINK; }

    else if (PINK == 253) { // go right
        stepStepper(1, 1, 0, 0, speedUsed);
        mainNav = PINK; }

    // accelerating
    if (speedUsed > 60) speedUsed--;
}`
export default function Warman() {
    useEffect(() => {
            window.scrollTo(0, 0); // or: { top: 0, behavior: 'smooth' }
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
                            <li><a href="#Design" className="!text-white hover:underline">Final Design</a></li>
                            <li><a href="#Funnel" className="!text-white hover:underline">Ball Catcher</a></li>
                            <li><a href="#Stepper" className="!text-white hover:underline">Stepper Config</a></li>
                            <li><a href="#Software" className="!text-white hover:underline">Navigation Software Development</a></li>
                            <li><a href="#Discussion" className="!text-white hover:underline">Discussion & Potential Improvements</a></li>
                        </ol>
                    </nav>
                </div>

                <img 
                    src="/warman/Catbot.jpg" 
                    alt="Table of Contents Footer Image" 
                    className="w-full object-cover rounded mt-4"
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
                        <div className="text-xl text-white leading-relaxed">
                            The Warman Challenge is a competition held yearly by Weir Minerals Australia
                            Ltd. The participants (mostly second-year engineering students) will have to
                            find practical solutions to theoretical problems. For the 2024 challenge, we are
                            tasked with designing and building a robot to collect 6 balls located at
                            different positions and heights. After that, the collected balls will be deposited
                            into a hole on the track within 120 seconds. The final design must adhere
                            strictly to the competition rules, otherwise, the team could be disqualified. 

                            <Figure src="/warman/track.png" alt="setup" caption="Figure 1.1. Warman 2024 track"/> <br/> 

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
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='Design' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">2. Final Design</h2>
                        <div className="text-xl text-white leading-relaxed">
                            The robot, which we named "Cat Bot" was equipped with 2 large brushes, driven by 2 geared NEMA17s, to ensure the ball could be picked up even when the robot’s alignment 
                            with the ball was not ideal, providing high tolerance against positional errors. For localisation, the flatness of the Warman track provided an excellent working 
                            surface for an optical mouse, which gave precise x and y offsets of the robot by accumulating the small offsets over time. For navigation, the holonomic 
                            drive configuration (4 NEMA17s & 4 omni-directional wheels) was implemented, which allowed the robot to move horizontally 
                            without having to turn its chassis. A 3d-printed, lightweight electronics housing is mounted on the ball catcher to
                            keep the cables neat, minimising the risk of unwanted disconnection.

                            <Figure src="/warman/Final.png" alt="setup" caption="Figure 2.1. Final robot design"/> <br/> 
                        </div>
                    </div>
                </section>

                <section id='Funnel' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">3. Ball Catcher</h2>
                        <div className="text-xl text-white leading-relaxed">
                            To store the balls after being collected, we decided to use a funnel-like design so that the balls could be 
                            effortlessly released when needed. Also, it can interface with the pick-up mechanism with no moving parts. 

                            <Figure src="/warman/catcher.png" alt="setup" caption="Figure 3.1. The catcher used in demonstration"/> <br/> 

                            The catcher is the sole storage unit of the robot. The ball-guiding slope is surrounded by high walls so 
                            that balls cannot bounce back outside. Once inside, the balls will constantly drag on the ground until being 
                            deposited. This catcher will be mounted directly onto the chassis using M4 bolts. Plywood is selected to 
                            manufacture the catcher which could be laser cut to improve precision and reduce manufacturing time, 
                            then different sections could be assembled using customized 3D printed linkers. Laser cutting is chosen 
                            as it is less time-consuming than 3d-printing, and more cost-effective compared to CNC. <br/> 

                            <Figure src="/warman/mountedCatcher.png" alt="setup" caption="Figure 3.2. The catcher mounted onto chassis"/> <br/> 

                            During the prototyping stage, we made a cardboard version of our robot to have a rough idea about the scale 
                            of each mechanical components when put together. It helped us realise the ball-congestion issue in the early catcher design,
                            as the catcher is too narrow to store all 6 balls. Comparing the final version to the early one, you can notice 
                            the end point has been widened considerably.

                            <Figure src="/warman/earlyCatcher.png" alt="setup" caption="Figure 3.3. Early catcher design"/> 
                            <br/>
                            As a lot of adjustments were made during the development of the catcher, I have come up with a series of equations
                            to parametrically model the catcher, allowing for quick updates if any dimensions need to be modified. We can 
                            dynamically calculate the length of edge L and the angle of linkers (<InlineMath math='\beta'/> and <InlineMath math='\gamma'/>) as follow: 
                            <br/>
                            
                            <Figure src="/warman/catcherEquation.png" alt="setup" caption="Figure 3.4. Catcher Equations" width='w-100'/> <br/> 
                            <InlineMath math='L = \sqrt{(\frac{x-length(end)}{2} - \cos(\alpha))^2 + (x-y-\sin(\alpha))^2}\ \mathrm{mm}'/> <br/> <br/>
                            <InlineMath math='\beta = 360^\circ - \arcsin(\frac{x-y-\sin(\alpha)}{L})'/> <br/> <br/>
                            <InlineMath math='\gamma = \beta + \alpha'/> <br/> <br/>

                            Note that we need to predefine <InlineMath math='s'/> and <InlineMath math='length(end)'/>, which is the length of the backplate, and angle <InlineMath math='\alpha'/>.
                            The dimenstion of the broom platform (<InlineMath math='x'/> and <InlineMath math='y'/>) should also be known beforehand.
                            Furthermore, the point marked with a red dot is a fixed point.
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='Stepper' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">4. Stepper Config</h2>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
                            <div className="flex-1 text-left">
                                <p className="text-xl text-white leading-relaxed">
                                    To drive all 4 stepper motors (NEMA 17), we use the DRV8825 stepper driver, which is rated for 1.5A per coil 
                                    without using any cooling method, and up to 2.2A with sufficient cooling. The breakout board provides a 
                                    potentiometer that could be used to adjust the current limit to match the application’s needs.  
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <img src="/warman/drv8825.png" alt="setup" className=" w-35 h-auto rounded-2xl"/> 
                            </div>
                        </div> <br/>
                        
                        <div className="text-xl text-white leading-relaxed">
                            <h3 className="text-xl font-semibold mb-6">4.1. Current Limit & Microstepping</h3>
                            The following formula shows the relationship between the reference voltage (voltage between the potentiometer 
                            and ground) and the current limit of DRV8825: 
                            <BlockMath math='I_{limit} = 2V_{REF}'/>
                            As we want to keep the driver’s temperature nominal to avoid a sudden malfunction, a current limit of 1A is 
                            chosen, mapping to a <InlineMath math='V_{REF}'/> value of 500mV.
                            <Figure src="/warman/drvpinout.png" alt="setup" caption="Figure 4.1. DRV8825 breaout board pin-out" width='w-60'/> <br/> 
                            To improve the precision of NEMA17, we can implement micro-stepping control. By pulling up pins M0 and M2, 
                            we increase the motor’s step-per-revolution (normally 200) by a factor of 32. This results in smoother, 
                            quieter operation and more precise control due to the finer resolution of each step, allowing the motor to 
                            make smaller rotational changes. <br/> <br/>
                            <h3 className="text-xl font-semibold mb-6">4.2. Dead-Reckoning</h3>
                            We will use dead-reckoning to perform the <InlineMath math='180^\circ'/> rotation as can be seen at the 0:55 mark
                            of our demonstration video above, as using a magnetometer to sense yaw requires precise calibration and shielding 
                            for it to function correctly, which is complicated and time-consuming. <br/><br/>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
                                <div className="flex-1 text-left">
                                    To turn an angle <InlineMath math='\alpha'/>, first we will find the number of wheel revolutions needed:
                                    <BlockMath math='numRev = \frac{\pi d \frac{\alpha}{360}}{2\pi r_{wheel}}'/>
                                    The numerator is the arc length that the wheel has to travel to achieve <InlineMath math='\alpha'/> degree of rotation. 

                                </div>
                                <div className="flex-shrink-0">
                                    <img src="/warman/chassis.png" alt="setup" className=" w-55 h-auto "/> 
                                </div>
                            </div> <br/>
                            Then, we can derive the number of steps required by :
                            <BlockMath math='numStep = \frac{stepPerRev.numRev}{stepResolution}'/>
                            where <InlineMath math='stepPerRev'/> and <InlineMath math='stepResolution'/> are known characteristics of the motor and driver. 
                            A NEMA 17 has 200 steps for each revolution, and as pins M0 and M2 of the driver are pulled high, 
                            we have a step resolution of <InlineMath math='\frac{1}{32}'/>.

                        </div>

                    </div>
                </section>

                <div className="my-18" />

                <section id='Software' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">5. Navigation Software Development</h2>
                        <h3 className="text-xl font-semibold mb-6">5.1. Mission Sequence & State Diagram</h3>
                        <div className="text-xl text-white leading-relaxed">
                            According to the Warman 2024 rules, it is allowed to position the robot anywhere on the track. Therefore, we choose 
                            the top left corner as the starting point with the robot facing the tennis ball, and sequentially reached 7 other goals (Figure 5.1). 
                            <Figure src="/warman/ballSeq.png" alt="setup" caption="Figure 5.1. Pick-up sequence" /> <br/> 
                            The robot will execute the mission according to this state diagram:   
                            <Figure src="/warman/stateMachine.png" alt="setup" caption="Figure 5.2. State diagram for the Warman mission" width='w-180'/> <br/> 
                        </div>
                        <h3 className="text-xl font-semibold mb-6">5.2. Sensors & Computing Units</h3>
                        <Figure src="/warman/circuit.png" alt="setup" caption="Figure 5.3. Final electrical system" width='w-180'/> <br/> 
                        <div className="text-xl text-white leading-relaxed">
                            There are 2 computing units on the robot - an Arduino Mega to drive the motor system consisting of 6 NEMA17s and 2 35kg servos, and 
                            an Arduino Nano to process sensor data (from the optical mouse and 2 limit switches) and keep track of the mission state. These limit
                            switches are used as a more reliable replacement for the magnetometer to fix yaw error. The robot simply needs to keep pushing 
                            forward until it crashes into the raised platform, that will engage both switches which indicate the robot is parallel to the platform, as
                            shown in the clip below. <br/><br/>

                            <video className='w-full rounded-xl shadow-lg' controls>
                                <source src='/warman/LimitSwitch.mp4' type='video/mp4'/>
                                Your browser does not support MP4 unfortunately
                            </video>

                            <br/>
                            Additionally, we used an ESP32 for voltage monitoring , and displaying interesting graphics on a small OLED, for fun only. It also
                            played 8-bit Doom music during the competition as well, surely check out my LinkedIn post for that footage!
                            <Figure src="/warman/VoltageSen.jpg" alt="setup" caption="Figure 5.4. Voltage Sensing" /> 
                        </div>
                        <br/>

                        <h3 className="text-xl font-semibold mb-6">5.3. Control Software</h3>

                        <div className="text-xl text-white leading-relaxed">
                            You can view the source code for our robot on<ExternalLink href="https://github.com/ladyhoai/MDFS2024-CatBot">GitHub</ExternalLink>.
                            These are the firmware for Mega, Nano and ESP32 used for competition.
                        </div> <br/>
                        
                        <ul className="list-disc list-outside text-white text-lg leading-relaxed" >
                            <li className="text-xl font-semibold mb-6 underline">For Localisation:</li>
                        </ul>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
                            <div className="flex-1 text-left text-xl text-white leading-relaxed">
                                To reliably read data from the optical mouse for localisation, I used the <ExternalLink href="https://github.com/rucek/arduino-ps2-mouse"> 
                                arduino-ps2-mouse</ExternalLink> by rucek over the old PS/2 protocol. The mouse will output the change in positions since last read, and
                                these offsets could be accumulated to find the distance between the current position and the position where the mouse is initialised. The
                                following <code className="text-orange-300 bg-gray-800 px-1 rounded">updateMouse()</code> function needs to be called as frequent as possible to ensure the localisation is in real-time. 
                                <CodeBlock code={mouseUpdate}/>
                            </div>
                            <div className="flex-shrink-0">
                                <figure>
                                    <video className='w-85 rounded-xl shadow-lg' controls>
                                        <source src='/warman/mouseOp.mp4' type='video/mp4'/>
                                        Your browser does not support MP4 unfortunately
                                    </video>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">Mouse localisation</figcaption>
                                </figure> 
                            </div>
                        </div> <br/>

                        <ul className="list-disc list-outside text-white text-lg leading-relaxed" >
                            <li className="text-xl font-semibold mb-6 underline">Navigation and Ball Pick-Up:</li>
                        </ul>
                        
                        <div className="text-xl text-white leading-relaxed">
                            There are 2 important functions on the Arduino Mega to control the robot:  
                            <code className="text-orange-300 bg-gray-800 px-1 rounded">navigate()</code> and <code className="text-orange-300 bg-gray-800 px-1 rounded">pickUpBall()</code>
                            <Figure src="/warman/functionCall.png" alt="setup" caption="Figure 5.5. Pick up ball and navigate function call" /> 
                            <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="void navigate(int goalX, int goalY, bool LM_ack)" language="cpp"/>
                                </summary>
                                <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                    <p className="mb-2">Moves the robot to a target coordinate with optional alignment.</p>

                                    <ul className="list-disc list-outside space-y-1">
                                    <li>
                                        <InlineCode code="int goalX" language="cpp"/> – Target x-coordinate in millimetres.
                                    </li>
                                    <li>
                                        <InlineCode code="int goalY" language="cpp"/> – Target y-coordinate in millimetres.
                                    </li>
                                    <li>
                                        <InlineCode code="bool LM_ack" language="cpp"/> – If <code>true</code>, the robot performs alignment by slamming into the raised platform before proceeding to the target.
                                    </li>
                                    </ul>

                                    <p className="mt-4">
                                    The robot moves in a straight path by splitting the motion into two axis-aligned steps. For example, to reach 
                                    <InlineCode code=" (30, 40)" language="cpp"/>, first call 
                                    <InlineCode code=" navigate(0, 40, false)" language="cpp"/> then <InlineCode code=" navigate(30, 40, true)" language="cpp"/>. 
                                    Calling this function will send the goal to the Nano to start position tracking.
                                    </p>
                                </div>
                            </details> <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="void pickUpBall(int goingDown, int close, float operatingAngle, int speed)" language="cpp" />
                                </summary>
                                <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                    <p className="mb-2">Control the brush mechanism to pick up a tennis ball.</p>

                                    <ul className="list-disc list-outside space-y-1">
                                    <li>
                                        <InlineCode code="int goingDown" language="cpp"/> – The number of steps for the brush to go down. In Figure 5.5, the stepper will move 5760 steps downward.
                                    </li>
                                    <li>
                                        <InlineCode code="int close" language="cpp"/> – When to start closing the brushes. In Figure 5.5, after the stepper has completed 19500 steps, the brush will start closing.
                                    </li>
                                    <li>
                                        <InlineCode code="float operatingAngle" language="cpp"/> – How far to open the brushes.
                                    </li>
                                    <li>
                                        <InlineCode code="int speed" language="cpp"/> – Set the operating speed for the servo.
                                    </li>
                                    </ul>

                                </div>
                            </details> <br/>

                            <div className="flex justify-center">
                                <figure>
                                    <video className="rounded-xl shadow-lg" controls>
                                        <source src="/warman/broomOp.mp4" type="video/mp4" />
                                        Your browser does not support MP4 unfortunately
                                    </video>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Servo moving using a cubic easing function for smooth trajectory.
                                    </figcaption>
                                </figure>
                            </div> <br/>

                            Using only the 2 functions above, the software could be fine-tuned so that the robot could reach desired 
                            positions on the track, and pick up each ball differently depending on its height from the ground and 
                            distance from the robot. Repeatedly doing this for all 6 balls, the mission could be completed.
                        </div> <br/>

                        <ul className="list-disc list-outside text-white text-lg leading-relaxed" >
                            <li className="text-xl font-semibold mb-6 underline">Controlling the holonomic drive:</li>
                        </ul>

                        <div className="text-xl text-white leading-relaxed">
                            When <code className="text-orange-300 bg-gray-800 px-1 rounded">navigate()</code> is called, the Nano will track
                            its mouse position and based on that send control signal to the Mega to drive accordingly. This transmission is done 
                            by connecting 5 pins of the Nano to another 5 on the Mega (to avoid overhead of using external I2C or UART libraries), 
                            each pin represent a distince move command.  
                            <CodeBlock code={holoDrive}/> <br/>
                            The <code className="text-orange-300 bg-gray-800 px-1 rounded">stepStepper()</code> function takes the direction of each 4
                            steppers and a minimum speed to drive them at, as parameters. Then, the loop will accelerate them up to a set max speed of 16666.6 steps per second.
                            This ramp up is important as it reduce jerk and mechanical vibration which could otherwise build up errors over time.
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='Discussion' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">6. Discussion & Potential Improvements</h2>
                        <div className="text-xl text-white leading-relaxed">
                            After a period of constant hard work, seeing the end result was satisfying. The studio has provided me with an 
                            excellent opportunity to improve my leadership and teamwork skills. I acquired a better understanding of how a 
                            project should be developed and how to manage time and assign tasks efficiently. The studio also reminds me and 
                            my team that procrastination must be avoided when working on a project. In a similar future situation, I will 
                            accelerate task completion more to avoid any last-minute rush.  <br/><br/>

                            Our robot got nominated to attend Tech Fest 2024 during the Robotic Showcase! It is one of the big achievements to be
                            proud of. 
                        </div> <br/>
                    </div>
                </section>
                <footer>
                    <img 
                    src="/warman/TechFest.jpg" 
                    alt="Footer Image" 
                    className="w-full max-h-[450px] object-cover"
                    />
                </footer>
            </div>
        </div>
    );
}