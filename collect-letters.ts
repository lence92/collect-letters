enum TaskError {
  generic,
  invalidStartPath,
  multipleDirectionsFound,
  brokenPath,
}

let startSign = "@";
let endSign = "x";
let locationChangeSign = "+";
let validPathCharacters = ["-", "|", "+"];
let validLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const input: string[][] = [
  [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+", " ", " "],
  [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|", " ", " "],
  [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
  ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
  [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
  [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
];

let pathOutput: string[] = [];
let charactersOutput: string[] = [];

let verticalDirection: number = 0;
let horizontalDirection: number = 0;
let directionFollowSign: string = "";
let previousLocation: [number, number] = [-1, -1];

let charactersOutputLocation: [number, number][] = [];

try {
  let startLocation = getAndValidateStartLocation(startSign);
  var currentLocation = startLocation;
  var currentCharacter = startSign;
  updateDirection(currentLocation);
  pathOutput.push(startSign);

  while (currentCharacter != endSign) {
    previousLocation = currentLocation;
    currentLocation = [
      currentLocation[0] + verticalDirection,
      currentLocation[1] + horizontalDirection,
    ];
    currentCharacter = input[currentLocation[0]][currentLocation[1]];

    if (currentCharacter == endSign) {
      pathOutput.push(endSign);
      console.log(charactersOutput);
      console.log(pathOutput);
    } else if (currentCharacter == locationChangeSign) {
      pathOutput.push(currentCharacter);
      updateDirection(currentLocation);
    } else if (currentCharacter == directionFollowSign) {
      pathOutput.push(currentCharacter);
      continue;
    } else if (validLetters.includes(currentCharacter)) {
      pathOutput.push(currentCharacter);
      if (
        !charactersOutputLocation.some(
          (location) =>
            location[0] === currentLocation[0] &&
            location[1] === currentLocation[1]
        )
      ) {
        charactersOutput.push(currentCharacter);
        charactersOutputLocation.push(currentLocation);
      }
    } else {
      throw TaskError.brokenPath;
    }
  }
} catch {
  console.log(charactersOutput);
  console.log(pathOutput);
  console.log("Error");
}

function updateDirection(from: [number, number]) {
  let up: [number, number] = [from[0] - 1, from[1]];
  let down: [number, number] = [from[0] + 1, from[1]];
  let left: [number, number] = [from[0], from[1] - 1];
  let right: [number, number] = [from[0], from[1] + 1];

  var updated = false;

  if (isValid(up)) {
    let value = input[up[0]][up[1]];

    if (validPathCharacters.includes(value)) {
      updated = true;

      verticalDirection = -1;
      horizontalDirection = 0;
      directionFollowSign = value;
    } else if (validLetters.includes(value)) {
      updated = true;

      verticalDirection = -1;
      horizontalDirection = 0;
      directionFollowSign = "|";
    }
  }

  if (isValid(down)) {
    let value = input[down[0]][down[1]];

    if (validPathCharacters.includes(value)) {
      if (updated) {
        throw TaskError.multipleDirectionsFound;
      }
      updated = true;

      verticalDirection = 1;
      horizontalDirection = 0;
      directionFollowSign = value;
    } else if (validLetters.includes(value)) {
      updated = true;

      verticalDirection = 1;
      horizontalDirection = 0;
      directionFollowSign = "|";
    }
  }

  if (isValid(left)) {
    let value = input[left[0]][left[1]];

    if (validPathCharacters.includes(value)) {
      if (updated) {
        throw TaskError.multipleDirectionsFound;
      }
      updated = true;

      verticalDirection = 0;
      horizontalDirection = -1;
      directionFollowSign = value;
    } else if (validLetters.includes(value)) {
      updated = true;

      verticalDirection = 0;
      horizontalDirection = -1;
      directionFollowSign = "-";
    }
  }

  if (isValid(right)) {
    let value = input[right[0]][right[1]];

    if (validPathCharacters.includes(value)) {
      if (updated) {
        throw TaskError.multipleDirectionsFound;
      }
      updated = true;

      verticalDirection = 0;
      horizontalDirection = 1;
      directionFollowSign = value;
    } else if (validLetters.includes(value)) {
      updated = true;

      verticalDirection = 0;
      horizontalDirection = 1;
      directionFollowSign = "-";
    }
  }

  if (updated == false) {
    throw TaskError.brokenPath;
  }
}

function getAndValidateStartLocation(sign: string): [number, number] {
  /// Get all locations where we have a start sign
  let locations: [number, number][] = getLocations(sign);

  /// Validate we have only one start path
  if (locations.length != 1) {
    throw TaskError.invalidStartPath;
  }

  /// Get and provide the  location
  let location: [number, number];

  if (locations[0]) {
    location = locations[0];
  } else {
    throw TaskError.invalidStartPath;
  }

  return location;
}

function getLocations(sign: string): [number, number][] {
  var locations: [number, number][] = [];

  for (let x in input) {
    for (let y in input[x]) {
      if (input[x][y] == sign) {
        locations.push([parseInt(x), parseInt(y)]);
      }
    }
  }

  return locations;
}

function isValid(location: [number, number]): boolean {
  return (
    location[0] >= 0 &&
    location[1] >= 0 &&
    location[0] < input.length &&
    location[1] < input[location[0]].length &&
    (location[0] != previousLocation[0] || location[1] != previousLocation[1])
  );
}
