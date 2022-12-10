const directions = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[-1,1],[1,-1]]

export function gameOfLife(grid: number[][]) {
    const n = grid.length, m = grid[0].length;

    for (let i = 0; i<n; i++) {
        for (let j = 0; j<m; j++) {
            const liveNeighbors = countLiveNeighbors(i, j);

            if (grid[i][j]) {
                if (liveNeighbors < 2 || liveNeighbors > 3) grid[i][j] = 1;
                else grid[i][j] = 3;

            } else {
                if (liveNeighbors === 3) grid[i][j] = 2;
            }
        }
    }
    
    function countLiveNeighbors(i: number, j: number): number {
        let cnt = 0;
        directions.forEach(([x, y])=> {
            let newRow = Math.min(n-1, i+x);
            newRow = Math.max(0, newRow);

            let newCol = Math.min(m-1, y+j);
            newCol = Math.max(0, newCol);
            if (grid[newRow][newCol] === 1 || grid[newRow][newCol]===3) cnt++;
        });
        return cnt;
    }

    for (let i = 0; i<n; i++) {
        for (let j = 0; j<m; j++) {
            if (grid[i][j] === 2 || grid[i][j] === 3) grid[i][j] = 1;
            else grid[i][j] = 0;
        }
    }
    return grid;
}
