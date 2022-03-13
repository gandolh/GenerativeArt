let grid;
let resolution;
let left_x, right_x, top_y, bottom_y;
let num_columns, num_rows;
let grid_scl = 0.03;
function setup() {
  DC = document.getElementById("DisplayCanvas");
  let cnv = createCanvas(DC.clientWidth, windowHeight - 50); //navbar height

  cnv.parent("DisplayCanvas");
  background(51);
  //    line(0,0,300,300)
  grid = declareGrid();
}

function draw() {
  if (frameCount % 40 == 0) {
    drawGrid();
    drawLine(500,100,0.01 * width,60);//step_length  between 0.5% and 0.1% of image width
                                      //larger for quick renders
  }
}

var declareGrid = () => {
  left_x = int(width * -0.5);
  right_x = int(width * 1.5);
  top_y = int(height * -0.5);
  bottom_y = int(height * 1.5);

  resolution = int(width * grid_scl);

  num_columns = (right_x - left_x) / resolution;
  num_rows = (bottom_y - top_y) / resolution;

  let grid = [];
  for (let i = 0; i <= num_columns; i++) {
    grid[i] = [];
    for (let j = 0; j <= num_rows; j++) grid[i][j] = undefined;
  }

  let default_angle = PI * 0.25;

  for (let column = 0; column <= num_columns; column++) {
    for (row = 0; row <= num_rows; row++) {
      angle = (row / float(num_rows)) * PI;
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

const drawLine = (x,y,step_length,num_steps) => {
  noFill();
  beginShape();
  for (let i = 0; i <= num_steps; i++) {
    vertex(x, y);
    x_offset = x - left_x;
    y_offset = y - top_y;
    column_index = int(x_offset / resolution);
    row_index = int(y_offset / resolution);
    // NOTE: normally you want to check the bounds here
    grid_angle = grid[column_index][row_index];
    x_step = step_length * cos(grid_angle);
    y_step = step_length * sin(grid_angle);

    x = x + x_step;
    y = y + y_step;
  }
  endShape();
};
