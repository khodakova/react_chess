import { Colors } from "../Colors";
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = 'Базовая фигура',
    KING = 'Король',
    QUEEN = 'Ферзь',
    KNIGHT = 'Конь',
    PAWN = 'Пешка',
    ROOK = 'Ладья',
    BISHOP = 'Слон',
}

export class Figure {
    color: Colors;
    logo: string | null;
    cell: Cell;
    name: FigureNames;
    id: number;
    
    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }
    
    /**
     * Может ли фигура двигаться на указанную ячейку
     * @param target
     */
    canMove(target: Cell): boolean {
        return true;
    }
    
    /**
     * Передвижение фигуры на указанную ячейку
     * @param target
     */
    moveFigure(target: Cell) {
    
    }
}
