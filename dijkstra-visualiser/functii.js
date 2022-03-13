function initMatAd() {
  for (let i = 0; i <= 50; i++) graph[i] = [];
  for (let i = 0; i <= 50; i++)
    for (let j = 0; j <= 50; j++) graph[i][j] = 0;
}

function keyPressed() {
  if (datDeValori == 1) {
    if (keyCode == ENTER) {
      datDeValori = 0;
      strtemp = ' ';
    } else {
      strtemp += char(keyCode);
      costuri[Icost].string = strtemp;
    }
  }
}

function mousePressed() {
  if (djikstraOn) {
    if (djNodInitial == -1) {
      for (let i = 0; i < dots.length; i++)
        if (dist(mouseX, mouseY, dots[i].x, dots[i].y) <= dots[i].r) {
          djNodInitial = i;
          src = djNodInitial;
          dots[i].changeColorToRed();
          break;
        }
    } else if (djNodFinal == -1) {
      for (let i = 0; i < dots.length; i++)
        if (dist(mouseX, mouseY, dots[i].x, dots[i].y) <= dots[i].r) {
          djNodFinal = i;
          dots[i].changeColorToRed();
          break;
        }
    }

  }

  if (djButonStartAlgoritm.touched()) {
    djikstraOn = 1;
    djikstraVisualOn = 1;
    djikstraSolutieOn = 0;
    //reinitializare valori
    djikstraOk = 1;
    djNodInitial = -1;
    djNodFinal = -1;
    nuEsteFinal = 1;
    for (let i = 0; i < dots.length; i++) dots[i].changeColorToWhite();
    for (let i = 0; i < muchii.length; i++) muchii[i].changeStatusToNormal();
  } else if (djButonStartSolutie.touched()) {
    djikstraOn = 1;
    djikstraSolutieOn = 1;
    djikstraVisualOn = 0;
    //reinitializare valori
    djikstraOk = 1;
    djNodInitial = -1;
    djNodFinal = -1;
    nuEsteFinal = 1;
    for (let i = 0; i < dots.length; i++) dots[i].changeColorToWhite();
    for (let i = 0; i < muchii.length; i++) muchii[i].changeStatusToNormal();
  }

  if (!djikstraOn) {
    if (!datDeValori) {

      let acti = -100;
      for (let i = 0; i < dots.length; i++)
        if (dist(mouseX, mouseY, dots[i].x, dots[i].y) <= dots[i].r) {
          acti = i;
        }

      if (acti == -100) {
        dots.push(new Dot(mouseX, mouseY, dots.length));
      } else if (pi == -100) {
        pi = acti;
        dots[pi].changeColorToRed();

      } else if (acti == pi) {
        dots[pi].changeColorToWhite();
        pi = -100;
      } else {
        muchii.push(new Muchie(dots[pi], dots[acti]));
        costuri.push(new Cost(dots[pi], dots[acti]));
        dots[pi].changeColorToWhite();
        pi = -100;
      }
    }
  }
}

function mouseDragged() {
  if (djikstraOn == 0) {
    for (let i = 0; i < dots.length; i++)
      if (dist(mouseX, mouseY, dots[i].x, dots[i].y) <= 30) {
        dots[i].x = mouseX;
        dots[i].y = mouseY;
      }
  }
}

function adaugareMuchie() {
  strokeWeight(5);
  for (let i = 0; i < muchii.length; i++) muchii[i].show();
}

function inChenar(i) {
  if (mouseX >= costuri[i].x && mouseX <= costuri[i].x + costuri[i].w && mouseY >= costuri[i].y &&
    mouseY <= costuri[i].y + costuri[i].h) return 1;
  return 0;
}

function adaugareCost() {
  for (let i = 0; i < costuri.length; i++) {
    if (inChenar(i) && mouseIsPressed) {
      if (i != Icost) strtemp = ' ';
      if (!datDeValori && djikstraOn == 0) dots.pop();
      datDeValori = 1;
      Icost = i;
    }
    costuri[i].show();
  }
}

function adaugareNoduri() {
  for (let i = 0; i < dots.length; i++) dots[i].show();
}

function adaugareValoriGraph() {

  for (let i = 0; i < costuri.length; i++) {
    let x = parseInt(costuri[i].string);
    if (isNaN(x)) x = Number.MAX_SAFE_INTEGER;
    graph[costuri[i].dot1.nrOrdine][costuri[i].dot2.nrOrdine] = x;
    //graph[costuri[i].dot2.nrOrdine][costuri[i].dot1.nrOrdine] = x;
  }

}