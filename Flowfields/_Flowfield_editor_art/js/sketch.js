let grid;
let resolution;
let left_x, right_x, top_y, bottom_y;
let num_columns, num_rows;

let gridMode;
let cnv;





function setup() {
  //introducing canvas in DOM.
  let DC = document.getElementById("DisplayCanvas");
   cnv = createCanvas(windowWidth - 425, windowHeight - 50); //navbar height
  cnv.parent("DisplayCanvas");
  colorMode(HSB);
  //declare and add Inputs
  declareParameters();
  initializeInputs();
  //display only Corect ones
  DisplayCorectInputs();
}

function draw() {
  if(recording==1){
   if(typeof capturer== CCapture) capturer.stop();
    capturer = new CCapture({ format: 'gif', workersPath: 'js/libraries/', framerate: fps,verbose: false,motionBlurFrames:1,onProgress: function( p ) { 

      if(p==0){blockClickEventsOnPage.style.display="flex";overlayProgressBar.style.display="flex"}

      progressConvertToGif.style.width = parseInt(( p * 100 )) + '%' ;
      progressConvertToGif.innerText= parseInt(( p * 100 )) + '%';
      if(p==1){
        CloseLoadingGif.style.display="block";
        }
    }});
    capturer.start();
    recording=2;
    startMillis = millis();
  }
  if(recording==3){
    console.log('finished recording.');
    capturer.stop();
    capturer.save();
    startMillis = undefined;
    recording=0;
  }
  if (frameCount % parseInt(framesPerDraw / speedToDraw) == 0) {
    if (activeButtonStatus != "None" && activeButtonStatus != "Grid")
      drawLines(step_length, num_steps,cnv);
    }
    if(recording==2){
      console.log('capturing frame');
      capturer.capture(cnv.elt);
    }
}

const initializeInputs = () => {
  //grid scale
  let grid_scl_span = createSpan("Grid scale:");
  grid_scl_slider = createSlider(0.01, 0.1, default_grid_scl, 0.01);
  grid_scl_span.parent(grid_scl_div);
  grid_scl_slider.parent(grid_scl_div);
  grid_scl_div.style.display = "None";

  //step_length la draw line
  let step_length_span = createSpan("Step length:");
  step_length_slider = createSlider(
    0.01 * width,
    0.05 * width,
    default_step_length,
    0.01
  );
  step_length_span.parent(step_length_div);
  step_length_slider.parent(step_length_div);
  step_length_div.style.display = "None";

  //num_steps
  let num_steps_span = createSpan("Num Steps:");
  num_steps_slider = createSlider(1, 60, default_num_steps, 0);
  num_steps_span.parent(num_steps_div);
  num_steps_slider.parent(num_steps_div);
  num_steps_div.style.display = "None";

  //no_of_lines
  let no_of_lines_span = createSpan("Number of lines per frame:");
  no_of_lines_slider = createSlider(1, 60, default_no_of_lines, 0);
  no_of_lines_span.parent(no_of_lines_div);
  no_of_lines_slider.parent(no_of_lines_div);
  no_of_lines_div.style.display = "None";

  //noise_scl
  let noise_scl_span = createSpan("noise scale:");
  //hover details
  //less is more fluid
  noise_scl_slider = createSlider(0.02, 0.15, default_noise_scl, 0.01);
  noise_scl_span.parent(noise_scl_div);
  noise_scl_slider.parent(noise_scl_div);
  noise_scl_div.style.display = "None";
  // non_continuous_grade
  let non_continuous_grade_span = createSpan("non-continuous grade:");
  non_continuous_grade_slider = createSlider(1, 10, default_non_continuous_grade, 1);
  non_continuous_grade_span.parent(non_continuous_grade_div);
  non_continuous_grade_slider.parent(non_continuous_grade_div);
  non_continuous_grade_div.style.display = "None";

  //backgroundColorPicker
  BackgroundColorPicker_span = createSpan("Background color:");
  BackgroundColorPicker = createColorPicker(default_backgroundColorForRendering);
  BackgroundColorPicker_span.parent(background_color_div);
  BackgroundColorPicker.parent(background_color_div);
  background_color_div.style.display = "None";

  // strokeWeight
  let strokeWeightRendering_span = createSpan("Stroke weight:");
  strokeWeightRendering_slider = createSlider(1, 10, default_strokeWeightRendering, 1);
  strokeWeightRendering_span.parent(strokeWeightRendering_div);
  strokeWeightRendering_slider.parent(strokeWeightRendering_div);
  strokeWeightRendering_div.style.display = "None";

  // Alpha channel
  let AlphaChannel_span = createSpan("Alpha channel:");
  AlphaChannel_slider = createSlider(0, 1, default_alphaChanelRendering, 0.01);
  AlphaChannel_span.parent(AlphaChannel_div);
  AlphaChannel_slider.parent(AlphaChannel_div);
  AlphaChannel_div.style.display = "None";

  // noiseSclRendering
  let noiseSclRendering_span = createSpan("noise scale for colors:");
  noiseSclRendering_slider = createSlider(0.1, 0.5, default_noiseSclRendering, 0.01);
  noiseSclRendering_span.parent(noiseSclRendering_div);
  noiseSclRendering_slider.parent(noiseSclRendering_div);
  noiseSclRendering_div.style.display = "None";

  //force rerender
  forceRerender_checkbox = createCheckbox(
    "Force rerender after parameter modifies",
    default_forceRerenderWhenParamModif
  );
  forceRerender_checkbox.parent(ForceRerender_div);

  //buton animaties
  TriggerAnimation_div.style.display = "None";
  gridMode_div.style.display = "None";
  new_noise_seed_div.style.display = "None";
  SelectPositionAlgorithm_div.style.display = "None";
  Colors.style.display = "None";
  DrawSpeedBtn.style.display = "None";
  ForceRerender_div.style.display = "None";
  CustomColors_div_colection.style.display = "None"; 
  DetailsTitle.style.display="None";



  addInputsChangeEvents( );
};
