import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from "../../assets/white-king.png";
import blackLogo from "../../assets/black-king.png";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;
    }
    
    canMove(target: Cell): boolean {
        if ( !super.canMove(target) ) {
            return false;
        }
        
        // смещения
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        
        // король может двигаться в любую сторону, но только на одну клетку
        if (this.cell.isEmptyVertical(target) && dy === 1)
            return true;
        if (this.cell.isEmptyHorizontal(target) && dx === 1)
            return true;
        if (this.cell.isEmptyDiagonal(target) && dx === 1)
            return true;
        
        return false;
    }
}
