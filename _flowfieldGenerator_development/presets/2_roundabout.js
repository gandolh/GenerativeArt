let grid;
let resolution;
function setup() {
  DC = document.getElementById("DisplayCanvas");
  let cnv = createCanvas(DC.clientWidth, windowHeight - 50); //navbar height

  cnv.parent("DisplayCanvas");
  background(51);
  //    line(0,0,300,300)
  grid = declareGrid();
}

function draw() {
   if(frameCount%40==0){
      drawGrid();

   }
}

var declareGrid = () => {
  left_x = int(width * -0.5);
  right_x = int(width * 1.5);
  top_y = int(height * -0.5);
  bottom_y = int(height * 1.5);

  resolution = int(width * 0.05);

  num_columns = (right_x - left_x) / resolution;
  num_rows = (bottom_y - top_y) / resolution;

  let grid = [];
  for (let i = 0; i <= num_columns; i++) {
    grid[i] = [];
    for (let j = 0; j <= num_rows; j++) grid[i][j] = undefined;
  }

  let default_angle = PI * 0.25;

  for (let column =0;column<= num_columns;column++) {
    for (row=0;row<= num_rows;row++) {
      angle = (row / float(num_rows)) * PI
      grid[column][row] = angle;
    }
  }
  return grid;
};

var drawGrid = () => {
   // vine in draw chestia aia cu linia
  stroke(255);
  for (let column = 0; column <= num_columns; column++)
    for (row = 0; row <= num_rows; row++) {
      let x = column * resolution + left_x;
      let y = row * resolution + top_y;
      ellipse(x, y, 2, 2);
      line(
        x,
        y,
        x + (resolution / 2) * cos(grid[column][row]),
        y + (resolution / 2) * sin(grid[column][row])
      );
    }
};
