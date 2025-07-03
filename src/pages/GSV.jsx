import React, { useEffect } from 'react';
import Figure from '../components/Figure';
import ExternalLink from '../components/ExternalLink';
import { CodeBlock, InlineCode } from '../components/CodeBlock';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import PlyViewer from '../components/PlyViewer';
import ZoomableFigure from '../components/ZoomPanPinch';
import { step } from 'three/tsl';

const audioSend = `void audio_client_event(void* arg, esp_event_base_t base, int32_t event_id, void* event_data) {
    if (base == WEBSOCKET_EVENTS) {
        if (event_id == WEBSOCKET_EVENT_DATA) {
            esp_websocket_event_data_t* received_buffer = (esp_websocket_event_data_t*) event_data;
            if (received_buffer->data_len > 20) 
            xRingbufferSend(speakerBuf, received_buffer->data_ptr, 
            received_buffer->data_len, 1000 / portTICK_PERIOD_MS);
        }}} //Receiving stream from websocket
`
const audio2Speaker = `void speaker_task(void* param) {
    while (true) {
        size_t item_size;
        char* item = (char*) xRingbufferReceive(speakerBuf, &item_size, 300 / portTICK_PERIOD_MS);
        if (item != NULL) {
            output_to_speaker(item, item_size);
            vRingbufferReturnItem(speakerBuf, (void*) item);
        }
        else vTaskDelay(10 / portTICK_PERIOD_MS); // Output audio to speaker
    }}`

const sonar = `NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);
int distance = sonar.ping_cm();`

const stepper = `#include <Stepper.h>
Stepper myStepper(2048, 0, 2, 1, 3);
void setup() {
  pinMode(4, INPUT); // receives from ECU ESP32 for direction control
  myStepper.setSpeed(15); // RPM
}
void loop() {
    if (digitalRead(4) == HIGH) myStepper.step(2048); // Clockwise
    else myStepper.step(-2048); // Counter-clockwise
    delay(1000);
}`

const camServer = `cameraBack.on('connection', (cam_client, req) => {
    console.log("camera back connected")
    cam_client.on('message', (data) => {  
        cameraBack.clients.forEach(function each(client) {
            if (client !== cam_client && client.readyState === WebSocket.OPEN) {     
                client.send(data) }})})})`

const interview = `https://www.linkedin.com/posts/xuan-kien-nguyen-7002a0236_joseph-impressive-activity-7105547017644380160-MngX?utm_source=share&utm_medium=member_desktop&rcm=ACoAADrGZfABv6UcIJK7IVeL-7z7DkwvRfzLKMc`

