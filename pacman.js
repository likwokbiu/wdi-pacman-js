// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// setup four ghosts as objects
ghosts = [];
ghosts.push(inky);
ghosts.push(blinky);
ghosts.push(pinky);
ghosts.push(clyde);

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\n\nPower-Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  var desc;
  for (var i = 0; i < ghosts.length; i++) {
    console.log('(' + (i+1) + ') Eat ' + ghosts[i].name + ' (' + (ghosts[i].edible ? 'edible' : 'inedible') + ')');
  };
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(key) {
  if (ghosts[key - 1].edible === false ) {
    console.log('\nYou are killed by the ' + ghosts[key - 1].name + ' in ' +  ghosts[key - 1].colour +  ' colour!');
    lives -= 1;
  }
  else {
    console.log('\nYou just ate the ' + ghosts[key - 1].name + ' in ' +  ghosts[key - 1].colour +  ' colour!');
    score += 200;
    ghosts[key - 1].edible = false;
  }
  if (lives < 0) {
    process.exit();
  }
}

function eatPowerPellet() {
  if (powerPellets === 0) {
    console.log('\nNo Power-Pellets left!');
    return;
  };

  score += 50;
  powerPellets -= 1;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  };
  if (powerPellets === 0) {
    console.log('\nNo Power-Pellets left!');
  };
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
    case '2':
    case '3':
    case '4':
      eatGhost(key);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
