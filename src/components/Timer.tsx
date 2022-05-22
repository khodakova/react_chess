import React, { useEffect, useRef, useState } from 'react';
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    gameOver: (arg: string) => void;
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart, gameOver }) => {
    const [ blackTime, setBlackTime ] = useState(50);
    const [ whiteTime, setWhiteTime ] = useState(50);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    
    useEffect(() => {
        startTimer();
    }, [currentPlayer]);
    
    useEffect(() => {
        if (whiteTime === 0) {
            gameOver(Colors.WHITE);
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    
        if (blackTime === 0) {
            gameOver(Colors.BLACK);
            if (timer.current) {
                clearInterval(timer.current)
            }
        }
    }, [whiteTime, blackTime]);
    
    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    };
    
    const decrementBlackTimer = () => {
        setBlackTime(prev => prev - 1);
    };
    
    const decrementWhiteTimer = () => {
        setWhiteTime(prev => prev - 1);
    };
    
    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        startTimer();
        restart();
    };
    
    return (
        <div className='timer'>
            <div>
                <button onClick={ handleRestart } className='restart-btn'>
                    Новая игра
                </button>
            </div>
            <h2>Черные - { blackTime }</h2>
            <h2>Белые - { whiteTime }</h2>
        </div>
    );
};

export default Timer;
