import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;
    
    constructor(x: number, y: number, color: Colors, figure: Figure | null, board: Board) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }
    
    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }
    
    moveFigure(target: Cell) {
        if (this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            
            // перемещаем фигуру на новую клетку
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
    
    isEmpty(): boolean {
        return this.figure === null;
    }
    
    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }
        
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        
        // если клетка не пустая, возвращаем ложь
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }
        
        return true;
    }
    
    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }
    
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
    
        // если клетка не пустая, возвращаем ложь
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }
    
        return true;
    }
    
    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        // не диагональ
        if (absX !== absY)
            return false;
        
        // получаем направление, по которой хочет двигаться фигура
        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;
        
        // начинаем цикл с единицы, потому что ячейку мы не проверяем
        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy   * i).isEmpty())
                return false;
        }
        
        return true;
    }
}
