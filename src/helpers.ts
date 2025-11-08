import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Gets all input file paths for a given level (including example files)
 * @param level - The level number (e.g., 1 for level1)
 * @returns Array of full file paths for all input files of the given level
 */
export function getInputFiles(level: number): string[] {
  const dataDir = join(__dirname, '..', 'data');
  const files = readdirSync(dataDir);
  
  // Filter files matching pattern: level{N}_{X}.in or level{N}_example.in
  const pattern = new RegExp(`^level${level}_(\\d+|example)\\.in$`);
  const inputFiles = files
    .filter(file => pattern.test(file))
    .sort() // Sort to ensure consistent order (example will come before numbered files)
    .map(file => join(dataDir, file));
  
  return inputFiles;
}

/**
 * Reads a file and returns its lines as a string array
 * @param filePath - The full path to the file to read
 * @returns Array of strings, one per line
 */
export function readLines(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf-8');
  // Split by newline and filter out empty lines at the end if file ends with newline
  return content.split('\n').filter((line, index, arr) => {
    // Keep all lines except the last one if it's empty (trailing newline)
    return index < arr.length - 1 || line.length > 0;
  });
}

/**
 * Writes an array of strings to a file, one string per line
 * @param filePath - The full path to the file to write
 * @param lines - Array of strings to write
 */
export function writeLines(filePath: string, lines: string[]): void {
  const content = lines.join('\n') + '\n';
  writeFileSync(filePath, content, 'utf-8');
}

/**
 * Takes a string with space-separated numbers and returns an array of numbers
 * @param str - The string to parse
 * @returns Array of numbers
 */
export function parseNumbers(str: string): number[] {
  return str.split(' ').map(Number);
}

/**
 * Process a single input file for level 1
 * @param inputPath - Path to the input file
 */
function processFile(inputPath: string, lineProcessCallback: LineProcessCallback): void {
  const lines = readLines(inputPath);
  const resultLines = lineProcessCallback(lines);
  
  // Generate output file path
  const fileName = basename(inputPath).replace('.in', '.out');
  const outputPath = join(__dirname, '..', 'out_data', fileName);
  
  writeLines(outputPath, resultLines);
  console.log(`Processed ${basename(inputPath)} -> ${fileName}`);
}

export type LineProcessCallback = (lines: string[]) => string[];

export function solveLevel(level: number, lineProcessCallback: LineProcessCallback): void {
  const inputFiles = getInputFiles(1);
  for (const inputFile of inputFiles) {
    processFile(inputFile, lineProcessCallback);
  }
}
