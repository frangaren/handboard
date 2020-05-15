import React from 'react';

import { Board } from './components/Board';
import { WebcamProvider } from './components/webcam/WebcamProvider';
import { RequireWebcam } from './components/webcam/RequireWebcam';
import { GamepadsProvider } from './components/gamepads/GamepadsProvider';
import { RequireGamepad } from './components/gamepads/RequireGamepad';
import { PoseNetProvider } from './components/pose/model/PoseNetProvider';
import { RequirePoseNet } from './components/pose/model/RequirePoseNet';
import { PoseProvider } from './components/pose/PoseProvider';

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
                            multiplier={0.75}
                        >
                            <RequirePoseNet>
                                <PoseProvider normalized pollingInterval={50}>
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
