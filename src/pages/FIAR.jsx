import React, { useEffect } from 'react';
import Figure from '../components/Figure';
import ExternalLink from '../components/ExternalLink';
import { CodeBlock, InlineCode } from '../components/CodeBlock';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import PlyViewer from '../components/PlyViewer';

const RRMC = `for i = 1:steps-1
    xdot = (x(:,i+1) - x(:,i))/deltaT; % Translational velocity
    xdot_rot = (rotTraj(:,i+1) - rotTraj(:,i)) / deltaT; % Rotational
    xdot = [xdot; xdot_rot]; % Combine both into 1 4x4 matrix
    J = self.model.jacob0(qMatrix(i,:)); % Get the current Jacobian 
    qdot = pinv(J)*xdot; % Solve for joint velocitities
    qMatrix(i+1,:) = qMatrix(i,:) + deltaT*qdot'; % Update next
end
`
const translation = `actualX = mapStartTopRight_X + 0.1 * row;
actualY = mapStartTopRight_Y + 0.1 * col;`

const rowMinimax = `% Check rows for 4 consecutive marks
for row = 1:bWidth
    for col = 1:(bWidth - winCondition + 1)
        temp_arr = grid(row, col:col+winCondition-1);
        rowSum = sum(temp_arr);
        if rowSum == Xwin && all(temp_arr == 1)
            score = 10 - depth; % X win
            return;
        elseif rowSum == Owin && all(temp_arr == 2)
            score = -10 + depth; % O win
            return;
        end
        score = 0; % neutral if no side win
    end
end`

const pseudocode = `Function MINIMAX():
    1. Evaluate the current state of the board
    2. If:
        - A win or loss is found,
        - Or the maximum depth is reached,
        - Or there are no legal moves,
       then return the evaluation score as the value of this node.`

const maximiser = `3. If maximiser's turn:
a. best score so far = -Infinity.
b. For each empty cell:
    I. Place 'X'.
    II. Call MINIMAX with:
        - The updated board,
        - Depth - 1,
        - The same alpha and beta,
        - Minimiser's turn (false).
    III. Undo the above 'X' move.
    IV. Update the best score if 
        the returned score from the 
        MINIMAX call above is higher.
    V. alpha = max(alpha, best score).
    VI. If alpha >= beta:
        - Prune Branch (return)
c. Return best score.`

