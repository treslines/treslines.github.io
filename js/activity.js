class Activity {
	constructor(){
		this.strName = '';
		this.strTypeTo = ''; // start, end, action, object, fork, join, decision
		this.strTypeFrom = '';
		this.strDescription = '';
		this.arrStrAssociations = [];
		this.strDecisionDescription = '';
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

	setDescription(strDescription){
		this.strDescription = strDescription;
		return this;
	}

	setDecisionDescription(strDecisionDescription){
		this.strDecisionDescription = strDecisionDescription;
		return this;
	}

	getOutputStr(){

		if(this.strName.trim() === "" || !this._hasArr(this.arrStrAssociations)) return "Type something on the left side!";

		var tag1 = "[";
		var tag2 = "]";
		var tag3 = "(";
		var tag4 = ")";
		var tag5 = "|";
		var tag6 = "<";
		var tag7 = ">";
		var tag10 = "\n";

		// class attributes
		var strFromEnd = "";
		var strFromStart = "";
		var op1 = '{0}{1}{2}';
		var op2 = '{0}{1}{2}[{3}]';
		var end = "";
		var start = "";
		if(this._hasAttr(this.strTypeFrom) && (this.strTypeFrom === "start" || this.strTypeFrom === "end" || this.strTypeFrom === "action") ){
			strFromEnd = tag4;
			strFromStart = tag3;
			start = op1.format(strFromStart, this.strName, strFromEnd);
		}
		else if(this._hasAttr(this.strTypeFrom) && this.strTypeFrom === "object"){
			strFromEnd = tag2;
			strFromStart = tag1;
			start = op1.format(strFromStart, this.strName, strFromEnd);
		}
		else if(this._hasAttr(this.strTypeFrom) && (this.strTypeFrom === "fork" || this.strTypeFrom === "join") ){
			strFromEnd = tag5;
			strFromStart = tag5;
			start = op1.format(strFromStart, this.strName, strFromEnd);
		}
		else{ // decision
			strFromEnd = tag7;
			strFromStart = tag6;
			start = op2.format(strFromStart, this.strName, strFromEnd, this.strDescription);
		}

		console.log("start: "+ start);

		var strToEnd = "";
		var strToStart = "";
		if(this._hasAttr(this.strTypeFrom) && (this.strTypeFrom === "start" || this.strTypeFrom === "end" || this.strTypeFrom === "action") ){
			strToEnd = tag4;
			strToStart = tag3;
			end = strToStart + '{0}' + strToEnd;
		}
		else if(this._hasAttr(this.strTypeFrom) && this.strTypeFrom === "object"){
			strToEnd = tag2;
			strToStart = tag1;
			end = strToStart + '{0}' + strToEnd;
		}
		else if(this._hasAttr(this.strTypeFrom) && (this.strTypeFrom === "fork" || this.strTypeFrom === "join") ){
			strToEnd = tag5;
			strToStart = tag5;
			end = strToStart + '{0}' + strToEnd;
		}
		else{ // decision
			strToEnd = tag7;
			strToStart = tag6;
			end = strToStart + '{0}' + strToEnd +'[{1}]';
		}

		console.log("end: "+ end);

		var strAss = "";
		var hasAssociations = this._hasArr(this.arrStrAssociations);
		if(hasAssociations){ 
			this.arrStrAssociations.forEach(e => {
				if(e.trim() !== ''){
					strAss+=((start+'->'+end).format(this.strName,e) + tag10);
				}
			});
		}

		console.log("result: "+ strAss);

		return strAss.substring(0,strAss.length-1);
	}

	getOutputImageStr(input){
		var img = "http://yuml.me/diagram/plain/activity/{0}"; 
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