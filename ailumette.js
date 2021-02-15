const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout);
let lines = 0;
let matches = 0;
let lineNumber = 0;
let tour = true;
let randomMatches = 0;
let randomLines = 0;
let nbAllumettes = 16;
const regex = /[a-zA-Z]/g;
let line1 = 1;
let line2 = 3;
let line3 = 5;
let line4 = 7;
let cadre = `**********`;

const draw = (line, linedraw) => {
  for(let i=0;i<Math.round((8-line)/2);i++){
    linedraw += " ";
  }
  for(let i=0;i<line;i++){
    linedraw += "|";
  }
  for(let i=0;i<Math.floor((8-line)/2);i++){
    linedraw += " ";
  }
  return linedraw += "*";
}


rl.on("line", line => {
  if (nbAllumettes <= 0 && tour === false) {
    console.log("You lost, too bad..");
    process.exit();
  } else if (nbAllumettes <= 0 && tour === true) {
    console.log("I lost.. snif.. but I’ll get you next time!!");
    process.exit();
  }
  if (tour === true) { // au joueur de jouer
    if (lineNumber === 0) {  //partie on choisis la ligne
      if (line <= 0 || line > 4) {
        console.log("Error: this line is out of range");
      } else if (regex.test(line)) {
        console.log("Error: invalid input at this line");
      } else if (line > 0 && line < 5) {
        console.log("Your turn: ");
        console.log("Line:", line);
        lines = line;
        lineNumber++;
      }
    } else {
      if (line > (lines * 2) - 1 || regex.test(line)) {     //on choisi cb d'alumetets enlever
        console.log("Error: invalid input at this line");
      } else if (line === "0") {
        console.log("Error: you have to remove at least one match");
      } else if (line < 0) {
        console.log("Error: this matches is out of range");
      } else {
        if (lines === "1") {
          line1 -= line;
        } else if (lines === "2") {
          line2 -= line;
        } else if (lines === "3") {
          line3 -= line;
        } else if (lines === "4") {
          line4 -= line;
        }
        console.log("Matches:", line);
        nbAllumettes -= line;
        matches = line;
        tour = false;
        console.log(`Player removed ${matches} match(es) from line ${lines}`);
        console.log(cadre);
        console.log(draw(line1,'*'));
        console.log(draw(line2,'*'));
        console.log(draw(line3,'*'));
        console.log(draw(line4,'*'));
        console.log(cadre);
      }
    }
  } else if (tour === false) {  //au bot de jouer
    console.log("AI’s turn...");
    randomLines = Math.floor(Math.random() * 4) + 1;  // le bot choisi random la ligne
    if (randomLines === 1) {      
      if (line1 === 0) {
        tour=false;
        console.log(`Error: AI removed ${randomMatches} match(es) from line ${randomLines}`);
        return
      } else {
      randomMatches = Math.floor(Math.random() * line1) + 1;     //le bot choisi random un nombre d'alumette a enlever si il y en a encore
      line1 -= randomMatches;
      }
    } else if (randomLines === 2) {
      if (line2 === 0) {
        tour=false;
        console.log(`Error: AI removed ${randomMatches} match(es) from line ${randomLines}`);
        return
      } else {
      randomMatches = Math.floor(Math.random() * line2) + 1;
      line2 -= randomMatches;
      }
    } else if (randomLines === 3) {
      if (line3 === 0) {
        tour=false;
        console.log(`Error: AI removed ${randomMatches} match(es) from line ${randomLines}`);
        return
      } else {
      randomMatches = Math.floor(Math.random() * line3) + 1;
      line3 -= randomMatches;
      }
    } else if (randomLines === 4) {
      if (line4 === 0) {
        tour=false;
        console.log(`Error: AI removed ${randomMatches} match(es) from line ${randomLines}`);
        return
      } else {
      randomMatches = Math.floor(Math.random() * line4) + 1;
      line4 -= randomMatches;
      }
    }
    console.log(`AI removed ${randomMatches} match(es) from line ${randomLines}`);
    console.log(cadre);
    console.log(draw(line1,'*'));
    console.log(draw(line2,'*'));
    console.log(draw(line3,'*'));
    console.log(draw(line4,'*'));
    console.log(cadre);
    nbAllumettes -= randomMatches;
    tour = true;
    lineNumber = 0;
}
})
