import React from 'react';

import { Board } from './components/Board';
import { WebcamProvider } from './components/webcam/WebcamProvider';
import { RequireWebcam } from './components/webcam/RequireWebcam';
import { GamepadsProvider } from './components/gamepads/GamepadsProvider';
import { RequireGamepad } from './components/gamepads/RequireGamepad';
import { PoseNetProvider } from './components/pose/model/PoseNetProvider';
import { RequirePoseNet } from './components/pose/model/RequirePoseNet';
import { PoseProvider } from './components/pose/PoseProvider';
import { SmoothHandProvider } from './components/pose/SmoothHandProvider';
import {
    GamepadInputProvider
} from './components/gamepads/GamepadInputProvider';
import {
    GestureProvider
} from './components/interaction/GestureProvider';
import { PoseCursor } from './components/interaction/PoseCursor';
import { InteractionProvider } from './components/interaction/InteractionProvider';

function App() {
    return (
        <WebcamProvider video>
            <RequireWebcam>
                <GamepadsProvider>
                    <RequireGamepad>
                        <PoseNetProvider
                            architecture='MobileNetV1'
                            outputStride={16}
                            inputResolution={{
                                width: 320,
                                height: 240
                            }}
                            multiplier={1.0}
                            quantBytes={4}
                        >
                            <RequirePoseNet>
                                <PoseProvider normalized pollingInterval={50}>
                                    <SmoothHandProvider
                                        mincutoff={0.5}
                                        beta={10.0}
                                        ddcutoff={0.005}
                                    >
                                        <GamepadInputProvider>
                                            <GestureProvider>
                                                <InteractionProvider>
                                                    <PoseCursor/>
                                                    <Board/>
                                                </InteractionProvider>
                                            </GestureProvider>
                                        </GamepadInputProvider>
                                    </SmoothHandProvider>
                                </PoseProvider>
                            </RequirePoseNet>
                        </PoseNetProvider>
                    </RequireGamepad>
                </GamepadsProvider>
            </RequireWebcam>
        </WebcamProvider>
    );
}

export default App;
