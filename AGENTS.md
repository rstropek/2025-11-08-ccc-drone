This project is part of a coding challenge.

In folder data, you find base data that must be processed per level. Each input file is named "level1_2.in" where 1 is the level number and 2 is the exercise number inside the level. For each level, there is also a level1_example.in with a level1_example.out with the expected output. The example files can be used to test the solution.

My code is in the src folder. src/helpers.ts contains helpers for all the levels. For each level, I want to create a file e.g. level1.ts that contains the solution for the level.

We use TypeScript 5 with Node.js. Execute the code with npm start:level1. The programs must generate output files in the out_data folder (e.g. level1_1.in becomes level1_1.out). One run executes the algorithm for all input files in the data folder.
