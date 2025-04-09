import React, { createContext, useRef, useContext, useEffect, useState } from 'react';


export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const ws = useRef(null);

    useEffect(() => {

        // let port = window.location.port;
        // const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        // ws.current = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

        ws.current = new WebSocket('wss://startup.mjweb260.click');
        // ws.current = new WebSocket('ws://localhost:3000');
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
