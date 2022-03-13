let fox;
let pink;
function preload() {
   fox = loadImage('8.jpg');
}
// function setup(){
// 	createCanvas(windowWidth,windowHeight)
// 	background(51);
// 	fox.filter(GRAY)
// 	fox.filter(BLUR,0.5)
// 	let d = pixelDensity();
//   	// let fox_size = width*height*d*d;
//   	imageMode(CENTER)
// 	image(fox,width/2,height/2,width,height);
// 	loadPixels();
// 	for(let i=0;i<=pixels.length;i+=4){
// 		if(pixels[i]==51){
// 			pixels[i]=255;
// 			pixels[i+1]=255;
// 			pixels[i+2]=255;
// 			pixels[i+3]=255;


// 		}
// 		else if(pixels[i]<50){
// 			pixels[i]=255;
// 			pixels[i+1]=255;
// 			pixels[i+2]=255;
// 			pixels[i+3]=255;

// 		}
// 		else if(pixels[i]<150){ //orange
// 			pixels[i]=map(i,0,pixels.length,0,245);
// 			pixels[i+1]=map(i,0,pixels.length,125,175);
// 			pixels[i+2]=map(i,0,pixels.length,175,0);
// 			pixels[i+3]=250;
// 		}
// 		else if(pixels[i]<255){
// 			pixels[i]=255;
// 			pixels[i+1]=255;
// 			pixels[i+2]=255;
// 			pixels[i+3]=255;
// 		}
// 	}
// 	updatePixels();
// }



/*

750*x=width
*/
//ratio 750 500

// linear-gradient(to right, rgb(241, 39, 17), rgb(245, 175, 25))


//blue-ish background
function setup(){
	createCanvas(windowWidth,windowHeight)
	background(51);
	fox.filter(GRAY)
	fox.filter(BLUR,0.5)
	let d = pixelDensity();
  	// let fox_size = width*height*d*d;
  	imageMode(CENTER)
	image(fox,width/2,height/2,width,height);
	loadPixels();
	for(let i=0;i<=pixels.length;i+=4){
		if(pixels[i]<50){
			pixels[i]=0;
			pixels[i+1]=0;
			pixels[i+2]=60;
			pixels[i+3]=255;

		}
		else if(pixels[i]<150){ //orange
			pixels[i]=map(i,0,pixels.length,0,245);
			pixels[i+1]=map(i,0,pixels.length,125,175);
			pixels[i+2]=map(i,0,pixels.length,175,0);
			pixels[i+3]=250;
		}
		else if(pixels[i]<255){
			pixels[i]=20;
			pixels[i+1]=20;
			pixels[i+2]=60;
			pixels[i+3]=255;
		}
	}
	updatePixels();
}

// orange black

// function setup(){
// 	createCanvas(windowWidth,windowHeight)
// 	background(51);
// 	fox.filter(GRAY)
// 	fox.filter(BLUR,0.5)
// 	let d = pixelDensity();
//   	// let fox_size = width*height*d*d;
//   	imageMode(CENTER)
// 	image(fox,width/2,height/2,width,height);
// 	loadPixels();
// 	for(let i=0;i<=pixels.length;i+=4){
// 		if(pixels[i]==51){
// 			pixels[i]=0;
// 			pixels[i+1]=0;
// 			pixels[i+2]=0;
// 			pixels[i+3]=255;


// 		}
// 		else if(pixels[i]<50){
// 			pixels[i]=0;
// 			pixels[i+1]=0;
// 			pixels[i+2]=0;
// 			pixels[i+3]=255;

// 		}
// 		else if(pixels[i]<150){ //orange
// 			pixels[i]=245
// 			pixels[i+1]=120;
// 			pixels[i+2]=60;
// 			pixels[i+3]=250;
// 		}
// 		else if(pixels[i]<255){
// 			pixels[i]=0;
// 			pixels[i+1]=0;
// 			pixels[i+2]=0;
// 			pixels[i+3]=255;
// 		}
// 	}
// 	updatePixels();
// }
