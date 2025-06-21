import React from 'react';
import ExternalLink from '../components/ExternalLink';
import CodeBlock from '../components/CodeBlock';

const computeCartesianPath = "move_group_ptr->computeCartesianPath(waypoints, eef_step, jump_threshold, trajectory);"
const jointAngle = `std::vector<double> joint_positions = {0.0, -1.0, 1.0, 0.0, 1.5, 0.0}; 
move_group_ptr->setJointValueTarget(joint_positions);`;
const CartesianAndJointAngleMove = `moveit::planning_interface::MoveGroupInterface::Plan plan;
auto planning_result = move_group_ptr->plan(plan);
if (planning_result == moveit::core::MoveItErrorCode::SUCCESS) {
    auto execution_result = move_group_ptr->execute(plan);
    if (execution_result == moveit::core::MoveItErrorCode::SUCCESS)
        std::cout << "Move Success!"; //Print custom messages
}`
const lookupTable = ` std::unordered_map<char, double> pieceHeight = {
    {'p', 0.165-20/1000}, {'r', ((0.1783-0.005) + (0.165-20/1000))/2 }, {'n', 0.1793},
    {'b', 0.181}, {'q', 0.1848-50/1000 }, {'k', 0.1877},
    {'P', 0.165-20/1000}, {'R', ((0.1783-0.005) + (0.165-20/1000))/2}, {'N', 0.1793},
    {'B', 0.181}, {'Q', 0.1848-50/1000}, {'K', 0.1877}
};`
const moveRequest = `std::string move_request = "d8d5cqN";
// 1. 'd8d5': The start square is 'd8' and destination square is 'd5'
// 2. 'c': The type of move is 'capture', 'n' for normal otherwise
// 3. 'q': The piece moved is the black queen
// 4. 'N': The piece captured is the black knight`

const rowCol = `double col = file - 'a', row = rank - '1';
col = abs(col-7); //'h' = 0 'a' = 7`

