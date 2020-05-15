import React from 'react';

import { Board } from './components/Board';
import { RequireWebcam } from './components/webcam/RequireWebcam';
import { WebcamProvider } from './components/webcam/WebcamProvider';
import { WebcamNotice } from './components/webcam/WebcamNotice';

function App() {
    return (
        <WebcamProvider video audio>
            <RequireWebcam>
                <WebcamNotice show/>
            </RequireWebcam>
        </WebcamProvider>
    );
}

export default App;
