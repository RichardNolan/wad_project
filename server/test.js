
function next(){
	console.log("NEXT")
}
function next2(){
	console.log("next2")
}

function first(a,b){
	console.log(a)
	b();
}

first(1, next)
first(2, next2)