const realWorldTransform = `double dx = col * (SQUARE_SIZE / 1000.0);
double dy = -row * (SQUARE_SIZE / 1000.0);
if (board_yaw < 1.57) {
    dx = -col * (SQUARE_SIZE / 1000.0);
    dy = row * (SQUARE_SIZE / 1000.0);
}
double x_from_base = -(H1_X + dx * cos(yaw) - dy * sin(yaw));
double y_from_base = -(H1_Y + dx * sin(yaw) + dy * cos(yaw));`

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
                    <h2 className="text-4xl font-semibold mb-6">1. Overview</h2>
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
                    Check out the full test video on <ExternalLink href="https://www.youtube.com/watch?v=lQcVdSzdOmk&t=309s">YouTube</ExternalLink>.
                    </p>
                </div>

                {/* GIF Below */}
                <figure className="mt-4">
                    <img 
                        src="/chessImg/chessfast.gif"
                        alt="setup"
                        className="w-140 h-auto object-cover shadow-lg rounded-2xl mx-auto"
                    />
                    <figcaption className="mt-2 text-white text-lg text-center italic">
                        This is me playing chess against the system!
                    </figcaption>
                </figure>
            </section>

            <div className="my-18" />
            
            <h2 className="text-left text-4xl font-semibold mb-6">2. Hardware Setup & System Architecture</h2>
            {/* Hardware SetUp Section */}
            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center md:items-start gap-12">
                {/* Left Side - Text */}
                <div className="flex-1 text-left">
                   
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
                        <li>And a great strategy because Stockfish will not go easy on you !!</li>
                        </ul>
                    </p>
                </div>

                {/* Right Side - Picture */}
                <div className="flex-shrink-0">
                    <img 
                        src="/chessImg/hardwareSetup.webp"
                        alt="setup"
                        className="mt-auto w-80 h-auto object-cover shadow-lg rounded-2xl"
                    />
                    <figcaption className="mt-2 text-white text-lg text-center italic">
                        Figure 2.1. Hardware Setup
                    </figcaption>
                </div>
            </section>

            <div className="my-10" />

            {/* System diagram */}
            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* Text */}
                <div className="text-left">
                    <p className="text-xl text-white leading-relaxed">
                        The system's software is built around ROS 2, consisting of 7 nodes as can be seen in the diagram below, 2 of which are
                        open-source drivers for the <ExternalLink href="https://github.com/UniversalRobots/Universal_Robots_ROS2_Driver"> 
                        UR3e Robot Arm </ExternalLink> and <ExternalLink href="https://github.com/IntelRealSense/realsense-ros">
                        RealSense D435i</ExternalLink>.
                    </p> 
                </div>

                <figure className="mt-4">
                    <img 
                        src="/chessImg/sysdia.png"
                        alt="setup"
                        className="w-140 h-auto object-cover shadow-lg mx-auto"
                    />
                    <figcaption className="mt-2 text-white text-lg text-center italic">
                        Figure 2.2. System Architecture
                    </figcaption>
                </figure>
            </section>

            <div className="my-18" />

            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* Text */}
                <div className="text-left">
                    <h2 className="text-4xl font-semibold mb-6">3. GUI & Stockfish ROS 2 Node</h2>
                    <p className="text-xl text-white leading-relaxed">
                        The graphical user interface (GUI) is developed using C++ and SFML, featuring standard chess piece designs and 
                        user-friendly gameplay assistance tools, such as legal move indicators. This GUI is then integrated into the 
                        Stockfish ROS node, which detects player moves via mouse input and transmits the move data to Stockfish in 
                        Forsyth-Edwards Notation (FEN) format for analysis and response. The engine's response is then visualised on the GUI, 
                        forming the simple game loop.
 
                        <br/> <br/>
                        During development, an issue was encountered in which Stockfish’s communication pipe would crash without providing 
                        any debug output. After my investigation, the cause was due to an incorrectly updated castling availability field 
                        in the FEN string, which did not accurately reflect the current game state. Correcting this swiftly resolved the 
                        crashing issue.
                    </p> <br/>
                </div>
            </section>
            <div className="my-18" />

            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* Text */}
                <div className="text-left">
                    <h2 className="text-4xl font-semibold mb-6">4. UR3e Robot Control Node</h2>
                    <p className="text-xl text-white leading-relaxed">
                        My task was to develop a simple controller (UR3e control node) to
                        execute the piece move request sent from the Stockfish node (Figure 3.3). To
                        achieve this, first, we have to convert the piece position from the chess coordinates,
                        such as “e5”, to real-world coordinates relative to the base of the robot. After that,
                        the robot will execute different motion plans to pick and place pieces depending on
                        whether the requested move is a normal or capture move. <br/>
                        
                    </p> <br/>

                    <h3 className="text-xl font-semibold mb-6">4.1. Control System Design</h3>
                        <p className="text-xl text-white leading-relaxed">
                            Due to the nature of the project, most of the motions will use straight-line
                            trajectories, which can be easily computed by using Moveit’s built-in function: <br/>
                            
                            <CodeBlock code={computeCartesianPath}/>

                            We will have to account for 2 types of moves: capture and normal.
                            For a normal move, there are 8 goals to execute, and 12 goals for capturing. These
                            goals will be reached in the sequence as shown below.

                            <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-6">
                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/chessImg/normalMove.gif" alt="Normal Move" className="w-full rounded shadow-md"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 4.1: Normal move 
                                    </figcaption>
                                </figure>

                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/chessImg/captureMove.gif" alt="Capture Move" className="w-full rounded shadow-md"/>  
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 4.2: Capture move 
                                    </figcaption>
                                </figure>
                            </div> <br/>

                            There are situations where a Cartesian trajectory is not suitable, such as when
                            the end-effector has to move up high (Figure 4.2) for the camera to have a wide view of the workspace, 
                            as the end-effector now has some negative pitch. Therefore, we used joint control to reach this pose, 
                            and the joint values of this pose are found by free-driving the robot to it and reading the angles
                            from the teach pendant. Moveit conveniently also provides a simple function for moving the robot using 
                            joint values: <br/> 

                            <CodeBlock code={jointAngle}/>

                            To execute these trajectories (Cartesian and joint control), we will first plan them, then execute as follows: <br/>

                            <CodeBlock code={CartesianAndJointAngleMove}/>
                        </p> <br/>

                    <h3 className="text-xl font-semibold mb-6">4.2. Adapting to Varying Piece Heights.</h3>
                        <p className="text-xl text-white leading-relaxed">
                            As every piece has a different height, with the pawn being the shortest and the king
                            being the tallest, we need to create a lookup table using 
                            <code className="text-orange-300 bg-gray-800 px-1 rounded">std::unordered_map</code> to
                            find the correct height for picking and placing a given chess piece. 

                            <CodeBlock code={lookupTable}/>
                            The information about the type of move and what piece was played is also included
                            in the move request sent from the Stockfish node to the UR3e control node. A
                            complete move request message would look similar to this:

                            <CodeBlock code={moveRequest}/>
                            With the piece information included (‘q’ and ‘N’ in this case), we can use the lookup table to set
                            the pick and place height accordingly.
                        </p> <br/>

                    <h3 className="text-xl font-semibold mb-6">4.3. Converting chess coordinates to world coordinates.</h3>
                        <p className="text-xl text-white leading-relaxed">
                            After receiving the move request from the Stockfish node, we will need to
                            convert the chess coordinate to 2 x-y pairs that reflect the distance of the
                            start and destination square to the robot’s base in millimetres (mm). 

                            <figure className="mt-4">
                                <img 
                                    src="/chessImg/coord2real.png"
                                    alt="setup"
                                    className="w-140 h-auto object-cover shadow-lg mx-auto"
                                />
                                <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 4.3. Chess coordinate (B8-C6) to world coordinate
                                </figcaption>
                            </figure>
                            <br/>
                            
                            According to Figure 2.2, we already have the chessboard localisation node
                            constantly sending the chessboard position to our UR3e control node. More
                            specifically, the localisation node will update both the position and orientation of
                            4 corners of the board at a high rate. Then, we could calculate the position of H1 based 
                            on the position of any corner, since H1 is always at a fixed distance from the selected corner. 
                            From this H1 location, we can apply basic transform math to calculate the location of any other 
                            squares on the chessboard. The accuracy of this operation depends heavily on the localisation quality of H1.

                            <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-6">
                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/chessImg/Localisation.png" alt="Localisation" className="w-full rounded shadow-md"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 4.4: ArUco localisation of 4 corners, indicated by 4 markers 
                                    </figcaption>
                                </figure>

                                <figure className="flex flex-col items-center transform mx-auto">
                                    <img src="/chessImg/LocalisationWorkflow.png" alt="Localisation Workflow" className="h-78 w-auto shadow-md"/>  
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 4.5: Localisation Workflow 
                                    </figcaption>
                                </figure>
                            </div> <br/>

                            For the math, first, we will convert the received chess coordinates to row and column:
                            <CodeBlock code={rowCol}/>
                            Then, apply the following transforms to find the real-world coordinates (x and y only).
                            <CodeBlock code={realWorldTransform}/>
                            In the equations, <code className="text-orange-300 bg-gray-800 px-1 rounded">SQUARE_SIZE</code> is a 
                            constant reflecting the size of the square, which is 35mm, and   
                            <code className="text-orange-300 bg-gray-800 px-1 rounded">yaw</code> is the detected yaw of the 
                            chessboard in radians. Roll and pitch are not included, as we will not apply any tilt to the 
                            chessboard during the game.
                        </p>
                </div>
            </section>
            <div className="my-18" />

            <section className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12">
                {/* Text */}
                <div className="text-left">
                    <h2 className="text-4xl font-semibold mb-6">5. Computer Vision for Player Move Detection</h2>
                    <p className="text-xl text-white leading-relaxed">
                        The graphical user interface (GUI) is developed using C++ and SFML, featuring standard chess piece designs and 
                        user-friendly gameplay assistance tools, such as legal move indicators. This GUI is then integrated into the 
                        Stockfish ROS node, which detects player moves via mouse input and transmits the move data to Stockfish in 
                        Forsyth-Edwards Notation (FEN) format for analysis and response. The engine's response is then visualised on the GUI, 
                        forming the simple game loop.
 
                        <br/> <br/>
                        During development, an issue was encountered in which Stockfish’s communication pipe would crash without providing 
                        any debug output. After my investigation, the cause was due to an incorrectly updated castling availability field 
                        in the FEN string, which did not accurately reflect the current game state. Correcting this swiftly resolved the 
                        crashing issue.
                    </p> <br/>
                </div>
            </section>
        </div>
      );
    
}






