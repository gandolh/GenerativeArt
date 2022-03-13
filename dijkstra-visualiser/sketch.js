let dots = [],
  muchii = [],
  costuri = [],
  graph = [];
let font;
let pi = -100,
  datDeValori = 0,
  strtemp = '',
  Icost;
let djikstraOn = 0,
  djikstraVisualOn = 0,
  djButonStartAlgoritm,
  djikstraOk = 1,
  djButonStartSolutie,
  djikstraSolutieOn = 0,
  djCount = 0,
  nuEsteFinal = 1,
  djNodInitial = -1,
  djNodFinal = -1,
  djDistance;

function preload() {
  font = loadFont('Roboto-Regular.ttf');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  djButonStartAlgoritm = new buton(width / 2 - width / 8, height / 36, width / 4, height / 18, 'Visualizeaza algoritmul ');
  djButonStartSolutie = new buton(width / 2 + width / 8, height / 36, width / 4, height / 18, 'Afiseaza solutia');
  background(0);
  initMatAd();
  textSize(16);
}

function draw() {
  background(0);
  djButonStartAlgoritm.show();
  djButonStartSolutie.show();
  adaugareMuchie();
  noStroke();
  adaugareCost();
  adaugareNoduri();
  //if(keyIsPressed)  console.log(dist);
  if (djikstraOn) {
    if (djikstraVisualOn) {
      if (djNodInitial != -1 && djNodFinal != -1) {
        frameRate(3);
        if (djikstraOk) {
          djInit();
          adaugareValoriGraph();
          djikstraOk = 0;
          djCount = 0;
        }
        if (nuEsteFinal) {
          if (djCount < dots.length) djikstraGoVisual();
          else if (djcount == dots.length) {
            dots[djant].changeStatusToPassed();
          }
          if (djant == djNodFinal) {
            nuEsteFinal = 0;

          }
        } else {
          djDistance = new Distance(width / 2 - width / 6, height - height / 25, width / 3, height / 25, distan[djNodFinal]);
          djDistance.show();
        }
        dots[djNodInitial].changeStatusToStart();
        dots[djNodFinal].changeStatusToEnd();
      }

    } else if (djikstraSolutieOn) { // daca nu e visualOn dar djikstra e on afiseaza solutia

      if (djNodInitial != -1 && djNodFinal != -1) {
        frameRate(15);
        if (djikstraOk) {
          djsol = [];
          parent = [];
          djInit();
          adaugareValoriGraph();
          djikstraOk = 0;
          djsol[0] = 0;
        }
        if (nuEsteFinal) {
          djikstraGoSol();
        }
        //if (keyIsPressed) console.log(distan[djNodFinal]); 

        djDistance = new Distance(width / 2 - width / 6, height - height / 25, width / 3, height / 25, distan[djNodFinal]);
        djDistance.show();
      }
    }
  }
}