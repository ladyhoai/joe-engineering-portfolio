import React, { useEffect } from 'react';
import ExternalLink from '../components/ExternalLink';
import Figure from '../components/Figure';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { CodeBlock, InlineCode } from '../components/CodeBlock';
import StlViewer from '../components/StlViewer';

const move2Start = `initial_pose = get_actual_tcp_pose()
target_pose = initial_pose
target_pose[0] = X_Start_Line
target_pose[1] = Y_Start_Line
movel(target_pose, a=1.2, v=0.25)`

const torqueCheck = `% Set force threshold in Newtons
force_threshold = Pressure[i]
if force_threshold > 0:
    % Enter force mode, allowing only Z movement
    force_mode(initial_pose, [0, 0, 1, 0, 0, 0], 
    [0, 0, force_threshold, 0, 0, 0], 2, [0.2, 0.2, 0.1, 0.2, 0.2, 0.2])  
    while True:
        current_force = get_tcp_force()
        if norm(current_force[2]) >= force_threshold:
            break  % Exit loop if force threshold is met
        end
        sleep(0.1)  % Add a small delay to avoid excessive polling
    end
end`

const move2End = `target_pose = get_actual_tcp_pose()
target_pose[0] = X_End_Line
target_pose[1] = Y_End_Line
% Move to the line's end point
movel(target_pose, a=1.2, v=0.25)  
end_force_mode() 
% Raise the end effector
target_pose[2] = initial_pose[2] + 0.01
movel(target_pose, a=1.2, v=0.25)`

