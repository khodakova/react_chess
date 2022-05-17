import React, { useEffect, useState } from 'react';
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";

interface BoardComponentProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({ board, setBoard }) => {
    const [ selectedCell, setSelectedCell ] = useState<Cell | null>(null);
    
    const onClick = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
        } else {
            setSelectedCell(cell)
        }
    };
    
    // на каждое изменение выбранной ячейки перерисовываем доску
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);
    
    /**
     * На какие ячейки может перемещаться фигура
     */
    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    };
    
    /**
     * Перерисовка доски в соответствии с новыми данными
     */
    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard)
    };
    
    return (
        <div className='board'>
            {
                board.cells.map((row, idx) =>
                    <React.Fragment key={ idx }>
                        { row.map(cell =>
                            <CellComponent
                                key={ cell.id }
                                cell={ cell }
                                onClick={ onClick }
                                selected={ selectedCell?.x === cell.x && selectedCell?.y === cell.y }
                            />
                        ) }
                    </React.Fragment>
                )
            }
        </div>
    );
};

export default BoardComponent;
