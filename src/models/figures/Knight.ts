import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from "../../assets/white-knight.png";
import blackLogo from "../../assets/black-knight.png";

export class Knight extends Figure {
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KNIGHT;
    }
    
    // логика перемещения - 1 координата всегда отличается от текущей на единицу, другая - на два
    canMove(target: Cell): boolean {
        if ( !super.canMove(target) ) {
            return false;
        }
        
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }

}
