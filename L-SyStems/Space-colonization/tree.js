class Tree{
	constructor(){
		this.leaves=[];
		this.branches=[];
		for(let i=0;i<500;i++)
			this.leaves.push(new Leaf());
		let dir=createVector(0,-1);
		let root= new Branch(null,createVector(width/2,height/2),dir );
	branches.push(root);
	}
	show(){
		for(let l of this.leaves){
			l.show();

		}
	}
}