
download_multiple.addEventListener('click',  (e)=>{
    downloadMultiple_tab.style.display="flex";
    blockClickEventsOnPage.style.display="flex";
    if(TriggerAnimation.innerText=='Stop animation')TriggerAnimation.click();
  
    //magic stuff rendering;
  
    renderingMultipleIsTrue=true;
  
    GoForItDM.onclick=async ()=>{
      downloadMultipleForm.style.display="none";
      LoadSketchesDM.style.display="flex";
      let time= parseInt(TimeDM.value); // in seconds
      let num_sketches= parseInt(num_of_sketches_DM.value);
      progressDownloadMultiple.style.width="0%"
      progressDownloadMultiple.innerHTML= "0%";
      const canvases = await iterateThroughSketches(time,num_sketches)

      await saveAllCanvases(canvases);
    }
  
  
    CancelDMWIP.onclick= ()=>{
      downloadMultipleForm.style.display="block";
      renderingMultipleIsTrue=false;
      LoadSketchesDM.style.display="None"
      downloadMultiple_tab.style.display="None";
      blockClickEventsOnPage.style.display="None";
      if(TriggerAnimation.innerText=='Continue animation')TriggerAnimation.click();  
    }
  
  });
  

//end previous event
  const iterateThroughSketches= async(time,num_sketches)=>{
    return new Promise(async(resolve, reject) =>{
        let canvases =[];
        for(let i=1;i<=num_sketches && renderingMultipleIsTrue;i+=4){
            //render
            let canvasesStack= await IterateThroughStack(time,i,num_sketches);
            canvases= [...canvases,...canvasesStack]
            }
        resolve(canvases)
    })
  }


  const IterateThroughStack = (time,i,num_sketches)=>{
     return new Promise((resolve,reject)=>{
       let canvasesStack= [];
      for(let j=i;j<i+4 && j<=num_sketches;j++){
        const foo_sketch = p => {
          let time_spent=0;
          let interval= setInterval(()=>{
            time_spent++;
          },1000)
          p.setup = function() {
            p.cnv= p.createCanvas(windowWidth - 425, windowHeight - 50);
            p.colorMode(HSB);
            p.background(backgroundColorForRendering)
          };
        
          p.draw = function() {
            
          if(time_spent>=time){
            p.noLoop();
            clearInterval(interval)
            progressDownloadMultiple.style.width=`${parseInt(j/num_sketches*100)}%`
            progressDownloadMultiple.innerHTML= `${parseInt(j/num_sketches*100)}%`
            resolve(canvasesStack);
          }
          drawLines(step_length, num_steps,p.cnv, p); 
        };
      };    
      let fooSketch = new p5(foo_sketch);
      canvasesStack.push(fooSketch.canvas)
      }
     })
  }

  function getBase64Image(canvas) {

      var dataURL = canvas.toDataURL("image/png");
      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  const  saveAllCanvases = async(canvases)=>{
    return new Promise(async(resolve,reject)=>{
      var zip = new JSZip();
      zip.folder("images");
      var imgs = zip.folder("images");
        for(let i=0;i<canvases.length;i++){
            let img = getBase64Image(canvases[i]);
            imgs.file(`myBeautifullArt_${i}.png`, img, {base64: true});

        }

        ZippingFiles_div.style.display="flex"
        content = await zip.generateAsync({type:"blob"})
        let date= new Date()
        saveAs(content, "arts_"+ `${date.toDateString()}-${date.getHours()}:${date.getMinutes()}.zip`);
        ZippingFiles_div.style.display="None"
        resolve('done');



    })

  }

//



  CancelDM.addEventListener('click',()=>{
    renderingMultipleIsTrue=false;
    downloadMultiple_tab.style.display="None";
    blockClickEventsOnPage.style.display="None";
    if(TriggerAnimation.innerText=='Continue animation')TriggerAnimation.click();
  
  });
  