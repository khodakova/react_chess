import React from 'react';
import { Cell } from "../models/Cell";

interface CellComponentProps {
    cell: Cell;
    selected: boolean;
    onClick: (cell: Cell) => void
}

const CellComponent: React.FC<CellComponentProps> = ({ cell, selected, onClick }) => {
    const handleClick = () => {
        onClick(cell);
    };
    
    return (
        <div
            className={ [ 'cell', cell.color, selected ? 'selected' : '' ].join(' ') }
            onClick={ handleClick }
            style={{background: cell.available && cell.figure ? 'green' : ''}}
        >
            { !cell.figure && cell.available && <div className='available'></div> }
            {
                cell.figure?.logo && <img src={ cell.figure.logo } alt={ cell.figure.name }/>
            }
        </div>
    );
};

export default CellComponent;
