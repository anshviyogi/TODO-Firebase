import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer, { initialState } from './component/reducer';
import { StateProvider } from './component/StateProvider';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndProvider } from 'react-dnd';
import { ChakraProvider } from '@chakra-ui/react';
import {HTML5Backend} from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DndProvider backend={HTML5Backend}>
    <ChakraProvider>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
    </ChakraProvider>
    </DndProvider>
);
