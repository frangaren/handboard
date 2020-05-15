import React from 'react';

import { Board } from './components/Board';
import { WebcamProvider } from './components/webcam/WebcamProvider';
import { RequireWebcam } from './components/webcam/RequireWebcam';
import { GamepadsProvider } from './components/gamepads/GamepadsProvider';
import { RequireGamepad } from './components/gamepads/RequireGamepad';

function App() {
    return (
        <WebcamProvider video>
            <RequireWebcam>
                <GamepadsProvider>
                    <RequireGamepad>

                    </RequireGamepad>
                </GamepadsProvider>
            </RequireWebcam>
        </WebcamProvider>
    );
}

export default App;
