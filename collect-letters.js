"use strict";
function findPath(map) {
    const rows = map.length;
    const cols = map[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0], // Up
    ];
    const dfs = (row, col, path) => {
        console.log("dfs", row, col);
        if (row < 0 ||
            row >= rows ||
            col < 0 ||
            col >= cols ||
            map[row][col] === " " ||
            visited[row][col]) {
            return;
        }
        visited[row][col] = true;
        path.push(map[row][col]);
        if (map[row][col].match(/[A-Z]/)) {
            collectedLetters.push(map[row][col]);
        }
        if (map[row][col] === "x") {
            console.log("map[row][col]", map[row][col]);
            return; // Stop when reaching 'x'
        }
        for (const [dx, dy] of directions) {
            dfs(row + dx, col + dy, path);
        }
    };
    const collectedLetters = [];
    const path = [];
    let startRow = null;
    let startCol = null;
    // Find the starting position
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (map[row][col] === "@") {
                startRow = row;
                startCol = col;
                break;
            }
        }
    }
    dfs(startRow, startCol, path);
    return [collectedLetters, path];
}
// Test Input
// const map: string[][] = [
//   ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
//   [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
//   ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
//   [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
//   [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
// ];
// Expected result:
// Letters ACB
// Path as characters @---A---+|C|+---+|+-B-x
// Test Input
// const map: string[][] = [
//   ["@", " ", " ", " ", " ", " ", " ", " ", " ", " "],
//   ["|", " ", "+", "-", "C", "-", "-", "+", " ", " "],
//   ["A", " ", "|", " ", " ", " ", " ", "|", " ", " "],
//   ["+", "-", "-", "-", "B", "-", "-", "+", " ", " "],
//   [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
//   [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
//   [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
// ];
// Expected result:
// Letters ABCD
// Path as characters @|A+---B--+|+--C-+|-||+---D--+|x
// Test Input
// const map: string[][] = [
//   ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
//   [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
//   ["x", "-", "B", "-", "+", " ", " ", " ", "|"],
//   [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
//   [" ", " ", " ", " ", "+", "-", "-", "-", "C"],
// ];
// Expected result:
// Letters ACB
// Path as characters @---A---+|||C---+|+-B-x
// Test Input
const map = [
    [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|", " ", " "],
    [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
    ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
    [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
    [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
];
// Expected result:
// Letters GOONIES
// Path as characters @-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x
// Test Input
// const map: string[][] = [
//   [" ", "+", "-", "L", "-", "+", " ", " "],
//   [" ", "|", " ", " ", "+", "A", "-", "+"],
//   ["@", "B", "+", " ", "+", "+", " ", "H"],
//   [" ", "+", "+", " ", " ", " ", " ", "x"],
// ];
// Expected result:
// Letters BLAH
// Path as characters @B+++B|+-L-+A+++A-+Hx
// Function call
const [collectedLetters, path] = findPath(map);
// Print the output
console.log("Collected letters:", collectedLetters.join(""));
console.log("Path:", path.join(""));