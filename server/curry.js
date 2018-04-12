	function x(a){
		return (b)=>{
			return a+b
		}
	}

	add3 = x(3)
	add4 = x(4)
	addAra = x("Ara")

	let c =  add4(4)
	console.log(c)