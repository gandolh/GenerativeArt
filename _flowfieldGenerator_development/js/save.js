download1x.addEventListener('click',()=>{
    saveCanvas(cnv,'my_beautifull_art','png');
})


Export.addEventListener('click',(e)=>{

    let obj={
        grid_scl ,
        step_length ,
        num_steps ,
        no_of_lines ,
        gridMode ,
        Select_coloring_algorithmStatus ,
        noise_scl ,
        non_continuous_grade ,
        //rendering
        strokeWeightRendering ,
        noiseSclRendering ,
        alphaChanelRendering ,
        backgroundColorForRendering ,
        speedToDraw ,
        framesPerDraw ,
        forceRerenderWhenParamModif ,
        SelectPositionAlgorithmStatus
    }
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(obj)], {type : 'application/json'});
    a.href = URL.createObjectURL(file);
    let date= new Date();
    a.download = 'export-'+ `${date.toDateString()}-${date.getHours()}:${date.getMinutes()}.json`;
    a.click();


})


Import.addEventListener('click',(e)=>{
    ImportFile.click();
})
ImportFile.addEventListener('input',(e)=>{
    readFileForImport(e);
})





var readFileForImport = async (e)=>{
    let str= await e.target.files[0].text();
    config_obj= JSON.parse(str);
    //deconstruct variables
    grid_scl =config_obj.grid_scl
    step_length =config_obj.step_length
    num_steps =config_obj.num_steps
    no_of_lines =config_obj.no_of_lines
    gridMode =config_obj.gridMode,
    Select_coloring_algorithmStatus =config_obj.Select_coloring_algorithmStatus
    noise_scl =config_obj.noise_scl
    non_continuous_grade =config_obj.non_continuous_grade
    //rendering
    strokeWeightRendering =config_obj.strokeWeightRendering
        noiseSclRendering =config_obj.noiseSclRendering
        alphaChanelRendering =config_obj.alphaChanelRendering
        backgroundColorForRendering =config_obj.backgroundColorForRendering
        speedToDraw =config_obj.speedToDraw
        framesPerDraw =config_obj.framesPerDraw
        forceRerenderWhenParamModif =config_obj.forceRerenderWhenParamModif
        SelectPositionAlgorithmStatus = config_obj.SelectPositionAlgorithmStatus;
    //controllers
        grid_scl_slider.value(grid_scl)
    step_length_slider.value(step_length)
    num_steps_slider.value(num_steps)
    no_of_lines_slider.value(no_of_lines)
    noise_scl_slider.value(noise_scl)
    non_continuous_grade_slider.value(non_continuous_grade)
    strokeWeightRendering_slider.value(strokeWeightRendering)
    AlphaChannel_slider.value(alphaChanelRendering)
    noiseSclRendering_slider.value(noiseSclRendering)
    forceRerender_checkbox.value=forceRerenderWhenParamModif
    gridMode_select.value= gridMode;
    Select_coloring_algorithm_select.value=Select_coloring_algorithmStatus;
    SelectPositionAlgorithm_select.value=SelectPositionAlgorithmStatus;


  //muted inputs
  grid_scl_inputValue.value=grid_scl;
  noise_scl_inputValue.value= noise_scl;
  non_continuous_grade_inputValue.value=non_continuous_grade;
  step_length_inputValue.value=step_length;
  num_steps_inputValue.value=num_steps;
  no_of_lines_inputValue.value=no_of_lines;
  strokeWeightRendering_inputValue.value=strokeWeightRendering;
  AlphaChannel_inputValue.value= alphaChanelRendering;
  noiseSclRendering_inputValue.value=noiseSclRendering;



    DrawSpeedBtn.innerText=`Draw Speed: ${speedToDraw}x`
    BackgroundColorPicker.value(backgroundColorForRendering)
    background(backgroundColorForRendering)
}