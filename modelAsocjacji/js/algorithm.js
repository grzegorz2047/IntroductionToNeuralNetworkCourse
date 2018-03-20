	function createWeightsMatrix() {
		let length = 25;
		let w = new Array(length);
		
		for(let i = 0; i < length; i++) {
			w[i] = new Array(length);
			for(let j = 0; j < length; j++) {
				w[i][j] = -1.0;
			}
		}
		return w;
	}
	
	function calculateWeightsMatrix(w, z0, z1) {
		let length = 25;
		for(let i = 0; i < length; i++) {
			for(let j = 0; j < length; j++) {
				w[i][j] = 1/length * (z0[i] * z0[j] + z1[i] * z1[j]);
			}
		}
		return w;
	}

	function sgn(x) {
		if(x >= 0) {
			return 1.0;
		} else {
			return -1.0;
		}
	}
	
	function multiplyMatrixWithVector(matrix, vector){
		let newVecU = [];
		let yval = 0.0;
		let length = 25;
		for(let i = 0; i < length; i++) {
			for(let j = 0; j < length; j++) {
				yval += matrix[i][j] * vector[j];
			}
			newVecU.push(yval);
			console.log(yval);
			yval = 0.0;
		}
		return newVecU;
	}
	
	function F(w, u) {
		let newVecU = [];
		newVecU = multiplyMatrixWithVector(w,u);
		newVecU = SGN(newVecU);
		return newVecU;
	}

	function SGN(x) {
		let output = []; 
		for (let i = 0; i < 25; i++) {
			output.push(sgn(x[i]));
		}
		return output;
	}
	
	function display(array) {
		let length = array.length;
		let rownum = 0;
		let dark = "&#9724;";
		let white = "&#9723;";

		$("#rows").append('<tr>');
		for (let i = 0; i < length; i++) {
			if(i % 5 == 0) {
				$("#rows").append('</tr>');
				$("#rows").append('<tr>');
			} 
			if(array[i] == 1.0) {
				$("#rows").append('<td>' + dark  + '</td>');
			}else {
				$("#rows").append('<td>' + white + '</td>');
			}
		}
		$("#rows").append("<br>");
	}
	
	
	$(document).ready(function(){
		let z0 = [
		-1.0, -1.0, -1.0, -1.0, -1.0,
		-1.0,  1.0,  1.0,  1.0, -1.0, 
		-1.0,  1.0, -1.0,  1.0, -1.0, 
		-1.0,  1.0,  1.0,  1.0, -1.0, 
		-1.0, -1.0, -1.0, -1.0, -1.0
		];
		
		let z1 = [
		-1.0, -1.0, -1.0, -1.0, -1.0,
		-1.0,  1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0,
		];

		let z0prim = [
		-1.0,  1.0,  1.0,  1.0, -1.0,
		-1.0,  1.0, -1.0,  1.0, -1.0, 
		-1.0,  1.0, -1.0,  1.0, -1.0, 
		-1.0,  1.0,  1.0,  1.0, -1.0, 
		-1.0, -1.0, -1.0, -1.0, -1.0
		];
		
		let z1prim = [
		-1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0, -1.0, -1.0,
		];

		
		display(z0);
		display(z1);
		display(z0prim);
		display(z1prim);
		w = createWeightsMatrix();
		w = calculateWeightsMatrix(w, z0, z1);	
		$("#rows").append('<br>');
		$("#rows").append('<h1>Zaburzone</h1>');
		$("#rows").append('<br>');
		result = F(w, z0prim);
		display(result);
		
		result = F(w, z1prim);
		display(result);
		$("#but").click(function() {
			display(z0);
			display(z1);
		});

	});