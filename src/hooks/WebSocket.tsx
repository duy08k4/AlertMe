import { useState, useEffect, useCallback } from 'react';
import { socket } from '../configs/socket';

interface WebSocketHook {
    isConnected: boolean;
    lastMessage: any;
    sendMessage: (event: string, data: any) => void;
}

export const useWebSocket = (): WebSocketHook => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [lastMessage, setLastMessage] = useState<any>(null);

    useEffect(() => {
        // Function to handle connection
        const onConnect = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        // Function to handle disconnection
        const onDisconnect = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        // Function to handle incoming messages
        const onMessage = (data: any) => {
            setLastMessage(data);
        };

        // Connect if not already connected
        if (!socket.connected) {
            socket.connect();
        }

        // Register event listeners
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage); // Assuming a generic 'message' event

        // Cleanup on component unmount
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessage);
            // Optional: disconnect if this is the last component using the hook
            // socket.disconnect(); 
        };
    }, []);

    const sendMessage = useCallback((event: string, data: any) => { // Event là tên thông điệp
        if (socket.connected) {
            socket.emit(event, data);
        } else {
            console.error('Socket not connected. Cannot send message.');
        }
    }, []);

    return { isConnected, lastMessage, sendMessage };
};