const minimiser = `3. If minimiser's turn:
a. best score so far = +Infinity.
b. For each empty cell:
    I. Place 'O'.
    II. Call MINIMAX with:
        - The updated board,
        - Depth - 1,
        - The same alpha and beta,
        - Maximiser's turn (true).
    III. Undo the above 'O' move.
    IV. Update the best score if 
        the returned score from the 
        MINIMAX call above is lower.
    V. beta = min(beta, best score).
    VI. If beta <= alpha:
        - Prune Branch (return).
c. Return best score.`

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
                            <li><a href="#control" className="!text-white hover:underline">Control Panel & Board GUI</a></li>
                            <li><a href="#ai" className="!text-white hover:underline">Minimax Algorithm</a></li>
                            <li><a href="#env" className="!text-white hover:underline">Environment & Safety</a></li>
                            <li><a href="#discussion" className="!text-white hover:underline">Discussion & Potential Improvements</a></li>
                        </ol>
                    </nav>
                </div>

                <img 
                    src="/4inarow/footer.png" 
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
                                                <span className="text-orange-300 font-medium">a</span> – Link length along X (meters).
                                            </li>
                                            <li>
                                                <span className="text-orange-300 font-medium">alpha</span> – Link twist (radians), angle between Z axes
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
                        <div className="text-xl text-white leading-relaxed">
                            Each play will require the robot to reach 8 different goals to move the piece from the piece stack to the desired location. Also, given the piece destination
                            as a pair of (row, col) on the digital game grid, it could be translated to the real-world coordinate by: 
                            <CodeBlock code={translation}/>
                            where <InlineCode code="0.1" language="matlab"/> is the center-to-center distance between adjacent cells. After calculating the goal, it could start the 
                            pick-and-place sequence. This sequence is the same for both CRX10IA and UR3e.
                            <Figure src="/4inarow/pnp.gif" alt="setup" caption="Figure 3.3. Pick and place sequence"/> <br/>
                        </div>
                        <h3 className="text-xl font-semibold mb-6">3.3. Piece Transfer</h3>
                        <div className="text-xl text-white leading-relaxed">
                            Sometimes, the UR3e has to place pieces outside of its reach (500mm). To achieve this, it will require assistance from the CRX with 1250mm of reach by transfering
                            the 'O' piece to the other arm. Similarly, when the CRX has to reach the 8th row counting from its base, it will transfer 'X' to the UR3e to help with placing.
                            Without the piece transfer mechanic, if the robot tries to achive a goal outside its designated reach, inverse kinematic will fail to converge for joint-space
                            interpolation, and for RRMC calculation, the joint velocities will become abnormally large. 
                            <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-6">
                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/4inarow/transferCRX.gif" alt="None" className="w-full rounded shadow-md"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 3.4: Piece transfer to CRX 
                                    </figcaption>
                                </figure>

                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/4inarow/transferUR.gif" alt="None" className="w-full rounded shadow-md"/>  
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 3.5: Piece transfer to UR3e 
                                    </figcaption>
                                </figure>
                            </div> 
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='control' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">4. Control Panel & Board GUI</h2>
                        <h3 className="text-xl font-semibold mb-6">4.1. Control Panel</h3>
                        <div className="text-xl text-white leading-relaxed">
                            We also provide an easy-to-use control panel for manually moving the robot whether by changing individual joint or moving the end-effector in Cartesian 
                            space. For the later, we implement a joy-stick for planar control and the green up-down button for moving respectively in Z. For joint control, 
                            simple use the sliders or 2 arrows beside it to adjust the angle for individual joint. The panel also provides an E_STOP (big button in red) to immediately halt the system, 
                            and it allows for resuming from the stopped state. 
                            <Figure src="/4inarow/panel.png" alt="setup" caption="Figure 4.1. Control Panel (left for CRX, right for UR3e)"/> <br/>
                            Note that it is the best practice for the system to be E-STOPPED before attempting the manual control 
                            to avoid path-planning conflicts, which might cause irrecoverable kinematic errors requiring a program restart.
                            <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-6">
                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/4inarow/jointTeach.gif" alt="None" className="w-full rounded shadow-md"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 4.2: Control both arms with joint angles. 
                                    </figcaption>
                                </figure>
                                
                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/4inarow/cartesianTeach.gif" alt="None" className="w-full rounded shadow-md"/>  
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 4.3: Control both arms in Cartesian space. 
                                    </figcaption>
                                </figure>
                            </div> 
                        </div> <br/>
                        <h3 className="text-xl font-semibold mb-6">4.2. Board GUI</h3>
                        <div className="text-xl text-white leading-relaxed">
                            For the human player to easily make their moves, instead of typing the move coordinate on the terminal, which is both error-prone and time-consuming, we made a digital
                            8x8 board where they can click to place 'O'. The program will highlight the square that the player's mouse is hovering on as well. To prevent cheating by placing multiple 
                            'O' at a time, we will disable all mouse callbacks for this GUI during Minimax's execution. 
                            <Figure src="/4inarow/GUI.gif" alt="setup" caption="Figure 4.4. The 8x8 board GUI"/>
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='ai' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">5. Minimax Algorithm</h2>
                        <div className="text-xl text-white leading-relaxed">
                            To make a response for the player's move, we wrote a simple search algorithm using Minimax and Alpha-Beta Prunning, using a custom reward structure, with a search depth of 4.
                            It is possible to look deeper, however the evaluation time would be exponentially longer. With a worst-case time complexity (no prunning) of <InlineMath math='O(b^d)'/>, where b 
                            is the branching factor, which is 64 in this case (8x8 board) and d is the search depth. Depth 4 is found to be the sweet spot that could balance between runtime and 
                            move quality. 
                        </div> <br/>
                        <h3 className="text-xl font-semibold mb-6">5.1. Board Evaluation</h3>
                        <div className="text-xl text-white leading-relaxed">
                            As we are finding the best move for X, X is selected to be the maximising player and O is the minimising player. The currently implemented algorithm will only return
                            non-zero values when a win is found, not for a potential win setup. Let's look into a code snippet from the program:
                            <CodeBlock code={rowMinimax} language='matlab'/>
                            This section will check for a win for X or O in all 8 rows of the board, and we will award higher evaluation score to the faster wins (with the lowest search depth).
                            Similarly, check for wins in columns and all diagonal lines needs to be done. See more in<ExternalLink href="https://github.com/ladyhoai/Tic-Tac-Joe/blob/main/board.m#L112">board.m</ExternalLink>
                        </div> <br/>
                        <h3 className="text-xl font-semibold mb-6">5.2. Minimax Search</h3>
                        <div className="text-xl text-white leading-relaxed">
                            <details open className="mb-4">
                                <summary className="text-white font-semibold mb-2">
                                    <InlineCode code="boardVal = miniMax(depth, alpha, beta, isMax)" language="matlab"/>
                                </summary>
                                <div className=" text-xl text-white leading-relaxed space-y-6 shadow-2xl ">
                                    <p className="mb-2">Return an evaluation score for the current board position.</p>
                                    <ul className="list-disc list-outside space-y-1">
                                        <li>
                                            <span className="text-orange-300 font-medium">depth</span> – Search depth.
                                        </li>
                                        <li>
                                            <span className="text-orange-300 font-medium">alpha</span> – Current score of the maximising player.
                                        </li>
                                        <li>
                                            <span className="text-orange-300 font-medium">beta</span> – Current score of the minimising player.
                                        </li>
                                        <li>
                                            <span className="text-orange-300 font-medium">isMax</span> – <InlineCode code="true" language="matlab"/> if it's the maximiser's turn
                                        </li>
                                    </ul>
                                </div>
                            </details> 
                            The idea for the best-move search is to iterate over all empty squares of the board, and for each square, play a temporary move there and retrieve the evaluation
                            score. After this loop, the program will play the move with the highest score. Here's the pseudocode of Minimax evaluating a single square:
                            <CodeBlock code={pseudocode} language='matlab'/>
                            After <InlineCode code="2." language="matlab"/>, the program will execute 1 of the following code blocks depending on whether it's the maximiser or minimiser's turn:
                            <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-6 ">
                                <div className="max-w-md w-full">
                                    <CodeBlock code={maximiser} language="matlab" />
                                </div>
                                <div className="max-w-md w-full">
                                    <CodeBlock code={minimiser} language="matlab" />
                                </div>
                            </div> 
                            On a side note, the runtime for this function is normally higher in the early game than end game due to the bigger search space (more available moves). Therefore, for the 
                            first few moves, please don't worry if the computer takes around 45 seconds to make a decision! The implementation of an opening book similar to the Stockfish chess engine 
                            would accelerate the early game substantially.
                        </div>  
                    </div>
                </section>

                <div className="my-18" />
                <section id='env' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">6. Environment & Safety</h2>
                        <h3 className="text-xl font-semibold mb-6">6.1. Modelling</h3>
                        <div className="text-xl text-white leading-relaxed">
                            One requirement of the project is to model the surrounding environment where the robots operate, with safety being the highest priority.
                            Safety equipments such as a physical E-STOP, human operators, sirens, fire extinguisers and emergency lights are included in the robot's workspace.
                            We used blender to make the assets, to set up the scene (which is a lot harder using MATLAB) and export it as a single mesh file. 
                            <PlyViewer url='/4inarow/env.ply'fov={15}/>
                        </div> <br/>
                        <h3 className="text-xl font-semibold mb-6">6.2. Safety: Collision Detection</h3>
                        <div className="text-xl text-white leading-relaxed">
                            Another important safety functionality of the system is for the robots to calculate whether it is colliding with the environment. 
                            To do this, we will use 2 loops to check if any link line (start and end point of a link) intersects any triangle in the obstacle's mesh, as
                            shown in the file<ExternalLink href="https://github.com/ladyhoai/Tic-Tac-Joe/blob/main/IsCollision.m">IsCollision.m</ExternalLink>. And to verify 
                            the detection is working, we created a controllable cube that we can move around in the environment. The system will E-STOP immediately like below upon contact.
                            It is still able to resume reaching its last goal when the obstacle is clear.
                            <Figure src="/4inarow/collide.gif" alt="setup" caption="Figure 6.1. System stop when collides with cube, and continue after"/>
                        </div>
                    </div>
                </section>

                <div className="my-18" />

                <section id='discussion' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">7. Discussion & Potential Improvements</h2>
                        <div className="text-xl text-white leading-relaxed">
                            This is my first MATLAB project with a good amount of complexity and debugging, which definitely is a big boost to my skills with the tool.
                            It helps me realise the power of MATLAB and its extensive support for developing control system and robotics application. This project ended up
                            getting me a High Distinction for a 3rd-year university subject, after spending 12 weeks working part-time on it. <br/> <br/>

                            However, the system has some functional drawbacks to be improved. First, the fully integrated simulation with control panel, environment and collision 
                            detection is running very slow (the video in Overview is already sped up by 30x), taking about 35-50 seconds to pick and place a piece which might 
                            unfortunately make some players uninterested. Second, the current implementation of Minimax doesn't have heuristics for openings, and evaluation scores 
                            aren't awarded to threats but only wins. Finally, and also the most challenging, computing-heavy enhancement: dynamic object avoidance, so that I can 
                            move the cube obstacle around, and the robot has to plan new trajectories in real-time to both avoid it, and still progress towards its goals.
                        </div>
                    </div> 
                </section> <br/>
               
                <footer>
                    <img 
                    src="/4inarow/footerPage.png" 
                    alt="Footer Image" 
                    className="w-full max-h-[450px] object-cover"
                    />
                </footer>
            </div>
        </div>
    );
}