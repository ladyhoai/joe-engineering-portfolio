import React, { useEffect } from 'react';
import Figure from '../components/Figure';
import ExternalLink from '../components/ExternalLink';
import { CodeBlock, InlineCode } from '../components/CodeBlock';

const RRMC = `for i = 1:steps-1
    xdot = (x(:,i+1) - x(:,i))/deltaT; % Translational velocity
    xdot_rot = (rotTraj(:,i+1) - rotTraj(:,i)) / deltaT; % Rotational
    xdot = [xdot; xdot_rot]; % Combine both into 1 4x4 matrix
    J = self.model.jacob0(qMatrix(i,:)); % Get the current Jacobian 
    qdot = pinv(J)*xdot; % Solve for joint velocitities
    qMatrix(i+1,:) = qMatrix(i,:) + deltaT*qdot'; % Update next
end
`

export default function FIAR() {
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
                            <li><a href="#RVC" className="!text-white hover:underline">Robotics Toolbox</a></li>
                            <li><a href="#traj" className="!text-white hover:underline">Trajectory Planning</a></li>
                            <li><a href="#control" className="!text-white hover:underline">Control Panel</a></li>
                            <li><a href="#ai" className="!text-white hover:underline">Minimax Algorithm</a></li>
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
                        src="/4inarow/cover.png"
                        alt="Profile"
                        className="w-auto h-110 rounded-2xl shadow-lg"
                    />
                    <h1 className="text-4xl font-bold text-center">Four in a Row - MATLAB Simulation</h1>
                </div>

                <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

                <section id='Overview' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">1. Overview</h2>
                        <div className="text-xl text-white leading-relaxed">
                            This MATLAB simulation demonstrates two robotic arms, UR3E and CRX10IA, collaborating to play a game 
                            of Four in a Row. The robots are programmed to alternate turns, marking X's and O's on a virtual 8x8 board. 
                            The simulation demonstrates robotic arm motion, pick-and-place operations, and basic game logic for Four in a Row. 
                            The robot arms can support each other to reach the play squares that are not within the other's reach. <br/> <br/>

                            Features: <br/> 

                            <ul className="list-disc list-outside leading-relaxed">
                                <li>UR3E Robot: Responsible for placing O's on the board (controlled by player).</li>
                                <li>CRX10IA Robot: Responsible for placing X's on the board (controlled by AI).</li>
                                <li>Game Logic: Implements Tic-Tac-Toe rules (4-in-a-row), checking for valid moves and determining the winner. </li>
                                <li>Motion: Each robot arm follows smooth trajectories generated using quintic polynomial and RMRC to pick and place
                                game pieces at designated board locations.</li>
                                <li>GUI game board: The player place 'O' by left-clicking, and the AI's response 'X' is visualised accordingly</li>
                                <li>Control panel: Allow the user to E-Stop the program, and can move the robot around manually.</li>
                            </ul>

                            <Figure src="/4inarow/test.png" alt="setup" caption="Figure 1.1. UR3e (left) and CRX10IA (right)" width='w-180'/> <br/> 

                            And as always, the full code and installation instruction is available on my<ExternalLink href="https://github.com/ladyhoai/Tic-Tac-Joe">Github</ExternalLink>. 
                            Check out this speeded-up demo of a short game as well! 

                            <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/gkXo_UkZbmU' 
                                    title='Warman Demo CatBot' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                Youtube video unable to load
                            </iframe>
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='RVC' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">2. Robotics Toolbox</h2>
                        <div className="text-xl text-white leading-relaxed">
                            For this project, we will be using MATLAB and Peter Corke's <ExternalLink href="https://petercorke.com/toolboxes/robotics-toolbox/">Robotics Toolbox</ExternalLink> for
                            easy kinematic calculations. These are 5 important functions in the toolbox that set the foundation for the system: <br/> <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="Link([theta, d, a, alpha])" language="matlab"/>
                                </summary>
                                    <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                        <p className="mb-2">Constructs a single robot link (or joint) using Denavit-Hartenberg (DH) parameters.</p>

                                        <ul className="list-disc list-outside space-y-1">
                                            <li>
                                                <span className="text-orange-300 font-medium">theta</span> – Joint angle (radians) — variable if joint is revolute.
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">d</span> – Link offset along Z (meters) — variable if joint is prismatic.
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">a</span> Link length along X (meters).
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">alpha</span> 	Link twist (radians), angle between Z axes
                                            </li>
                                        </ul>
                                    </div>
                            </details> <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="SerialLink(links, 'name', robot_name)" language="matlab"/>
                                </summary>
                                    <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                        <p className="mb-2">Creates a serial-link manipulator model. This object includes kinematics, dynamics, trajectory generation, 
                                            animation, and simulation for the robot.</p>

                                        <ul className="list-disc list-outside space-y-1">
                                            <li>
                                                <span className="text-orange-300 font-medium">links</span> –  An array of all joints in the kinematic structure, created by <code className="text-orange-300 bg-gray-800 px-1 rounded">Link()</code>.
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">'name'</span> – Optional name for the robot.
                                            </li>
                                        </ul>
                                    </div>
                            </details> <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="T = robot.fkine(q)" language="matlab"/>
                                </summary>
                                    <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                        <p className="mb-2">A method of the SerialLink object. Compute the forward kinematic (end-effector's position and orientation)
                                            given the robot's joint angles.</p>

                                        <ul className="list-disc list-outside space-y-1">
                                            <li>
                                                <span className="text-orange-300 font-medium">q</span> – Input: A vector of joint angles.
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">T</span> – Output: 4x4 homogeneous transformation matrix of the end-effector’s pose.
                                            </li>
                                        </ul>
                                    </div>
                            </details> <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="[q, err] = robot.ikcon(T, q0)" language="matlab"/>
                                </summary>
                                    <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                        <p className="mb-2">Computes the inverse kinematics using the numerical method. 
                                            It finds the joint angles q that achieve the desired end-effector pose T.</p>

                                        <ul className="list-disc list-outside space-y-1">
                                            <li>
                                                <span className="text-orange-300 font-medium">T</span> – Input: Desired end-effector pose.
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">q0</span> – Input: Initial guess for joint angles.
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">q</span> – Output: A vector of joint angles to achieve end-effector pose T .
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">err</span> – Output: Final pose error.
                                            </li>
                                        </ul>
                                    </div>
                            </details> <br/>

                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="robot.animate(q)" language="matlab"/>
                                </summary>

                                    <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                        <p className="mb-2">Moves the robot to a given joint configuration without camera panning or reset.</p>

                                        <ul className="list-disc list-outside space-y-1">
                                            <li>
                                                <span className="text-orange-300 font-medium">q</span> – Input: Joint configuration to animate to.
                                            </li>
                                        </ul>
                                    </div>
                            </details> 
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='traj' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">3. Trajectory Planning</h2>
                        <h3 className="text-xl font-semibold mb-6">3.1. Types of Trajectory</h3>
                        <div className="text-xl text-white leading-relaxed">
                            There are 2 techniques used to move the robot from one pose to another: Joint Space Interpolation and Resolved-Rate Motion Control (RRMC).
                            For the first technique, Robotics Toolbox provided the function <InlineCode code="jtraj(q0, qf, m)" language="matlab"/>, which used
                            a quintic polynomial for velocity and acceleration, to move from current joint positions <InlineCode code="q0" language="matlab"/> to
                            target <InlineCode code="qf" language="matlab"/> in <InlineCode code="m" language="matlab"/> time steps. This maneuver is useful if the orientation
                            of the end-effector changed between the initial and target pose (not a straight-line trajectory).
                            <Figure src="/4inarow/jtraj.gif" alt="setup" caption="Figure 3.1. Joint Space Interpolation"/> <br/> 
                            On the other hand, RRMC is used in the case we want to confine the end-effector's path between goals to a straight line. It makes the 
                            trajectory more predictable, providing more control over the robot's behaviour. However, the Robotic Toolbox does not provide a direct
                            function to calculate this trajectory, but we can easily solve for the joint velocities at a certain time step using the robot's Jacobian:
                            <CodeBlock code={RRMC} language='matlab'/>
                            The result after this loop is a qMatrix containing the joint-space waypoints. Calling the <InlineCode code="animate(q)" language="matlab"/> function
                            on each of these waypoint, we can confirm the straight-line trajectory.
                            <Figure src="/4inarow/rrmc.gif" alt="setup" caption="Figure 3.2. Resolved-Rate Motion Control"/> <br/>
                        </div>
                        <h3 className="text-xl font-semibold mb-6">3.2. Pick and Place</h3>
                    </div>
                </section>

                <div className="my-18" />

                <section id='control' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">4. Control Panel</h2>
                        <div className="text-xl text-white leading-relaxed">
                            We also provide an easy-to-use control panel for manually moving the robot whether by changing individual joint or moving in Cartesian 
                            space.
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='ai' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">5. Minimax Algorithm</h2>
                        <div className="text-xl text-white leading-relaxed">
                            We also provide an easy-to-use control panel for manually moving the robot whether by changing individual joint or moving in Cartesian 
                            space.
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}