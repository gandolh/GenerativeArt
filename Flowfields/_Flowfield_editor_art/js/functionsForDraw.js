const declareGrid = () => {
  left_x = int(width * -0.5);
  right_x = int(width * 1.5);
  top_y = int(height * -0.5);
  bottom_y = int(height * 1.5);

  resolution = int(width * grid_scl);

  num_columns = int((right_x - left_x) / resolution);
  num_rows = int((bottom_y - top_y) / resolution);
  let grid = [];
  for (let i = 0; i <= num_columns; i++) {
    grid[i] = [];
    for (let j = 0; j <= num_rows; j++) grid[i][j] = undefined;
  }
  switch (gridMode) {
    case "Perlin noise":
      for (let column = 0; column <= num_columns; column++) {
        for (row = 0; row <= num_rows; row++) {
          angle = noise(column * noise_scl, row * noise_scl) * TWO_PI;
          grid[column][row] = angle;
        }
      }

      break;
    case "Rounded":
      let default_angle = PI * 0.25;
      for (let column = 0; column <= num_columns; column++) {
        for (row = 0; row <= num_rows; row++) {
          angle = (row / float(num_rows)) * PI;
          grid[column][row] = angle;
        }
      }
      break;

    case "Non-continuous distortions":
      for (let column = 0; column <= num_columns; column++) {
        for (row = 0; row <= num_rows; row++) {
          angle = noise(column * noise_scl, row * noise_scl) * TWO_PI;
          angle =
            int(angle / (TWO_PI / non_continuous_grade)) *
            (TWO_PI / non_continuous_grade);
          grid[column][row] = angle;
        }
      }
      break;

    case "Totally random":
      for (let column = 0; column <= num_columns; column++) {
        for (row = 0; row <= num_rows; row++) {
          angle = random() * TWO_PI;
          grid[column][row] = angle;
        }
      }
      break;
  }

  return grid;
};

