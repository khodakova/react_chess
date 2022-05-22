import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
    const [ board, setBoard ] = useState(new Board());
    const [ whitePlayer, setWhitePlayer ] = useState(new Player(Colors.WHITE));
    const [ blackPlayer, setBlackPlayer ] = useState(new Player(Colors.BLACK));
    const [ currentPlayer, setCurrentPlayer ] = useState<Player | null>(null);
    const [ winner, setWinner ] = useState<null | Player>(null);
    
    useEffect(() => {
        if ( winner ) {
            alert(`Победили ${ winner?.color === Colors.WHITE ? 'белые' : 'черные' }!`)
        }
    }, [ winner ]);
    
    const hasMoreLostFigures = () => {
        const lostBlack = board.lostBlackFigures.length;
        const lostWhite = board.lostWhiteFigures.length;
        const isEqual = lostBlack === lostWhite;
        const moreFigures = lostBlack > lostWhite ? Colors.WHITE : Colors.BLACK;
        return isEqual ? 'Ничья' : moreFigures;
    };
    
    const gameOver = (color: string) => {
        const moreFigures = hasMoreLostFigures();
        if (moreFigures !== Colors.BLACK && moreFigures !== Colors.WHITE) {
            setWinner(null);
            alert('Ничья!')
        } else {
            moreFigures === Colors.BLACK
                ? setWinner(blackPlayer)
                : setWinner(whitePlayer)
        }
    };
    
    const restart = () => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    };
    
    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer)
    }, []);
    
    const swapPlayer = () => {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    };
    
    return (
        <div className="app">
            <Timer currentPlayer={ currentPlayer } restart={ restart } gameOver={ gameOver }/>
            <div>
                <h2 className='title'>
                    Кто ходит: { currentPlayer?.color === Colors.WHITE ? 'белые' : 'черные' }
                </h2>
                <BoardComponent
                    board={ board }
                    setBoard={ setBoard }
                    currentPlayer={ currentPlayer }
                    swapPlayer={ swapPlayer }
                />
            </div>
            <div>
                <LostFigures
                    title={ 'Черные фигуры' }
                    figures={ board.lostBlackFigures }
                />
                <LostFigures
                    title={ 'Белые фигуры' }
                    figures={ board.lostWhiteFigures }
                />
            </div>
        </div>
    );
}

export default App;
