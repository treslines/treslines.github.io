class Usecase {
	constructor(){
		this.strName = '';
		this.strTypeTo = '';
		this.strTypeFrom = '';
		this.strConnection = '';
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
					strCla+=strFromStart+this.strName+strFromEnd+'-'+strToStart+e.trim()+strToEnd+tag5; 
				});
			}
			else if(this.strConnection === "Inheritance"){
				this.arrStrAssociations.forEach(e => {
					strCla+=strFromStart+this.strName+strFromEnd+'^'+strToStart+e.trim()+strToEnd+tag5; 
				});
			}
			else if(this.strConnection === "Extends"){
				this.arrStrAssociations.forEach(e => {
					strCla+=strFromStart+this.strName+strFromEnd+'<'+strToStart+e.trim()+strToEnd+tag5; 
				});
			}
			else{
				//Includes
				this.arrStrAssociations.forEach(e => {
					strCla+=strFromStart+this.strName+strFromEnd+'>'+strToStart+e.trim()+strToEnd+tag5; 
				});
			}
		}
		
		return strCla.substring(0,strCla.length-1);
	}


	// private methods
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