const drawGridScheleton = () => {
  // vine in draw chestia aia cu linia
  stroke(255);
  strokeWeight(1.5 * grid_scl * 50);
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

const drawLine = (x, y, step_length, num_steps,p5Instance) => {
  p5Instance.noFill();
  p5Instance.beginShape();
  for (let i = 0; i <= num_steps; i++) {
    x_offset = x - left_x;
    y_offset = y - top_y;
    p5Instance.vertex(x, y);
    column_index = int(x_offset / resolution);
    row_index = int(y_offset / resolution);

    // if (
    //   column_index < 0 ||
    //   column_index > width ||
    //   row_index < 0 ||
    //   row_index > height
    // ) {
    //   endShape();
    //   return 0;
    // }

    grid_angle = calculateGridAngle(column_index, row_index);

    x_step = step_length * cos(grid_angle);
    y_step = step_length * sin(grid_angle);

    x = x + x_step;
    y = y + y_step;
  }
  p5Instance.endShape();
};

const calculateGridAngle = (col, row) => {
  let grid_angle = 0;
  if (col < 0) grid_angle = grid[num_columns];
  else if (col >= num_columns) grid_angle = grid[0];
  else if (row < 0) grid_angle = grid[num_rows];
  else if (row >= num_rows) grid_angle = grid[0];
  else {
    grid_angle = grid[column_index][row_index];
  }
  return grid_angle;
};

const drawLines = (step_length, num_steps,cnv,p5Instance=window) => {
  if (activeButtonStatus === "Black and white") {
    cnv.stroke(255, 0.35);
    cnv.strokeWeight(2);
  } else {
    //render
    cnv.strokeWeight(strokeWeightRendering);
    switch (Select_coloring_algorithmStatus) {
      case "Totally random":
        cnv.stroke(random() * 360, 120, 255, alphaChanelRendering);
        break;
      case "Noisy hue":
        cnv.stroke(noise(xoff_noisy_hue) * 360, 120, 255, alphaChanelRendering);
        xoff_noisy_hue += noiseSclRendering;
        break;
      case "hue from 0 to 360":
        cnv.stroke(hueFrom0To360, 120, 255, alphaChanelRendering);
        hueFrom0To360 += 3;
        hueFrom0To360 %= 360;
        break;
      case "Custom":
        if (colorsAndProbs.length != 0) {
          let r = random();
          let colorTD;
          let temp_caps = colorsAndProbs
            .map((el) => Array(parseInt(el[1] * 100)).fill(el[0]))
            .flat();
          // console.log(temp_caps)

          colorTD = color(random(temp_caps));
          colorTD.setAlpha(alphaChanelRendering);
          cnv.stroke(colorTD);
        } else cnv.stroke(120, 120, 255, alphaChanelRendering);
        break;
    }
  }

  let randomX_mini_offset, randomY_mini_offset;

  switch (SelectPositionAlgorithmStatus) {
    case "Random selecting":
      for (let i = 0; i <= no_of_lines; i++)
        drawLine(
          random() * (width + 15),
          random() * (height + 15),
          step_length,
          num_steps,
          p5Instance
        );
      break;
    case "Full grid":
      randomX_mini_offset = ((random() * 2 - 1) * resolution) / 2;
      randomY_mini_offset = ((random() * 2 - 1) * resolution) / 2;
      for (let i = 0; i <= no_of_lines; i++) {
        let x = last_column_index * resolution + randomX_mini_offset;
        let y = last_row_index * resolution + randomY_mini_offset;

        if (y >= height) {
          last_row_index = 0;
          last_column_index = 0;
        }
        drawLine(x, y, step_length, num_steps,p5Instance);

        last_column_index++;
        if (x >= width) {
          last_column_index = 0;
          last_row_index++;
        }
      }
      break;
    case "Circle packing":
      let circle_radius = 20;
      let no_of_attemps = 0;
      for (let i = 0; i <= no_of_lines; i++) {
        let found = false;
        while (no_of_attemps < 20 && !found) {
          let available = true;
          let x = random() * (width + 15);
          let y = random() * (height + 15);
          for (let i = 0; i < CircleHistory.length && available; i++) {
            if (
              dist(x, y, CircleHistory[i].x, CircleHistory[i].y) <=
              CircleHistory[i].r
            )
              available = false;
          }

          if (available == false) no_of_attemps++;
          else {
            CircleHistory.push(new Circle(x, y, circle_radius));
            drawLine(x, y, step_length, num_steps,p5Instance);
            found = true;
          }
        }
      }
      break;
    case "Starting from Edges":
      randomX_mini_offset = (random() * 2 - 1) * 1;
      randomY_mini_offset = (random() * 2 - 1) * 1;
      if (square_offset_SFE >= min(num_columns, num_rows) / 4) {
        square_offset_SFE = 0;
      }
      for (let i = square_offset_SFE; i < num_columns; i++)
        drawLine(
          i * resolution + randomX_mini_offset,
          square_offset_SFE * resolution + randomY_mini_offset,
          step_length,
          num_steps,
          p5Instance
        );
      for (let i = square_offset_SFE; i < num_columns; i++)
        drawLine(
          width - square_offset_SFE * resolution,
          i * resolution + randomX_mini_offset + randomY_mini_offset,
          step_length,
          num_steps,
          p5Instance
        );
      for (let i = square_offset_SFE; i < num_columns; i++)
        drawLine(
          i * resolution + randomX_mini_offset + randomY_mini_offset,
          height - square_offset_SFE * resolution,
          step_length,
          num_steps,
          p5Instance
        );
      for (let i = square_offset_SFE; i < num_columns; i++)
        drawLine(
          square_offset_SFE * resolution,
          i * resolution + randomX_mini_offset + randomY_mini_offset,
          step_length,
          num_steps,
          p5Instance
        );
      square_offset_SFE++;

      break;
    case "Starting from Center":
      scl_SFC = resolution / 4;
      let centerX = (num_columns / 4) * resolution;
      let centerY = (num_rows / 4) * resolution;
      push();
      translate(centerX,centerY);
      rotate(random_angle);
      for (let j = 0; j <= no_of_lines / 3; j++) {
        for (let i = 0; i <= 9; i++) {
          drawLine(
            // centerX +
              square_offset_SFE * dx_SFC[i] * scl_SFC ,
            // centerY +
              square_offset_SFE * dy_SFC[i] * scl_SFC ,
            step_length,
            num_steps,
            p5Instance
          );
        }
        square_offset_SFE++;
      }
      if (
        square_offset_SFE * scl_SFC > width / 1.5 &&
        square_offset_SFE * scl_SFC > height / 1.5
      ) {
        square_offset_SFE = 0;
        random_angle=random()*TWO_PI;
      }
      pop();
      break;
  }
};

const DisplayCorectInputs = (activeButtonStatus) => {
  if (activeButtonStatus == "None") {
    grid_scl_div.style.display = "None";
    step_length_div.style.display = "None";
    num_steps_div.style.display = "None";
    TriggerAnimation_div.style.display = "None";
    SelectPositionAlgorithm_div.style.display = "None";
    no_of_lines_div.style.display = "None";
    gridMode_div.style.display = "None";
    noise_scl_div.style.display = "None";
    new_noise_seed_div.style.display = "None";
    non_continuous_grade_div.style.display = "None";
    Colors.style.display = "None";
    background_color_div.style.display = "None";
    strokeWeightRendering_div.style.display = "None";
    AlphaChannel_div.style.display = "None";
    noiseSclRendering_div.style.display = "None";
    DrawSpeedBtn.style.display = "None";
    ForceRerender_div.style.display = "None";
    CustomColors_div_colection.style.display = "None";
  DetailsTitle.style.display="None";

  }
  if (activeButtonStatus == "Grid") {
    grid_scl_div.style.display = "flex";
    step_length_div.style.display = "None";
    num_steps_div.style.display = "None";
    TriggerAnimation_div.style.display = "None";
    SelectPositionAlgorithm_div.style.display = "None";
    no_of_lines_div.style.display = "None";
    gridMode_div.style.display = "flex";
    if (
      gridMode == "Perlin noise" ||
      gridMode == "Non-continuous distortions"
    ) {
      noise_scl_div.style.display = "flex";
      new_noise_seed_div.style.display = "flex";
    } else {
      noise_scl_div.style.display = "None";
    }

    if (gridMode != "Rounded") new_noise_seed_div.style.display = "flex";
    else new_noise_seed_div.style.display = "None";

    if (gridMode == "Non-continuous distortions") {
      non_continuous_grade_div.style.display = "flex";
    } else {
      non_continuous_grade_div.style.display = "None";
    }
    Colors.style.display = "None";
    background_color_div.style.display = "None";
    strokeWeightRendering_div.style.display = "None";
    AlphaChannel_div.style.display = "None";
    noiseSclRendering_div.style.display = "None";
    DrawSpeedBtn.style.display = "None";
    ForceRerender_div.style.display = "None";
    CustomColors_div_colection.style.display = "None";
  DetailsTitle.style.display="flex";

  }
  if (activeButtonStatus == "Black and white") {
    grid_scl_div.style.display = "none";
    step_length_div.style.display = "flex";
    num_steps_div.style.display = "flex";
    TriggerAnimation_div.style.display = "flex";
    SelectPositionAlgorithm_div.style.display = "flex";
    no_of_lines_div.style.display = "flex";
    gridMode_div.style.display = "None";
    noise_scl_div.style.display = "None";
    new_noise_seed_div.style.display = "None";
    non_continuous_grade_div.style.display = "None";
    Colors.style.display = "None";
    background_color_div.style.display = "None";
    strokeWeightRendering_div.style.display = "None";
    AlphaChannel_div.style.display = "None";
    noiseSclRendering_div.style.display = "None";
    DrawSpeedBtn.style.display = "flex";
    ForceRerender_div.style.display = "flex";
    CustomColors_div_colection.style.display = "None";
  DetailsTitle.style.display="flex";

  }
  if (activeButtonStatus == "Rendering") {
    grid_scl_div.style.display = "none";
    step_length_div.style.display = "flex";
    num_steps_div.style.display = "flex";
    TriggerAnimation_div.style.display = "flex";
    SelectPositionAlgorithm_div.style.display = "flex";
    no_of_lines_div.style.display = "flex";
    gridMode_div.style.display = "None";
    noise_scl_div.style.display = "None";
    new_noise_seed_div.style.display = "None";
    if (Select_coloring_algorithmStatus == "Noisy hue")
      new_noise_seed_div.style.display = "flex";
    if (Select_coloring_algorithmStatus == "Totally random")
      new_noise_seed_div.style.display = "flex";

    non_continuous_grade_div.style.display = "None";
    Colors.style.display = "Block";
    background_color_div.style.display = "flex";
    strokeWeightRendering_div.style.display = "flex";
    AlphaChannel_div.style.display = "flex";
    noiseSclRendering_div.style.display = "None";
    if (Select_coloring_algorithmStatus == "Noisy hue")
      noiseSclRendering_div.style.display = "flex";
    DrawSpeedBtn.style.display = "flex";
    ForceRerender_div.style.display = "flex";
    CustomColors_div_colection.style.display = "None";
    if (Select_coloring_algorithmStatus == "Custom")
      CustomColors_div_colection.style.display = "flex";
  DetailsTitle.style.display="flex";

  }
};
