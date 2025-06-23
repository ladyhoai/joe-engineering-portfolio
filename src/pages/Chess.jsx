import React, { useEffect } from 'react';
import ExternalLink from '../components/ExternalLink';
import { CodeBlock, InlineCode } from '../components/CodeBlock';

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
                            <li><a href="#Setup" className="!text-white hover:underline">Hardware Setup & System Architecture</a></li>
                            <li><a href="#Stockfish" className="!text-white hover:underline">GUI & Stockfish ROS 2 Node</a></li>
                            <li><a href="#Control" className="!text-white hover:underline">UR3e Robot Control Node</a></li>
                            <li><a href="#Vision" className="!text-white hover:underline">Computer Vision for Player Move Detection</a></li>
                            <li><a href="#Discussion" className="!text-white hover:underline">Discussion & Potential Improvements</a></li>
                        </ol>
                    </nav>
                </div>

                <img 
                    src="/chessImg/Logo v2.png" 
                    alt="Table of Contents Footer Image" 
                    className="w-full object-cover rounded mt-4"
                />
            </aside>

            {/* Main Content */}
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

                <main className="mt-20 p-8 space-y-8">
                    <div className="flex flex-col items-center">
                        <img src="/chessImg/Cover.jpeg" alt="Profile" className="w-auto h-110 rounded-2xl shadow-lg"/>
                           
                        <h1 className="text-4xl font-bold text-center mt-8">The Autonomous Chess Cobot</h1>
                    </div>

                    <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

                    {/* Overview and gif */}
                    <section id='Overview' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                        <div className="text-left">
                            <h2 className="text-4xl font-semibold mb-6">1. Overview</h2>
                            <div className="text-xl text-white leading-relaxed">
                                The chess playing system was built by my team of 4 for the Robotic Studio 2 subject at UTS. 
                                It used the UR3e robot arm, computer vision, chess AI, and a GUI powered by the Raspberry Pi 5, 
                                with the goal of creating a unique chess experience. The final product includes selectable difficulty, 
                                a Gazebo simulation environment, autonomous localisation of the chessboard, 
                                and a chess bin to store captured pieces — all designed to provide the best experience for the end user. 
                                <br/> <br/>
                                Over 12 weeks, our team successfully delivered the product to our project's client, 
                                meeting 100% of the contractual requirements. This project gave me the opportunity to significantly 
                                improve my skills in ROS 2, ArUco marker localisation, and transfer learning for image classification.
                                <br/> <br/> 
                                Check out the full test video on <ExternalLink href="https://www.youtube.com/watch?v=lQcVdSzdOmk&t=309s">YouTube</ExternalLink>.
                            </div>
                        </div>
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

                    <section id='Setup' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                        <h2 className="text-4xl font-semibold mb-6 text-left w-full">2. Hardware Setup & System Architecture</h2>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
                            <div className="flex-1 text-left">
                                <div className="text-xl text-white leading-relaxed">
                                    The following components are required to use Chess Bot: <br/><br/>
                                    <ul className="list-disc list-outside text-white text-lg leading-relaxed">
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
                                        <li>Ethernet to USB-C adapter (if the control computer have no ethernet port)</li>
                                        <li>And a great strategy because Stockfish will not go easy on you !!</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <img 
                                    src="/chessImg/hardwareSetup.webp"
                                    alt="setup"
                                    className="mt-10 w-80 h-auto object-cover shadow-lg rounded-2xl"
                                />
                                <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 2.1. Hardware Setup
                                </figcaption>
                            </div>
                        </div>
                        <div className="text-left w-full">
                            <p className="text-xl text-white leading-relaxed">
                                The system's software is built around ROS 2, consisting of 7 nodes as can be seen in the diagram below, 2 of which are
                                open-source drivers for the <ExternalLink href="https://github.com/UniversalRobots/Universal_Robots_ROS2_Driver"> 
                                UR3e Robot Arm </ExternalLink> and <ExternalLink href="https://github.com/IntelRealSense/realsense-ros">
                                RealSense D435i</ExternalLink>.
                            </p> 
                        </div>
                        <figure className="mt-4">
                            <img src="/chessImg/sysdia.png" alt="setup" className="w-140 h-auto object-cover shadow-lg mx-auto"/>
                            <figcaption className="mt-2 text-white text-lg text-center italic">
                                Figure 2.2. System Architecture
                            </figcaption>
                        </figure>
                    </section>

                    <div className="my-18" />

                    <section id='Stockfish' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                        <div className="text-left w-full">
                            <h2 className="text-4xl font-semibold mb-6">3. GUI & Stockfish ROS 2 Node</h2>
                            <div className="text-xl text-white leading-relaxed">
                                The graphical user interface (GUI) is developed using C++ and SFML, featuring standard chess piece designs and 
                                user-friendly gameplay assistance tools, such as legal move indicators. This GUI is then integrated into the 
                                Stockfish ROS node, which detects player moves via mouse input and transmits the move data to 
                                <ExternalLink href="https://github.com/official-stockfish/Stockfish">Stockfish </ExternalLink> in 
                                <ExternalLink href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">Forsyth-Edwards Notation 
                                (FEN)</ExternalLink> format for analysis and response. The node will also receive moves published from the move detection node (more in section 5)
                                and update the GUI accordingly. The engine's response is then visualised on the GUI, forming the simple game loop.

                                <figure className="mt-4">
                                    <img src="/chessImg/chessGUI.gif" alt="setup" className="w-140 h-auto object-cover shadow-lg mx-auto"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 3.1. Chess GUI using SFML.
                                    </figcaption>
                                </figure>
                                <br/> 
                                During development, an issue was encountered in which Stockfish’s communication pipe (using Boost.Process) would crash without providing 
                                any debug output. After my investigation, the cause was due to an incorrectly updated castling availability field 
                                in the FEN string, which did not accurately reflect the current game state. Correcting this swiftly resolved the 
                                crashing issue. You can view the code for this node 
                                <ExternalLink href="https://github.com/Cameron-j1/RS2/blob/charles_dev/ros2_rs2_packages/ur3_test_control/src/chessboard.cpp">here</ExternalLink>.
                            </div>
                        </div>
                    </section>

                    <div className="my-18" />

                    <section id='Control' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                        <div className="text-left w-full">
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
                            <div className="text-xl text-white leading-relaxed">
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
                            </div>
                            <h3 className="text-xl font-semibold mb-6">4.2. Adapting to Varying Piece Heights.</h3>
                            <div className="text-xl text-white leading-relaxed">
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
                            </div>
                            <h3 className="text-xl font-semibold mb-6">4.3. Converting chess coordinates to world coordinates.</h3>
                            <div className="text-xl text-white leading-relaxed">

                                After receiving the move request from the Stockfish node, we will need to
                                convert the chess coordinate to 2 x-y pairs that reflect the distance of the
                                start and destination square to the robot’s base in millimetres (mm). 
                                <figure className="mt-4">
                                    <img 
                                        src="/chessImg/coord2real.png"
                                        alt="setup"
                                        className="w-170 h-auto object-cover shadow-lg mx-auto"
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
                            </div>
                        </div>
                    </section>

                    <div className="my-18" />

                    <section id='Vision' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                        <div className="text-left w-full">
                            <h2 className="text-4xl font-semibold mb-6">5. Computer Vision for Player Move Detection</h2>
                            <div className="text-xl text-white leading-relaxed">
                                In order for the robotic system to autonomously play chess reliably, it required the
                                capability to detect legal moves made on the physical board by the human player. To
                                achieve this, we will individually process the image of each cell of the chessboard to
                                detect the presence of a red dot. After this, we will get an 8x8 occupancy matrix, and
                                from detecting the change in this matrix, it is possible to infer the most recent
                                physical move. The grid red dot is a customised feature of our chessboard for this
                                sole detection purpose.

                                <figure className="mt-4">
                                    <img src="/chessImg/physicalBoard.png" alt="setup" className="w-140 h-auto object-cover shadow-lg mx-auto"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 5.1. 3D printed chess board with red dots and ARUCO tags.
                                    </figcaption>
                                </figure> <br/>
                                 
                                <h3 className="text-xl font-semibold mb-6">5.1. Occupancy Grid Construction</h3>

                                <p className='text-white font-semibold'>Iteration 1: </p>
                                Initially, we planned on using an existing<ExternalLink href="https://github.com/maciejczyzewski/neural-chessboard">Github </ExternalLink> 
                                repository that used OpenCV image processing algorithms combined with a neural network to isolate the
                                chessboard from a given picture captured by the onboard camera,
                                then segmented it into 64 cell images, and on each image used circular contour
                                detection and colour thresholding to output a single True/False value indicating the
                                presence of a red dot. After that, 64 results would be combined into an 8x8 matrix.

                                <figure className="mt-4">
                                    <img src="/chessImg/IdealCV.png" alt="ideal CV" className=" h-auto object-cover mx-auto"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 5.2. Ideal workflow of the initial computer vision subsystem.
                                    </figcaption>
                                </figure> <br/>

                                However, we soon found this technique to be very unreliable as it frequently failed to
                                perform a clean isolation of the chessboard from the environment. Therefore,
                                subsequent image processing steps could not be performed.

                                <figure className="mt-4">
                                    <img src="/chessImg/WrongCrop.png" alt="ideal CV" className=" h-auto object-cover mx-auto" />
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 5.3. The chessboard isolation algorithm wrongly cropped the first row.
                                    </figcaption>
                                </figure> <br/>

                                <p className='text-white font-semibold'>Iteration 2: </p>
                                As the method listed above has low reliability, we tried to move the
                                camera to a fixed position above the chessboard, and OpenCV image processing
                                would carry out dot detection. This position is calculated relative to the detected
                                locations of Aruco tags on the chessboard.

                                <figure className="mt-4">
                                    <img src="/chessImg/WorkFlow2.png" alt="ideal CV" className=" h-auto object-cover mx-auto"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 5.4.  Chessboard isolation workflow for iteration 2.
                                    </figcaption>
                                </figure> <br/>

                                This method provided substantially better chessboard images with acceptable
                                imperfections. However, we discovered that our OpenCV approach
                                (using colour thresholding, morphological operations with a circular kernel and
                                contour detection) to dot detection produced poor results regarding accuracy It struggled 
                                to stabilise the occupancy matrix with many values alternating
                                between false positives and false negatives. We suspected that different lightning
                                conditions and an undertuned colour range had a large impact on overall accuracy.

                                <figure className="mt-4">
                                    <img src="/chessImg/WrongDot.gif" alt="ideal CV" className=" h-auto object-cover mx-auto"/>
                                    <br/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 5.5. High chance of misdetection using OpenCV algorithms (Detected red dots are
                                        overlaid with green dots).
                                    </figcaption>
                                </figure> <br/>
                                
                                <p className='text-white font-semibold'>Iteration 3 (Worked!): </p>
                                As the chessboard isolation is confirmed to be working, we will
                                review our approach to red dot detection. This time, we trained a single-label image
                                classifier on Roboflow to account for varying environmental conditions. This
                                approach is also easily scalable, as extending the training dataset is much less
                                time-consuming compared to experimentally adjusting OpenCV function parameters.
                                We have taken approximately 1500 cell images of occupied and empty cells to
                                create a big enough dataset, manually labelled them and performed transfer learning
                                from a ResNet101 classification deep learning model.

                                <figure className="mt-4">
                                    <img src="/chessImg/WorkingDot.gif" alt="ideal CV" className=" h-auto object-cover mx-auto"/>
                                    <br/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 5.6. The image classification model trained on Roboflow produced satisfying results. It
                                    can detect with high confidence (1) in varying light conditions and angles..
                                    </figcaption>
                                </figure> <br/>

                                The detection output is considerably improved from the previous attempt, 
                                as false detections were very rarely observed in the resulting occupancy
                                grid. The false values likely happened due to a few images
                                being too off-centre, as sometimes the chessboard localisation was off tolerance.
                                Overall, the system is robust against noisy cell images, with confidence
                                that did not drop below 0.71. 
                                <br/><br/>

                                <h3 className="text-xl font-semibold mb-6">5.2. Player Move Inference Logic</h3>
                                Subsequent to obtaining the occupancy grid, we can use that information to find the
                                most recent physical move on the board by the human opponent. Essentially, we will
                                compare this grid to the previous board state to detect the changes in the dot
                                pattern. A preoccupied cell becomes empty, e.g. H8, will indicate that the piece
                                previously at H8 was moved elsewhere.

                                <figure className="mt-4">
                                    <img src="/chessImg/InferenceLogic.png" alt="IL" className=" h-auto object-cover mx-auto"/>
                           
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 5.7. In the current logic, 1 is empty (available) and 0 is occupied. As seen above, cell H8
                                    is previously occupied by the black bishop, now empty, indicating the bishop at H8 was played.
                                    </figcaption>
                                </figure> <br/>

                                To find the location where the piece was moved to, we will first identify all legal
                                moves of the selected piece, then find a single legal cell that contains a black piece.
                                That cell would be the destination of the piece. Note that under no circumstances
                                would we see more than 1 cell with black pieces in the list of legal moves of any
                                piece, as that would imply the possibility of capturing a same-colour piece, which is
                                illegal in conventional chess.

                                <figure className="mt-4">
                                    <img src="/chessImg/Destination.png" alt="IL" className=" h-auto object-cover mx-auto"/>
                           
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 5.8. A black piece is detected in cell F6, therefore, it is the destination cell.
                                    </figcaption>
                                </figure> <br/>

                                Differentiating between black and white pieces required us to train a second
                                classifier. As this task is simpler than detecting a red dot due to the great contrasting
                                colour and the big contour of the piece, we reduced the size of the training dataset
                                by about 50%, with 700 images.

                                <figure className="mt-4">
                                    <img src="/chessImg/BWClassify.png" alt="IL" className=" h-auto object-cover mx-auto"/>
                           
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                    Figure 5.9. A simple and accurate Black/White classifier.
                                    </figcaption>
                                </figure> <br/>

                                For detecting special moves such as castling and en passant, we implemented a heuristic
                                check to reduce logic complexity. En passant will make 3 changes in the dot pattern,
                                whereas in castling, the rook and the king move in a very specific way, so that we
                                only need to check a certain 4 cells to identify this move.

                                That's all we need for the move detection system to work! Here's a short video showing it correctly
                                detecting a white pawn move forward 2 squares. <br/> <br/>

                                <video className='w-full rounded-xl shadow-lg' controls autoPlay muted>
                                        <source src='/chessImg/workingCV.mp4' type='video/mp4'/>
                                        Your browser does not support MP4 unfortunately
                                </video>
                            </div>
                        </div>
                    </section>

                    <div className="my-18" />

                    <section id='Discussion' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                        <div className="text-left w-full">
                            <h2 className="text-4xl font-semibold mb-6">6. Discussion & Potential Improvements</h2>
                            <div className="text-xl text-white leading-relaxed">
                                It has been a great opportunity for me to work on the incredible UR3e provided to us by the UTS Mechatronic Lab.
                                I would also like to thank my team: Cameron, Charles and Fergus for putting in efforts to finish & polish their 
                                subsystems for the chess playing robot! Their commitment has been instrumental in the project's success.
                                This project has greatly improved my expertise with ROS 2 & machine learning as a tool
                                for robotic development, and from this point on, I am also more confidence to use ROS for simulating harder 
                                kinematic systems, such as bipedal or quadrupled robot, for even more exciting projects!
                                <br/><br/>
                                An exciting upgrade in the future would be a funny AI commentator for the live chess game using 
                                LLMs & Text-to-Speech (TTS) technology. We can train a TTS model with transfer learning using the voice data of
                                our friends, and I believe that would make the gameplay experience even more hilarious. Furthermore, we could also
                                make the system play 3-player or 4-player chess, however it will not be as competitive as traditional chess due to
                                the lack of a good game engine for those variants. A <ExternalLink href="https://www.youtube.com/watch?v=CSOnnle3zbA"> 
                                pawn-to-queen transformer</ExternalLink> would be visually satisfying, but how many humans can crown in a game against Stockfish?
                            </div>
                        </div>
                    </section>
                </main> 
                
                <footer>
                    <img 
                    src="/chessImg/groupPic.JPG" 
                    alt="Footer Image" 
                    className="w-full max-h-[500px] object-cover"
                    />
                </footer>
            </div> 
        </div>
    );
}