class buton {
  constructor(x, y, w, h, str) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.str = str;
  }
  show() {
    fill('#0e153a');
    strokeWeight(2);
    stroke(51);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h + 5);
    noStroke();
    fill('#e8ffe8');
    textAlign(CENTER, CENTER);
    text(this.str, this.x + 5, this.y, this.w - 5, this.h);
    rectMode(CORNER);
    //triangle(this.x - 5, this.h / 2 - 10, this.x + 10, this.h / 2, this.x - 5, this.h / 2 + 10);
  }
  touched() {
    if (mouseX >= this.x - this.w / 2 && mouseX <= this.x + this.w / 2 && mouseY >= this.y - this.h / 2 && mouseY <= this.y + this.h / 2) return 1;
    return 0;
  }
}

// declarari
let src = 0;
let distan = [],
  sptSet = [];
let djant = -1;
let djsol = [],
  parent = [];

// sf declarari 
function djInit() {

  for (let i = 0; i < dots.length; i++) {

    sptSet[i] = false;
    distan[i] = Number.MAX_SAFE_INTEGER;
  }
  distan[src] = 0;

}


function djikstraGoVisual() {

  let u = minDistance(distan, sptSet);
  sptSet[u] = true;
  if (djant != -1) dots[djant].changeStatusToPassed();
  dots[u].changeStatusToActive();
  for (let v = 0; v < dots.length; v++) {
    if (!sptSet[v] && graph[u][v] && distan[u] != Number.MAX_SAFE_INTEGER && distan[u] + graph[u][v] < distan[v])
      distan[v] = distan[u] + graph[u][v];
  }
  //console.log(distan);
  djCount++;
  djant = u;
}

function djikstraGoSol() {
  parent[src] = -1;
  for (let count = 0; count < dots.length && nuEsteFinal; count++) {
    let u = minDistance(distan, sptSet);
    if (u != undefined) {
      sptSet[u] = true;
      for (let v = 0; v < dots.length; v++) {
        if (!sptSet[v] && graph[u][v] && distan[u] != Number.MAX_SAFE_INTEGER && distan[u] + graph[u][v] < distan[v]) {
          parent[v] = u;
          distan[v] = distan[u] + graph[u][v];
        }
      }
      // console.log(distan);
      djant = u;
    }
    if (djant == djNodFinal) {
      nuEsteFinal = 0;
    }
  }
  SavePath(parent, djNodFinal);
  for (let i = 0; i < djsol.length; i++) dots[djsol[i]].changeStatusToPassed();
  //console.log(djsol);
  for (let i = 0; i < djsol.length - 1; i++) {
    for (let j = 0; j < muchii.length; j++) {
      if (muchii[j].dot1 == dots[djsol[i]] && muchii[j].dot2 == dots[djsol[i + 1]])
        muchii[j].changeStatusToPath();
    }
  }
  dots[djNodInitial].changeStatusToStart();
  dots[djNodFinal].changeStatusToEnd();
}

function SavePath(parent, j) {
  if (parent[j] == -1 || j == undefined)
    return;
  SavePath(parent, parent[j]);
  djsol.push(j);
}

function minDistance(dist, sptSet) {
  let min = Number.MAX_SAFE_INTEGER,
    minIndex;
  for (let v = 0; v < dots.length; v++)
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  return minIndex;
}