export default function Sketch() {
    useEffect(() => {
            window.scrollTo(0, 0); // or: { top: 0, behavior: 'smooth' }
            document.documentElement.style.backgroundColor = '#242526';
          }, []);
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-[#1d1d1d] text-white p-4 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto shadow-md z-40 hidden md:flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                    <nav aria-label="Table of contents">
                        <ol className="list-decimal list-outside space-y-2 text-base text-left font-semibold ml-5">
                            <li><a href="#Overview" className="!text-white hover:underline">Overview</a></li>
                            <li><a href="#gcode" className="!text-white hover:underline">Image to G-code</a></li>
                            <li><a href="#control" className="!text-white hover:underline">Robot Control</a></li>
                            <li><a href="#cad" className="!text-white hover:underline">Pencil & Paper Holder</a></li>
                            <li><a href="#result" className="!text-white hover:underline">Results & Potential Improvements</a></li>
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
                    <img src="/Draw.jpg" alt="Profile" className="w-auto h-110 rounded-2xl shadow-lg"/>
                    <h1 className="text-4xl font-bold text-center !text-white">Selfie Sketcher</h1>
                </div>

                <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

                <section id='Overview' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">1. Overview</h2>
                        <div className="text-xl text-white leading-relaxed">
                            This project aimed to use the UR3e robot arm to make high-quality pencil drawings based on a given image. To achive this, first I 
                            converted the original image to G-code, then load a custom URScript file to the robot to execute them. The result was a 2.5 hours (on average)
                            line-by-line drawing process, which after finishing would be a good pencil representation of the provided image. One special feature of this
                            project is the pressure control of the pencil tip, giving the drawing a shading effect which helped depict the picture's depth. The video below shows
                            the drawing process and results of 4 selfies of my friends.

                            <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/YP_nWWqP18o' 
                                    title='UR3e Pencil Sketch' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                Youtube video unable to load
                            </iframe> <br/>
                             
                            And this is the system's first successful attempt drawing my good friend Julian on the left! My friends at work Fernando is also having his 
                            on the right.
                            <Figure src="/sketch/julfern.jpg" alt="setup" width='w-200'/> 
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='gcode' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">2. Image to G-code</h2>
                        <div className="text-xl text-white leading-relaxed">
                            In this step, the provided image will be converted to a series of lines with the x-y coordinates of their start and end point, and the pressure 
                            required to draw the lines. This is a math-heavy process, and the phenomenal paper and code of Michal Adamik and his team published on
                            <ExternalLink href="https://doi.org/10.1016/j.robot.2021.103912">ResearchGate</ExternalLink> and<ExternalLink href="https://github.com/xgoga/FastRoboticPencilDrawing">GitHub </ExternalLink> 
                            has substantially facilitated this. Using a genetic algorithm, we only need to specify the target number of line depending on how detailed we want
                            the result pictures to be. If you want to have a deep dive into the math behind this, make sure to check out Michal's paper.
                            <Figure src="/sketch/jul.gif" alt="setup" caption="Figure 2.1. Result of the genetic algorithm, used to draw Julian"/> <br/>
                            And here is a snapshot of the first 5 lines in the generated G-code file. Each row represents a line, the <InlineMath math='1^{st}'/> and <InlineMath math='2^{nd}'/> column are the x and y coordinates
                            of the start point, the <InlineMath math='3^{rd}'/> and <InlineMath math='4^{th}'/>  are the end point's coordinates. The <InlineMath math='5^{th}'/> column is the 
                            target pencil pressure for that line. Normally, we will use between 3000 - 4000 lines for each image. 
                            <Figure src="/sketch/julCSV.png" alt="setup" caption="Figure 2.2. Generated G-code"/> 
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='control' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">3. Robot Control</h2>
                        <div className="text-xl text-white leading-relaxed">
                            For this project, we used URScript, a custom programming language developed by Universal Robot, to write the control program in. Another more popular method for controlling 
                            UR3e is using Moveit + ROS for better scalability, however Moveit can't read from the UR3e built-in 6-axis torque sensor, which is a critical component for accurate pressure control.
                            Additionally, our program is simple enough to be contained in a single script file, therefore URScript would be the best option for our application. Check out the user's manual on 
                            Universal Robot's<ExternalLink href="https://www.universal-robots.com/download/manuals-e-seriesur-series/script/script-manual-e-series-sw-511/">website</ExternalLink> for detailed
                            description of some functions we used below.
                            <br/><br/>
                            To draw a line on the paper, first set and move the position of the end effector to the line's start point. The function <InlineCode code="movel()" language='matlab'/> will
                            move the end effector in a straight line:
                            <CodeBlock code={move2Start} language='matlab'/>
                            Then, set the force (in Newtons) to apply to the end-effector using <InlineCode code="force_mode()" language='matlab'/>:
                            <CodeBlock code={torqueCheck} language='matlab'/>
                            Finally, after the end-effector pressed on the paper with enough force, we moved it to the line's end point and raised it up when the goal is reached. Note that we have to 
                            call <InlineCode code="end_force_mode()" language='matlab'/> so that the robot would not continuously try to push down in Z.
                            <CodeBlock code={move2End} language='matlab'/>
                            Repeating this process for all other lines in a while loop, and we can draw the complete picture! Here is the robot drawing a few lines:<br/><br/>
                            <div className="flex justify-center">
                                <video className='w-140 rounded-xl shadow-lg' controls>
                                    <source src='/sketch/felipe.mp4' type='video/mp4'/>
                                    Your browser does not support MP4 unfortunately
                                </video>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='cad' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">4. Pencil & Paper Holder</h2>
                        <div className="text-xl text-white leading-relaxed">
                            A custom simple tool is made to easily attach the pencil on the end effector. It is then 3D-printed with PLA, and a pencil is pressed-fit
                            into the tool, with a side screw to secure it in place.
                            <StlViewer url='/sketch/pencil.STL' fov={15}/> <br/>
                            Similarly, to secure the drawing paper in place, 2 3D-printed brackets will be mounted on both ends of the paper. Nuts and bolts will connect
                            the brackets with the T-slot table on the UR3e trolley. 
                            <StlViewer url='/sketch/paper.STL' fov={13}/> <br/>
                            For the bracket to be effective, make sure to place the drawing paper on a stack of similar paper to press the top against the bracket more, 
                            providing more holding force.
                            <Figure src="/sketch/bracket.png" alt="setup" caption="Figure 4.1. Bracket mounted to the T-slot table"/> 
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='result' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6 !text-white">5. Results & Potential Improvements</h2>
                        <div className="text-xl text-white leading-relaxed">
                            In the end, the robot has drawn 6 different pictures, no more due to the robot's inavailability during my university's semester break.
                            All pictures depicted good details of the drawing's subject, however the torque-based control method introduced some inconsistencies in 
                            shading intensity, occasionally resulting in areas that appeared either too light or too dark. Additionally, I had to periodically 
                            pause the robot to sharpen the pencil, which caused variations in line thickness that could not be precisely controlled 
                            during the drawing process. 
                            <Figure src="/sketch/result.png" alt="setup" caption="Figure 5.1. Drawing result"/> <br/>
                            In the future, this project is likely to be expanded to drawing with colored pencil or brushes, with closed-loop control using a camera mounted on the 
                            end-effector. Potentially, the G-code generation and camera monitoring system would be driven by a deep learning model, as in the real world, a human 
                            artist would employ several complex techniques to construct a drawing, and in my opinion, these are challenging to replicate using traditional mathematical 
                            algorithms. A final painting similar to the video below would be one to strive for.
                            
                            <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/l2rTQYbUa_w' 
                                    title='UR3e Pencil Sketch' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                Youtube video unable to load
                            </iframe> <br/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}