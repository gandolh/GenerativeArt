//poison sampling
let CircleHistory = [];
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

//static variables
let last_column_index = 0,
  last_row_index = 0;
let square_offset_SFE = 0;
let dx_SFC = [0, 1, 1, 1, 0, -1, -1, -1],
  dy_SFC = [-1, -1, 0, 1, 1, 1, 0, -1];
let Select_coloring_algorithmStatus;
let xoff_noisy_hue = 0;
let hueFrom0To360 = 0;
let random_angle = 0;

// the canvas capturer instance
var capturer;
let startMillis;
let recording = 0;
var fps = 60;

let colorsAndProbs = [];

let grid_scl,
  step_length,
  num_steps,
  no_of_lines,
  noise_scl,
  non_continuous_grade;


//imported
let default_grid_scl,
  default_step_length,
  default_num_steps,
  default_no_of_lines,
  default_gridMode,
  default_Select_coloring_algorithmStatus,
  default_noise_scl,
  default_non_continuous_grade,
  default_strokeWeightRendering,
  default_noiseSclRendering,
  default_alphaChanelRendering,
  default_backgroundColorForRendering,
  default_speedToDraw,
  default_framesPerDraw,
  default_forceRerenderWhenParamModif;

  let SelectPositionAlgorithmStatus;


//sliders
var grid_scl_slider,
    step_length_slider,
    num_steps_slider,
    no_of_lines_slider,
    noise_scl_slider,
    non_continuous_grade_slider,
    strokeWeightRendering_slider,
    AlphaChannel_slider,
    noiseSclRendering_slider,
    forceRerender_checkbox,
    BackgroundColorPicker



//declare parameters in sketch
var declareParameters = () => {
  //default
  default_grid_scl = 0.03;
  default_step_length = 0.03 * width;
  default_num_steps = 5;
  default_no_of_lines = 20;
  if (default_gridMode == undefined) default_gridMode = gridMode_select.value;
  if (default_Select_coloring_algorithmStatus == undefined)
    default_Select_coloring_algorithmStatus =
      Select_coloring_algorithm_select.value;
  default_noise_scl = 0.05;
  default_non_continuous_grade = 4;
  //rendering default
  default_strokeWeightRendering = 5;
  default_noiseSclRendering = 0.05;
  default_alphaChanelRendering = 0.3;
  default_backgroundColorForRendering = "#333333";
  default_speedToDraw = 1;
  default_framesPerDraw = 40;
  default_forceRerenderWhenParamModif = true;
  default_SelectPositionAlgorithmStatus = SelectPositionAlgorithm_select.value;
  //modified
  grid_scl = default_grid_scl;
  step_length = default_step_length;
  num_steps = default_num_steps;
  no_of_lines = default_no_of_lines;
  gridMode = default_gridMode;
  Select_coloring_algorithmStatus = default_Select_coloring_algorithmStatus;
  noise_scl = default_noise_scl;
  non_continuous_grade = default_non_continuous_grade;
  //rendering
  strokeWeightRendering = default_strokeWeightRendering;
  noiseSclRendering = default_noiseSclRendering;
  alphaChanelRendering = default_alphaChanelRendering;
  backgroundColorForRendering = default_backgroundColorForRendering;
  speedToDraw = default_speedToDraw;
  framesPerDraw = default_framesPerDraw;
  forceRerenderWhenParamModif = default_forceRerenderWhenParamModif;
  SelectPositionAlgorithmStatus = default_SelectPositionAlgorithmStatus;


  //muted inputs
  grid_scl_inputValue.value=default_grid_scl;
  noise_scl_inputValue.value= default_noise_scl;
  non_continuous_grade_inputValue.value=default_non_continuous_grade;
  step_length_inputValue.value=default_step_length;
  num_steps_inputValue.value=default_num_steps;
  no_of_lines_inputValue.value=default_no_of_lines;
  strokeWeightRendering_inputValue.value=default_strokeWeightRendering;
  AlphaChannel_inputValue.value= default_alphaChanelRendering;
  noiseSclRendering_inputValue.value=default_noiseSclRendering;



  //calculate grid
  background(backgroundColorForRendering);
  grid = declareGrid();

  if (activeButtonStatus == "None") {
    noLoop();
    background(backgroundColorForRendering);
  }
  stroke(255);
};


let renderingMultipleIsTrue=false;