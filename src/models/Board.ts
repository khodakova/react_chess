import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Queen } from "./figures/Queen";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Figure } from "./figures/Figure";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];
    
    /**
     * Инициализация доски
     */
    public initCells() {
        for ( let i = 0; i < 8; i++ ) {
            const row: Cell[] = [];
            
            // формируем строку
            for ( let j = 0; j < 8; j++ ) {
                if ( (i + j) % 2 !== 0 ) {
                    // добавляем черные ячейки
                    row.push(new Cell(j, i, Colors.BLACK, null, this))
                } else {
                    // добавляем белые ячейки
                    row.push(new Cell(j, i, Colors.WHITE, null, this))
                }
            }
            
            // добавляем строку в достку
            this.cells.push(row)
        }
    }
    
    /**
     * подсчет того, на какие ячейки может перемещаться объект
     * @param selectedCell
     */
    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            
            for (let j = 0; j < row.length; j++ ) {
                const target = row[j];
                // определяем, может ли походить фигура на ячейку
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }
    
    /**
     * для перерисовки доски
     */
    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        return newBoard;
    }
    
    /**
     * Получение ячейки
     * @param x - горизонтальная координата
     * @param y - вертикальная координата
     */
    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }
    
    /**
     * Добавление пешек
     */
    private addPawns() {
        for ( let i = 0; i < 8; i++ ) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }
    
    /**
     * Добавление королей
     */
    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0));
        new King(Colors.WHITE, this.getCell(4, 7));
    }
    
    /**
     * Добавление ферзей
     */
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
    }
    
    /**
     * Добавление коней
     */
    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }
    
    /**
     * Добавление слонов
     */
    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
    }
    
    /**
     * Добавление ладей
     */
    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
    }
    
    public addFigures() {
        this.addBishops();
        this.addKings();
        this.addKnights();
        this.addPawns();
        this.addRooks();
        this.addQueens();
    }
}
