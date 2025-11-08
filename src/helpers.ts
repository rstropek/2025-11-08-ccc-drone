import { readdirSync } from 'fs';
import { join, dirname } from 'path';
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