export default function GSV() {
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
                            <li><a href="#Design" className="!text-white hover:underline">Overall Design</a></li>
                            <li><a href="#Mechanical" className="!text-white hover:underline">Enclosure & Moving Parts</a></li>
                            <li><a href="#ECU" className="!text-white hover:underline">Electronic Control Unit</a></li>
                            <li><a href="#Firmware" className="!text-white hover:underline">Firmware Design</a></li>
                            <li><a href="#Web" className="!text-white hover:underline">Web Control Interface</a></li>
                            <li><a href="#Discussion" className="!text-white hover:underline">Discussion & Potential Improvements</a></li>
                        </ol>
                    </nav>
                </div>

                <img 
                    src="/car/carlogo.png" 
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
                        src="/car.png"
                        alt="Profile"
                        className="w-auto h-110 rounded-2xl shadow-lg"
                    />
                    <h1 className="text-4xl font-bold text-center">Global Surveillance Vehicle</h1>
                </div>

                <hr className="border-t-2 border-dotted border-gray-400 my-12 w-full max-w-6xl mx-auto" />

                <section id='Overview' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">1. Overview</h2>
                        <div className="text-xl text-white leading-relaxed">
                            The global surveillance vehicle (GSV) is my first robotic project, featuring a 4-wheeled skid-steer robot that is controlled via the cellular network. 
                            On the robot mounted 2 cameras for environment monitoring, a microphone and speaker for audio transmission, and a big LED for general graphic display.
                            To connect to the 4G/5G network, inside the robot has a TP-Link TL-MR6400 V5 router with a prepaid sim card for this purpose. For control, the user will
                            connect to a web server to send move commands, as well as receive the camera feed and other sensor information. The robot's 3D-printed enclosure, brackets, 
                            electronic control unit and firmware are all designed by me! <br/> <br/>

                            The video below shows the robot under testing. My friend was controlling the robot from America to explore my apartment floor in Vietnam with the latency of
                            around 1-2 seconds, depending on the cellular's signal strength.

                            <iframe className='w-full max-w-3xl mx-auto mt-10 aspect-video' src='https://www.youtube.com/embed/UvbhBeWgfCY' 
                                    title='Warman Demo CatBot' allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen>
                                Youtube video unable to load
                            </iframe>
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='Design' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">2. Overall Design</h2>
                        <div className="text-xl text-white leading-relaxed">
                            This diagram shows the different components and subsystems of GSV and how they interact with each other. The parts having red font
                            are motors and moving parts, parts within a grey and light yellow box are mounted on the front and back panel, respectively. The arrows indicate the mechanical
                            connections between parts.
                            <Figure src="/car/ComponentDiagram.png" alt="setup" caption="Figure 2.1. Component Diagram" width='w-220'/> <br/> 
                            We used a range of sensors and LCDs to gather data and interact with GSV's surrounding environment in real time:<br/>
                            <ul className="list-disc list-outside text-white leading-relaxed">
                                <li><span className="font-semibold">ESP32 Cameras:</span> Sending live camera feed of GSV's front and back view to control station.</li>
                                <li><span className="font-semibold">INMP-441 Microphone:</span> Recording live audio and send to control station.</li>
                                <li><span className="font-semibold">Speaker Module:</span> Outputing audio sent from the controller's microphone.</li>
                                <li><span className="font-semibold">Sonar Sensor :</span> Getting the distance between GSV and closest front and back obstacles.</li>
                                <li><span className="font-semibold">Motion Sensor:</span> Detecting living object sneaking behind GSV!</li>
                                <li><span className="font-semibold">LCD 1602:</span> A small display to show short messages sent from control.</li> 
                                <li><span className="font-semibold">ILI9341:</span> Bigger display to show the video feed sent from control and more complex graphics.</li>
                                <li><span className="font-semibold">GPS U-blox NEO-6M:</span> Tracking the position of the robot.</li>
                            </ul> <br/>

                            Below is the bill of material for the robot, the total cost is approximately $600 AUD including the batteries and router. This number is varying marginally between countries, 
                            moveover, components' availability also has an impact on the cost. <br/><br/>
                            <iframe src="https://docs.google.com/spreadsheets/d/1iqBhrXT6leWe1DawLoyPiYmI8Z5cbqL8/preview"
                            width="100%"
                            height="600"
                            frameborder="0"></iframe>
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='Mechanical' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">3. Enclosure & Moving Parts</h2>
                        <h3 className="text-xl font-semibold mb-6">3.1. Enclosure</h3>
                        <div className="text-xl text-white leading-relaxed">
                            The enclosure consists of 6 3D-printed panels with holes to mount the electronics and motors and for cable management. These panels are
                            connected using several 3D-printed L-shaped connectors and standard M4 nuts and bolts that allow for easy assembly and disassembly. This 
                            design also allows individual panels to be reprinted or replaced if damaged. The following interactive graphic has the top panel removed 
                            to show the interior:
                            <PlyViewer url='/car/shell.PLY'fov={14}/> <br/>
                            The completed interior looks rather messy with lots of cable, good routing is essential to prevent potential short circuit which might cause
                            severe damage to the electronics:
                            <Figure src="/car/inner.jpg" alt="setup" caption="Figure 3.1. Robot's interior"/> <br/>
                            
                            And this is the upper section of the robot, with brackets for 2 LCDs, the scissor lift and camera pan and tilt mechanism:
                            <PlyViewer url='/car/top.PLY'fov={18}/> <br/>
                        </div>
                        <h3 className="text-xl font-semibold mb-6">3.2. Moving Parts</h3>
                        <div className="text-xl text-white leading-relaxed">
                            Besides 4 wheels, the moving parts on the robot are the scissor lift and camera platform. The lift is driven by a low-power 
                            stepper and a string that is attached to the lift's lower axle, while the camera system consists of 2 small servos for panning and tilting. 
                            In the current design of the platform, with the lack of bearings and overall poor structural stiffness, the camera's motion is jerky
                            and has a lot of unwanted vibrations.  
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='ECU' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">4. Electronic Control Unit</h2>
                        <div className="text-xl text-white leading-relaxed">
                            To maintain the small size and reducing the number of wires used, many microcontrollers and drivers are combined into a single PCB - the Electronic Control Unit (ECU).
                            Before this change, cable management was a nightmare, and the router would not fit inside the robot!
                            <Figure src="/car/messy.jpg" alt="setup" caption="Figure 4.1. Cable management before PCB"/> <br/>
                            The ECU features 2 ESP32 chips for sensors management and communication with the control station. It also has an ATMega328P to drive 4 DC motors
                            and the scissor lift stepper. Furthermore, the board will distribute sufficient power to all electronics on GSV, including a power step-up to 9V for the 
                            TP-Link router. Designs are done using EasyEDA, a simple-to-use tool that runs on the browser with footprints for a wide range of components.
                            Here's the ECU's schematic (you can use scroll wheel to zoom, left click to pan): <br/> <br/>
                            <ZoomableFigure src="/car/schematic.png" alt="setup" caption="Figure 4.2. ECU's Full Schematic"/> <br/>
                            After the PCB layout is finished, the gerber files are sent to JLCPCB for manufacturing (assembly included, as soldering SMD components is too challenging for me!).
                            The finished PCBs are delivered after only a week, costing a total of $250 for 2. 
                            <Figure src="/car/pcb.jpg" alt="setup" caption="Figure 4.3. The ECU, also my first PCB project" width='w-180'/> <br/>
                            However, I soon realised a fatal mistake I made during design. I have unknowingly swapped the MISO and MOSI lines between the ESP32 and its 
                            flash memory module, which prohibited us from flashing firmware to the chip! Lucky for me, the Esptool allows us to burn eFuses to change the SPI flash pin
                            configuration. By running:
                            <CodeBlock code="python3 -m espefuse --port <your-port> burn_efuse SPI_PAD_CONFIG_D 8 SPI_PAD_CONFIG_Q 7" language='bash'/>
                            we assign MOSI to pin 8 and MISO to pin 7 (they used to be in the reversed order), swapping back the connections. My appreciation to the ESP32
                            developer team for saving me $250 on new PCBs. You can check out this ECU design on<ExternalLink href=" https://oshwlab.com/nguyenxuankien3132004/integrated-circuit-2">OSHWLab</ExternalLink>.
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='Firmware' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">5. Firmware Design</h2>
                        <div className="text-xl text-white leading-relaxed">
                            To control all robot's functionalities, we have to program 7 different computers: 3 ESP32s, 2 ESP32 cameras, 1 ATMega328P and 1 ATtiny85, the code can be found on my<ExternalLink href="https://github.com/ladyhoai/ESP32-surveilance-car">Github repository</ExternalLink>.
                            For the MR6400 router, its current configurations provides adequate performance for communication with control, but future improvements can be done to reduce data bottleneck,
                            which sometimes happened during tests.
                        </div> <br/>
                        <h3 className="text-xl font-semibold mb-6">5.1. ESP32S on the ECU</h3>
                        <div className="text-xl text-white leading-relaxed">
                            The ESP-IDF framework is used to develop 2 ECU ESP32s, as we replied on its RTOS functions a lot to schedule tasks, and to maintain the websocket event loop with control station. 
                            You can find the very well-documented API references on espressif's<ExternalLink href="https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/index.html">website</ExternalLink>. 
                            The main purposes of these 2 chips are: 
                            <ul className="list-disc list-outside text-white leading-relaxed">
                                <li>Send audio streams to control. (Command-receiving ESP)</li>
                            </ul>
                            <div className="max-w-4xl w-full mx-auto">
                                <CodeBlock code={audioSend} language="cpp" />
                            </div>

                            <ul className="list-disc list-outside text-white leading-relaxed">
                                <li>Output audio streams to speaker.</li>
                            </ul>
                            <div className="max-w-4xl w-full mx-auto">
                                <CodeBlock code={audio2Speaker} language="cpp" />
                            </div> <br/>

                            <div className="flex justify-center">
                                <figure className="max-w-4xl mx-auto text-center">
                                    <video className="rounded-xl shadow-lg w-3/4 mx-auto" controls>
                                        <source src="/car/speakTest.mp4" type="video/mp4" />
                                        Your browser does not support MP4 unfortunately.
                                    </video>
                                    <figcaption className="mt-2 text-white text-lg italic">
                                        My 4-year-old cousin testing the speaker module.
                                    </figcaption>
                                </figure>
                            </div> <br/>

                            <ul className="list-disc list-outside text-white leading-relaxed">
                                <li>Updating LCD 1602 with new messages from control.</li>
                                <li>Driving 2 servos for camera pan & tilt.</li>
                                <li>Receiving commands for the skid-steer system and stepper.</li>
                                <li>Sending sonar sensor's readings to control.</li>
                                <li>Reading & sending GPS strings via UART from the u-Blox to control.</li>
                            </ul> <br/>
                            Side notes: Some functions are a bit long to fit on this page, please refer to GSV's repository (link above) for more details.
                        </div> <br/>

                        <h3 className="text-xl font-semibold mb-6">5.2. ATMega328P on ECU</h3>
                        <div className="text-xl text-white leading-relaxed">
                            To reduce the amount of tasks running on the ECU ESP32s, some sensor handling and motor control are performed on this chip. 
                            We used the Arduino framework, and this chip will control 4 DC motors of the skid-steer platform, read the front
                            and back sonar sensors, and listen for the motion sensor's triggering event. The NewPing library will help us to easily read 
                            from the HC-SR04s. 
                            <CodeBlock code={sonar} language='cpp'/>
                            These sensor readings will be sent to the ECU ESP32s upon I2C request.
                        </div> <br/>

                        <h3 className="text-xl font-semibold mb-6">5.3. ESP32 Cameras</h3>
                        <div className="text-xl text-white leading-relaxed">
                            There are 2 ESP32 Cameras on GSV to monitor the front and back view. The firmware between these 2 chips are similar, only the websocket 
                            ports that these chips are connected to must be different. There are 2 main tasks: frame acquiring (the <InlineCode code="void camCB(void* pvParameters)"/> function) 
                            and frame transmission to control (the <InlineCode code="void streamCB(void * pvParameters)"/> function). If transmission is successful, 
                            control should see their camera feed updating in real time.
                            <Figure src="/car/control.gif" alt="setup" caption="Figure 5.1. Camera monitoring (front & back)"/> 
                        </div> <br/>

                        <h3 className="text-xl font-semibold mb-6">5.4. ATtiny85</h3>
                        <div className="text-xl text-white leading-relaxed">
                            The only purpose of this chip is to drive the scissor lift stepper motor. The reason this task was not performed on other chips is due to
                            potential electromagnetic interference that badly affects the microphone's signal integrity. Here's the microphone data when I tried to 
                            control the stepper with ECU ESP32s:
                            <div className="flex justify-center">
                                <audio controls>
                                    <source src="/car/mic.m4a" type="audio/mp4" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div> <br/>
                            Off-loading the stepper task to another chip solved this inconvenient issue. The program is simple:
                            <CodeBlock code={stepper} language='cpp'/>
                            This chip is powered from pin D2 of the ATmega328P. To stop the stepper, simply de-energise the ATtiny85 by 
                            pulling the 328P's D2 pin low.
                        </div> <br/>

                        <h3 className="text-xl font-semibold mb-6">5.5. ESP32 for ILI9341 Display</h3>
                        <div className="text-xl text-white leading-relaxed">
                            Due to the heavy computational load of graphic operation, a separate ESP32 is used to control the ILI9341. This
                            display's tasks are to show the booting up graphics, the web server's IP address, internet status and the controller's 
                            own camera feed, etc ... 
                            <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-6">
                                <figure className="flex flex-col items-center md:w-1/2">
                                    <img src="/car/ili1.jpg" alt="Localisation" className="w-full rounded shadow-md"/>
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 5.2: Camera feed from my laptop's webcam 
                                    </figcaption>
                                </figure>
                                <figure className="flex flex-col items-center transform mx-auto">
                                    <img src="/car/ili2.jpg" alt="Localisation Workflow" className="h-78 w-auto shadow-md"/>  
                                    <figcaption className="mt-2 text-white text-lg text-center italic">
                                        Figure 5.3: General graphics (Apologise for the glare) 
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='Web' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">6. Web Control Interface</h2>
                        <h3 className="text-xl font-semibold mb-6">6.1. The Page</h3>
                        <div className="text-xl text-white leading-relaxed">
                            For everyone to be able to access the robot without requiring extensive setup, a web page and server is the most convenient way due to various useful
                            Javascript libraries that work across different browsers. To control, simply type the server's ip on the search bar and that's it, no app, no custom hardwares.
                            View the code for this section on<ExternalLink href="https://github.com/ladyhoai/Server">Github</ExternalLink>.
                            <Figure src="/car/connect.gif" alt="setup" caption="Figure 6.1. Connecting to the control server"/> <br/>
                            Using this page, the user can move the robot using 'w' (straight), 'wa' (turn right), 's' (backward), 'wd' (turn left) on the keyboard.
                            For camera pan and tilt, 'cw' (tilt up), 'cs' (tilt down), 'ca' (pan left), 'cd' (pan right). Key 'i' and 'o' will move the camera platform up and down.
                            The user is also able to turn on/off the microphone and speaker. Furthermore, all sensor data will be visualised on the page.
                            <Figure src="/car/page.png" alt="setup" caption="Figure 6.2. Control Panel" width='w-180'/> <br/>
                        </div>
                        <h3 className="text-xl font-semibold mb-6">6.2. The Server</h3>
                        <div className="text-xl text-white leading-relaxed">
                            Node.js is used to create the server, whose purpose is to serve the index.html file to the user when they connect. It also establishes and maintains 
                            the websocket connections for all connected clients. As an example, the callback below will listen to the camera feed of the back camera, and stream 
                            the feed to all users (excluding the sender) currently on the webpage:
                            <CodeBlock code={camServer} language='javascript'/>
                            To host the server, you can either run it locally on your machine (just make sure you have good internet speed) or use Google Cloud's compute engine 
                            to create a VM instance. 
                        </div>
                    </div>
                </section>
                <div className="my-18" />

                <section id='Discussion' className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center gap-12" style={{ paddingTop: '80px', marginTop: '-80px' }}>
                    <div className="text-left">
                        <h2 className="text-4xl font-semibold mb-6">7. Discussion & Potential Improvements</h2>
                        <div className="text-xl text-white leading-relaxed">
                            The GSV was my first robotic project, also my first time designing a PCB and programming ESP32. Needless to say, this experience has built the 
                            important knowledge foundation for a lot of more complicated projects in the future. The testing period was also fun as well! Here's an  
                            <ExternalLink href={interview}>interview</ExternalLink> I got with Fatma - UTS director of project teams, on a random Thursday night during one test.
                            <br/> <br/>
                            If I revisit the project, the first change would be to improve the structural integrity of the camera platform. The vibration that the current design 
                            creates during robot's acceleration will lag the camera (you can see the effect in Figure 5.1 above), which inconveniently takes more than 3 seconds to stabilise.
                            Sometimes, the camera board even reset  
                            <br/> <br/>
                            Second, the wheel alignment makes driving straight a rarity, so fixing the chassis is also neccessary. Finally, every time the IP address of the control server changes, I have to reflash 
                            all 3 ESP32s with the new server IP. For this, a simple GUI program on the ILI9341 that allows us to type in the new IP would be less time-consuming.  
                        </div> <br/>
                    </div>
                </section>
                <footer>
                    <img 
                    src="/car/footer.jpg" 
                    alt="Footer Image" 
                    className="w-full max-h-[450px] object-cover"
                    />
                </footer>
            </div>
        </div>
    );
}