import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { delay, interval, map, tap, timer } from "rxjs";
import { gameOfLife } from "./utils";

const NUM_ROWS = 50;
const NUM_COLS = 30;

@Component({
    selector: 'app-game-of-life',
    templateUrl: './game-of-life.component.html',
    styleUrls: ['./game-of-life.component.scss']
})

export class GameOfLife implements OnInit{
    grid: number[][] = this.setGrid();
    isRandomized: boolean = false;
    isRunning: boolean =  false;
    timeOutId!: any;
    

    ngOnInit(): void {
        
    }

    reset() {
        this.grid = this.setGrid();
        this.isRandomized = false;
    }

    isGridSame(prev: number[][], curr: number[][]): boolean {
        for (let i = 0; i<NUM_ROWS; i++) {
            for (let j = 0; j<NUM_COLS; j++) {
                if (prev[i][j] !== curr[i][j]) return false;
            }
        }
        return true;
    }
    

    runSimulation(){
        const prevGrid = this.grid.slice().map(arr => arr.slice());
        this.isRunning = true;
        this.grid = gameOfLife(this.grid);
        if (this.isGridSame(prevGrid, this.grid)) return;
        this.timeOutId = setTimeout(() => {
            this.runSimulation()
        }, 100)
    }

    stopSimulation(){
        this.isRunning = false;
        clearTimeout(this.timeOutId)
        
    }

    setGrid() {
        return [...Array(NUM_ROWS)].map((row: []) => Array(NUM_COLS).fill(0));
    }

    randomize() {
        if (!this.isRandomized){
            this.isRandomized = true;
            this.grid = this.setGrid();
            for (let i = 0; i<NUM_ROWS; i++) {
                for (let j = 0; j<NUM_COLS; j++) {
                    const chance = Math.random();
                    if (chance < .5) {
                        this.grid[i][j] = 1
                    }
                }
            }
        } else {
            this.isRandomized = false;
        }
    }

    handleCellClick(r: number, c: number) {
        this.grid[r][c] = this.grid[r][c] ? 0 : 1;
    }
}