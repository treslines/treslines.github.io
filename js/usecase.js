class Usecase {
	constructor(){
		this.strName = '';
		this.strNote = '';
		this.strTypeTo = '';
		this.strTypeFrom = '';
		this.strConnection = '';
		this.strNoteBgColor = '';
		this.arrStrAssociations = [];
		this._prototypeStringFormatFunction();
	}

	setTypeFrom(strTypeFrom){
		this.strTypeFrom =  strTypeFrom;
		return this;
	}

	setTypeTo(strTypeTo){
		this.strTypeTo =  strTypeTo;
		return this;
	}

	setName(strName){
		this.strName =  strName;
		return this;
	}

	setNote(strNote){
		this.strNote = strNote;
		return this;
	}

	setNoteBgColor(strNoteBgColor){
		this.strNoteBgColor = strNoteBgColor;
		return this;
	}

	setAssociations(arrStrAssociations){
		this.arrStrAssociations = arrStrAssociations;
		return this;
	}

	setConnection(strConnection){
		this.strConnection = strConnection;
		return this;
	}

	getOutputStr(){

		if(this.strName.trim() === "" || !this._hasArr(this.arrStrAssociations)) return "Type something on the left side!";

		var tag1 = "[";
		var tag2 = "]";
		var tag3 = "(";
		var tag4 = ")";
		var tag5 = "\n";

		// class attributes
		var strFromEnd = "";
		var strFromStart = "";
		var isFromActor = false;
		if(this._hasAttr(this.strTypeFrom) && this.strTypeFrom === "Actor"){
			strFromEnd = tag2;
			strFromStart = tag1
			isFromActor = true;
		}else{
			strFromEnd = tag4;
			strFromStart = tag3
			isFromActor = false;
		}

		var strToEnd = "";
		var strToStart = "";
		var isToActor = false;
		if(this._hasAttr(this.strTypeTo) && this.strTypeTo === "Actor"){
			strToEnd = tag2;
			strToStart = tag1
			isToActor = true;
		}else{
			strToEnd = tag4;
			strToStart = tag3
			isToActor = false;
		}

		

		var strCla = "";
		if(this._hasAttr(this.strConnection)){ 
			if(this.strConnection === "Connection"){
				this.arrStrAssociations.forEach(e => {
					if(e.trim() !== ''){
						strCla+=strFromStart+this.strName+strFromEnd+'-'+strToStart+e.trim()+strToEnd+tag5; 
					}
				});
			}
			else if(this.strConnection === "Inheritance"){
				this.arrStrAssociations.forEach(e => {
					if(e.trim() !== ''){
						strCla+=strFromStart+this.strName+strFromEnd+'^'+strToStart+e.trim()+strToEnd+tag5; 
					}
				});
			}
			else if(this.strConnection === "Extends"){
				this.arrStrAssociations.forEach(e => {
					if(e.trim() !== ''){
						strCla+=strFromStart+this.strName+strFromEnd+'<'+strToStart+e.trim()+strToEnd+tag5; 
					}
				});
			}
			else{
				//Includes
				this.arrStrAssociations.forEach(e => {
					if(e.trim() !== ''){
						strCla+=strFromStart+this.strName+strFromEnd+'>'+strToStart+e.trim()+strToEnd+tag5; 
					}
				});
			}
		}

		// use case notes
		var placeholder = strFromStart+this.strName+strFromEnd+"-(note: {0}{bg:{1}})";
		var strNot = "";
		if(this._hasAttr(this.strNote) && this._hasAttr(this.strNoteBgColor) && this.strNoteBgColor === "Background Color"){ 
			strNot+=(placeholder.format(this.strNote, 'lightcoral') + tag5); 
		}
		if(this._hasAttr(this.strNote) && this._hasAttr(this.strNoteBgColor) && this.strNoteBgColor !== "Background Color"){
			console.log(this.strNote +", "+ this.strNoteBgColor)
			strNot+=(placeholder.format(this.strNote, this.strNoteBgColor) + tag5);
		}
		
		var usecase = strCla;
		if(strNot !== ''){
			usecase = strCla + strNot;
		}
		return usecase.substring(0,usecase.length-1);
	}

	getOutputImageStr(input){
		var img = "http://yuml.me/diagram/scruffy/usecase/{0}"; 
		return img.format(this._replaceAllLineBreaks(input, ', '));
	}

	// private methods
	_replaceAllLineBreaks(input, replacement){
		return input.replace(/[\n\r]/g, replacement)
	}

	_hasAttr(attr){
		return (attr.length !== 0);
	}

	_hasArr(arr){
		return Array.isArray(arr) && arr.length && arr[0] !== "";
	}

	_removeLastChar(str){
		return str.substring(0,str.length-1);
	}

	_prototypeStringFormatFunction(){
	  if (!String.prototype.format) {
	    String.prototype.format = function() {
	      var args = arguments;
	      return this.replace(/{(\d+)}/g, function(match, number) { 
	        return typeof args[number] != 'undefined'
	          ? args[number]
	          : match
	        ;
	      });
	    };
	  }
	}
}