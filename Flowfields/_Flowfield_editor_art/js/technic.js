let displayModeButtons = document.getElementById("DisplayModeButtons");
let activeButtonStatus =
  displayModeButtons.getElementsByClassName("btn-primary")[0].innerText;


SelectPositionAlgorithm_select.addEventListener("input", () => {
  SelectPositionAlgorithmStatus = SelectPositionAlgorithm_select.value;
  changeBackgroundColor();
  restartState();
});

Select_coloring_algorithm_select.addEventListener("input", () => {
  Select_coloring_algorithmStatus = Select_coloring_algorithm_select.value;
  changeBackgroundColor();
  restartState();
  DisplayCorectInputs(activeButtonStatus);
});

DrawSpeedBtn.addEventListener("click", (e) => {
  e.preventDefault();
  speedToDraw = parseInt(DrawSpeedBtn.innerText.slice(12)) * 2;
  if (speedToDraw >= 32) speedToDraw = 1;
  DrawSpeedBtn.innerText = `Draw Speed: ${speedToDraw}x`;
});

const OnClickModifyDisplaySettings = () => {
  let buttons = document.getElementById("DisplayModeButtons").children;
  for (let button of buttons) {
    button.addEventListener("click", (e) => {
      changeTriggerAnimationToOn();
      restartState(true);
      for (let button of buttons) button.className = "btn btn-secondary";
      e.target.className = "btn btn-primary";

      let activeButton = e.target;
      activeButtonStatus = activeButton.innerText;
      DisplayCorectInputs(activeButtonStatus);
      switch (activeButtonStatus) {
        case "None":
          noLoop();
          background('#333333');
          break;
        case "Grid":
          EraseAndDrawGridScheleton();
          break;
        case "Black and white":
          background('#333333');
          loop();
          break;
        case "Rendering":
          background(backgroundColorForRendering);
          loop();
          break;
      }
    });
  }
};

const OnClickTriggerAnimation = () => {
  TriggerAnimation.addEventListener("click", (e) => {
    if (e.target.className == "btn btn-danger") {
      changeTriggerAnimationToOff();
    } else {
      changeTriggerAnimationToOn();
    }
  });
};

const addInputsChangeEvents = (
  
) => {

  //callbacked din sketch
  grid_scl_slider.input(() => {
    restartState();
    grid_scl = grid_scl_slider.value();
    grid_scl_inputValue.value=grid_scl;
    grid = declareGrid();
    if (activeButtonStatus == "Grid") EraseAndDrawGridScheleton();
    else changeBackgroundColor();
  });

  step_length_slider.input(() => {
    restartState();
    step_length = step_length_slider.value();
  step_length_inputValue.value=parseFloat(step_length).toFixed(2);

    changeBackgroundColor();
  });

  num_steps_slider.input(() => {
    restartState();
    num_steps = num_steps_slider.value();
  num_steps_inputValue.value=parseInt(num_steps);

    changeBackgroundColor();
  });

  no_of_lines_slider.input(() => {
    // restartState();
    no_of_lines = no_of_lines_slider.value();
  no_of_lines_inputValue.value=parseInt(no_of_lines);
    
    // background(25);
  });
  gridMode_select.addEventListener("input", (e) => {
    gridMode = e.target.value;
    DisplayCorectInputs(activeButtonStatus);
    restartState();
    grid = declareGrid();
    EraseAndDrawGridScheleton();
  });
  noise_scl_slider.input((e) => {
    noise_scl = e.target.value;
    noise_scl_inputValue.value= noise_scl;

    restartState();
    grid = declareGrid();
    EraseAndDrawGridScheleton();
  });
  non_continuous_grade_slider.input((e) => {
    non_continuous_grade = e.target.value;
    non_continuous_grade_inputValue.value=non_continuous_grade
    restartState();
    grid = declareGrid();
    EraseAndDrawGridScheleton();
  });

  BackgroundColorPicker.input((e) => {
    backgroundColorForRendering = e.target.value;
    changeBackgroundColor();
    restartState();
  });

  strokeWeightRendering_slider.input((e) => {
    strokeWeightRendering = e.target.value;
  strokeWeightRendering_inputValue.value=strokeWeightRendering;

    restartState();
    changeBackgroundColor();
  });
  AlphaChannel_slider.input((e) => {
    alphaChanelRendering = parseFloat(e.target.value);
  AlphaChannel_inputValue.value= alphaChanelRendering;

    restartState();
    changeBackgroundColor();
  });
  noiseSclRendering_slider.input((e) => {
    noiseSclRendering = parseFloat(e.target.value);
    noiseSclRendering_inputValue.value=noiseSclRendering
    restartState();
    changeBackgroundColor();
  });

  forceRerender_checkbox.changed((e) => {
    forceRerenderWhenParamModif = e.target.checked;
  });
};

