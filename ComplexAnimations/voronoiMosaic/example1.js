let fox;
function preload() {
  fox = loadImage('owl3.jpg');
}
function setup() {

	createCanvas(windowWidth, windowHeight);
	noSmooth();
	fox.resize(width,height);
	// colorMode(HSB);
	//Settings for drawing(these are the default values)

	//Set Cell Stroke Weight
	voronoiCellStrokeWeight(1);
	//Set Site Stroke Weight
	voronoiSiteStrokeWeight(0);

	//Sets 30 random sites with 50 minimum distance to be added upon computing
	//Please note that this method is just for testing, you should use your own
	//method for placing random sites with minimum distance
	voronoiRndSites(1500, 25);
 
	//Compute voronoi diagram with size 700 by 500
	//With a prepared jitter structure (true)
	let c=voronoi(width, height, true);

	//Get the raw diagram, for more advanced use
	//This is purely to get information, doesn't change the diagram
	//https://github.com/gorhill/Javascript-Voronoi
		background(150);	
		voronoiDraw(0, 0, true, false);
	
//line 586
}