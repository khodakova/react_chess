import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import whiteLogo from "../../assets/white-pawn.png";
import blackLogo from "../../assets/black-pawn.png";

export class Pawn extends Figure {
    
    isFirstStep: boolean = true;
    
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN;
    }
    
    canMove(target: Cell): boolean {
        if ( !super.canMove(target) ) {
            return false;
        }
        // задаем направление, по которому должна двигаться пешка
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        // пешки назад ходить не могут, бьют только по диагонали
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;
        
        // провяряем, что мы на одной горизонтальной полосе, т.к. пешка прыгать вправо и влево не умеет
        // проверяем смещение по y на единицу или на двойку при первом шаге
        // проверяем ячейку, на которую хотим перейти, на пустоту
        if ( (
                target.y === this.cell.y + direction
                || this.isFirstStep && (target.y === this.cell.y + firstStepDirection)
            )
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty() ) {
            return true
        }
        
        // проверка условия для атаки по диагонали
        // проверяем что мы двигаемся по направлению на одну ячейку либо вверх, либо вниз
        // смещаемся по x по диагонали на одну ячейку
        // проверка на врага
        if (
            target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)
        ) {
            return true
        }
        
        return false;
    }
    
    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}