new_noise_seed_button.addEventListener("click", () => {
  noiseSeed();

  restartState();
  changeBackgroundColor();
  if (activeButtonStatus == "Grid") {
    grid = declareGrid();
    EraseAndDrawGridScheleton();
  }
});

CustomColors_button.addEventListener("click", () => {
  restartState();
  changeBackgroundColor();
  let CustomColorPicker_span1 = createSpan("Custom color: ");
  CustomColorPicker = createColorPicker("#ff33ff");
  let CustomColorPicker_span2 = createSpan("Probability: ");
  let custom_slider_prob = createSlider(0.01, 1, 0.5, 0);

  let custom_div_color = createDiv();
  let custom_div_prob = createDiv();

  let close_x_span = document.createElement('span');
  close_x_span.className="x_close"
  close_x_span.innerText="x";
  let close_x_wrapper_span= document.createElement('span');
  close_x_wrapper_span.className="x_close_wrapper";
  close_x_wrapper_span.appendChild(close_x_span);

  let groupEm= createDiv();
  CustomColorPicker_span1.parent(custom_div_color);
  CustomColorPicker.parent(custom_div_color);
  CustomColorPicker_span2.parent(custom_div_prob);
  custom_slider_prob.parent(custom_div_prob);
  groupEm.elt.appendChild(close_x_wrapper_span)
  custom_div_color.parent(groupEm);
  custom_div_prob.parent(groupEm);
  groupEm.parent(CustomColors_div_colection);
  let index = colorsAndProbs.length;
  colorsAndProbs[index] = ["#ff33ff", 0.5];


  close_x_span.addEventListener('click',()=>{
    groupEm.remove();
    colorsAndProbs.splice(index,1);
  })



  CustomColorPicker.input((e) => {
    colorsAndProbs[index][0] = e.target.value;
    restartState();
    changeBackgroundColor();
  });
  custom_slider_prob.input((e) => {
    colorsAndProbs[index][1] = parseFloat(e.target.value);
    restartState();
    changeBackgroundColor();
  });
});



for(let el of document.getElementsByClassName('CategoryTitle')){
  //Details and customColors
  el.addEventListener('click',(e)=>{
    if(e.target.nextElementSibling.style.display=="block"){
      e.target.nextElementSibling.style.display="None"
      if(e.target.innerText.includes('Details'))
      e.target.innerText="Details +"
      else
      e.target.innerText="Colors +"


    }
      else {
        e.target.nextElementSibling.style.display="block"
      if(e.target.innerText.includes('Details'))
        e.target.innerText="Details -"
        else 
        e.target.innerText="Colors -"

      }

  })
}



Record.addEventListener('click',(e)=>{
  
  if(e.target.innerText=='Record'){
    e.target.innerText='Recording...'
    e.target.className="btn btn btn-warning navbarButtons";
    recording=1;
    
    if(TriggerAnimation.innerText=='Continue animation')TriggerAnimation.click();
  }
  else{
    e.target.innerText='Record'
    e.target.className="btn btn btn-danger navbarButtons"
    recording=3;
    if(TriggerAnimation.innerText=='Stop animation')TriggerAnimation.click();

  }
})



CloseLoadingGif.addEventListener('click',()=>{
  blockClickEventsOnPage.style.display="None";
  overlayProgressBar.style.display="None";
  CloseLoadingGif.style.display="None";
  if(TriggerAnimation.innerText=='Continue animation')TriggerAnimation.click();
})



const EraseAndDrawGridScheleton = () => {
  noLoop();
  background('#333333');
  // changeBackgroundColor();
  drawGridScheleton();
};

const changeTriggerAnimationToOff = () => {
  TriggerAnimation.className = "btn btn-success";
  TriggerAnimation.innerText = "Continue animation";
  noLoop();
};
const changeTriggerAnimationToOn = () => {
  TriggerAnimation.className = "btn btn-danger";
  TriggerAnimation.innerText = "Stop animation";
  loop();
};

const restartState = (forced = false) => {
  if (forceRerenderWhenParamModif == true || forced) {
    last_column_index = 0;
    last_row_index = 0;
    CircleHistory = [];
    square_offset_SFE = 0;
    xoff_noisy_hue = 0;
    hueFrom0To360 = 0;
  }
};

const changeBackgroundColor = () => {
  if (forceRerenderWhenParamModif == true)
    background(backgroundColorForRendering);
};

OnClickModifyDisplaySettings();
OnClickTriggerAnimation();
