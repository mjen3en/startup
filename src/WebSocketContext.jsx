import React, { createContext, useRef, useContext, useEffect, useState } from 'react';
import { JoinGame } from './joingame/joingame';
import { CreateGame } from './creategame/creategame';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:3000');
        ws.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.current.close();
            
        };
    
    }, []);


    return (
        <WebSocketContext.Provider value={ws.current}>
            {children}
        </WebSocketContext.Provider>
    );
}
