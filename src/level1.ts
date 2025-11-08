import { parseNumbers, solveLevel } from './helpers.js';

function calculateFinalHeight(velocities: number[]): number {
  let height = 0;
  for (const velocity of velocities) {
    height += velocity;
  }
  return height;
}

solveLevel(1, (lines: string[]) => {
    const numFlights = parseInt(lines[0]!);
    const results: string[] = [];
    
    for (let i = 1; i <= numFlights; i++) {
        const velocities = parseNumbers(lines[i]!);
        const finalHeight = calculateFinalHeight(velocities);
        results.push(finalHeight.toString());
    }

    return results;
  
});

console.log('Level 1 completed!');