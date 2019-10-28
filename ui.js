let button1, nextButton, button3, saveButton;
let colH1, colH2, colH3;


function writeTextUI() {
  textSize(longEdge / 50);
  fill(0);
  noStroke

  //make these obsolete
  colH2 = color(130, 0, 20);
  colH3 = color(240, 0, 50);
  colH1 = color(355, 0, 20);

  nextButton = createButton('Next');
  nextButton.style('font-size', '2.6vmax');
  nextButton.style('height', '4.5vmax');
  nextButton.position(width - (15 * vMax), height - (6.5 * vMax));
  nextButton.class("select");
  nextButton.mousePressed(nextGrid);

  saveButton = createButton('Save');
  saveButton.style('font-size', '2.6vmax');
  saveButton.style('height', '4.5vmax');
  saveButton.position(width - (15 * vMax), height - (12.5 * vMax));
  saveButton.class("select");
  saveButton.mousePressed(saveImage);
}

function writeRestartUI() {


  textSize(longEdge / 50);
  fill(0);
  noStroke();

  nextButton.remove();
  nextButton = createButton('Restart');
  nextButton.style('font-size', '2.6vmax');
  nextButton.style('height', '4.5vmax');
  nextButton.position(width - (15 * vMax), height - (6.5 * vMax));
  nextButton.class("select");
  nextButton.style('background-color', 'indianred');
  nextButton.mousePressed(restart);
}


function restart() {
  stage = 0;
  dimensionCalc();
  writeTextUI();
  nextGrid();

}

function saveImage() {
  save('dotscape' + month() + day() + hour() + second() + '.jpg');
}


function colToggleUI() {
  textSize(longEdge / 50);
  fill(0);
  noStroke();


  button1 = createButton('White');
  button1.position((vMax * 3), windowHeight - vMax * 5);
  colH1 = color(355, 70, 80);
  button1.style('background-color', colH1);
  button1.style('font-size', '2.5vmax');
  button1.style('color', 'white');
  button1.style('border-radius', '0.5vmax')
  button1.style('width', '20vmax')
  button1.mousePressed(toggleColour);
}

function toggleColour() {
  colSwitch = !colSwitch;
  changeColour(colSwitch);

}

function changeColour(tmp) {

  if (tmp) {
    colSat = 80;
    colBri = 100;

    if (stage >= 7) {
      button1.html("Colour")
    }

  } else {
    colSat = 0;
    colBri = 85;
    if (stage >= 7) {
      button1.html("White")
    }
  }

}
