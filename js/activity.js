class Activity {
	constructor(){
		this.arrNames = [];
		this.strTypeTo = ''; 
		this.strTypeFrom = '';
		this.strDecisionIdFrom = '';
		this.arrStrAssociations = [];
		this.strDecisionIdTo = '';
		this._prototypeStringFormatFunction();
		this.intCountDecisionIdFrom = 0;
		this.intCountDecisionIdTo = 0;
		this.strDecisionIdFrom = '';
		this.strDecisionIdTo = '';
		this.strDecFrom = '';
		this.strDecTo = '';
		this.strDecId = '';
		this.strDecWhat = '';
		this.strDecTypeTo = '';
		this.strDecTypeFrom = '';
	}

	setDecTypeFrom(strDecTypeFrom){
		this.strDecTypeFrom =  strDecTypeFrom;
		return this;
	}
	setDecTypeTo(strDecTypeTo){
		this.strDecTypeTo =  strDecTypeTo;
		return this;
	}

	setDecFrom(strDecFrom){
		this.strDecFrom =  strDecFrom;
		return this;
	}

	setDecTo(strDecTo){
		this.strDecTo =  strDecTo;
		return this;
	}

	setDecId(strDecId){
		this.strDecId =  strDecId;
		return this;
	}

	setDecWhat(strDecWhat){
		this.strDecWhat =  strDecWhat;
		return this;
	}

	getDecisionCountFrom(){
		var id = 'dF' + this.intCountDecisionIdFrom;
		this.intCountDecisionIdFrom++;
		return id;
	}

	getDecisionCountTo(){
		var id = 'dT' + this.intCountDecisionIdTo;
		this.intCountDecisionIdTo++;
		return id;
	}

	setTypeFrom(strTypeFrom){
		this.strTypeFrom =  strTypeFrom;
		return this;
	}

	setTypeTo(strTypeTo){
		this.strTypeTo =  strTypeTo;
		return this;
	}

	setArrNames(arrNames){
		this.arrNames =  arrNames;
		return this;
	}

	setAssociations(arrStrAssociations){
		this.arrStrAssociations = arrStrAssociations;
		return this;
	}

	setDecisionIdFrom(strDecisionIdFrom){
		this.strDecisionIdFrom = strDecisionIdFrom;
		return this;
	}

	setDecisionIdTo(strDecisionIdTo){
		this.strDecisionIdTo = strDecisionIdTo;
		return this;
	}

	getOutputStr(){

		if( this.strTypeFrom.trim() === "start" || this.strTypeFrom.trim() === "end" ) {
			this.arrNames.push(this.strTypeFrom);
		}
		if( this.strTypeTo.trim() === "start" || this.strTypeTo.trim() === "end" ) {
			this.arrStrAssociations.push(this.strTypeTo);
		}

		if(!this._hasArr(this.arrNames) || !this._hasArr(this.arrStrAssociations)) return "Type something on the left side!";

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
		var end = [];
		var start = [];
		if(this._hasAttr(this.strTypeFrom) && (this.strTypeFrom === "start" || this.strTypeFrom === "end" || this.strTypeFrom === "action") ){
			strFromEnd = tag4;
			strFromStart = tag3;
			
			if(this.strTypeFrom === "start" || this.strTypeFrom === "end") {
				start.push(op1.format(strFromStart, this.strTypeFrom, strFromEnd));
			}else{
				this.arrNames.forEach(e => {
					if(e.trim() !== ''){
						start.push(op1.format(strFromStart, e.trim(), strFromEnd));
					}
				});
			}
		}
		else if(this._hasAttr(this.strTypeFrom) && this.strTypeFrom === "object"){
			strFromEnd = tag2;
			strFromStart = tag1;
			this.arrNames.forEach(e => {
				if(e.trim() !== ''){
					start.push(op1.format(strFromStart, e.trim(), strFromEnd));
				}
			});
		}
		else if(this._hasAttr(this.strTypeFrom) && (this.strTypeFrom === "fork" || this.strTypeFrom === "join") ){
			strFromEnd = tag5;
			strFromStart = tag5;
			this.arrNames.forEach(e => {
				if(e.trim() !== ''){
					start.push(op1.format(strFromStart, e.trim(), strFromEnd));
				}
			});
		}

		var strToEnd = "";
		var strToStart = "";
		if(this._hasAttr(this.strTypeTo) && (this.strTypeTo === "start" || this.strTypeTo === "end" || this.strTypeTo === "action") ){
			strToEnd = tag4;
			strToStart = tag3;
			if(this.strTypeTo === "start" || this.strTypeTo === "end") {
				end.push(strToStart + this.strTypeTo + strToEnd);
			}else{
				this.arrStrAssociations.forEach(e => {
					if(e.trim() !== ''){
						end.push(strToStart + e.trim() + strToEnd);
					}
				});
			}
		}
		else if(this._hasAttr(this.strTypeTo) && this.strTypeTo === "object"){
			strToEnd = tag2;
			strToStart = tag1;
			this.arrStrAssociations.forEach(e => {
				if(e.trim() !== ''){
					end.push(strToStart + e.trim() + strToEnd);
				}
			});
		}
		else if(this._hasAttr(this.strTypeTo) && (this.strTypeTo === "fork" || this.strTypeTo === "join") ){
			strToEnd = tag5;
			strToStart = tag5;
			this.arrStrAssociations.forEach(e => {
				if(e.trim() !== ''){
					end.push(strToStart + e.trim() + strToEnd);
				}
			});
		}

		var strAss = "";
		start.forEach(s => {
			if(s.trim() !== ''){
				end.forEach(e => {
					if(e.trim() !== ''){
						strAss+=(s +'->'+ e + tag10);
					}
				});
			}
		});

		this._clear();
		return strAss.substring(0,strAss.length-1);
	}

	getOutputStrDec(){

		if( this.strDecTypeFrom.trim() === "start" || this.strTypeFrom.trim() === "end" ) {
			this.strDecFrom = this.strDecTypeFrom;
		}
		if( this.strDecTypeTo.trim() === "start" || this.strDecTypeTo.trim() === "end" ) {
			this.strDecTo = this.strDecTypeTo;
		}

		if(this.strDecFrom === "" || this.strDecTo === "" || this.strDecId === "" || this.strDecWhat === "") return "";

		var tag1 = "[";
		var tag2 = "]";
		var tag3 = "(";
		var tag4 = ")";
		var tag5 = "|";
		var tag10 = "\n";

		var start1 = '';
		var start2 = '';
		if( (this.strDecTypeFrom === "start" || this.strDecTypeFrom === "end" || this.strDecTypeFrom === "action") ){
			start2 = tag4;
			start1 = tag3;
		}
		else if( this.strDecTypeFrom === "object"){
			start2 = tag2;
			start1 = tag1;
		}
		else if( (this.strDecTypeFrom === "fork" || this.strDecTypeFrom === "join") ){
			start2 = tag5;
			start1 = tag5;
		}

		var end1 = '';
		var end2 = '';
		if( (this.strDecTypeTo === "start" || this.strDecTypeTo === "end" || this.strDecTypeTo === "action") ){
			end2 = tag4;
			end1 = tag3;
		}
		else if( this.strDecTypeTo === "object"){
			end2 = tag2;
			end1 = tag1;
		}
		else if( (this.strDecTypeTo === "fork" || this.strDecTypeTo === "join") ){
			end2 = tag5;
			end1 = tag5;
		}

		var output = (start1+'{0}'+start2+'-><{1}>[{2}]->'+end1+'{3}'+end2).format(this.strDecFrom,this.strDecId,this.strDecWhat,this.strDecTo);
		this._clear();
		return output;
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
		var has = false;
		for (var i = arr.length - 1; i >= 0; i--) {
			if(arr[i].trim() !== ''){
				has = true;
				break;
			}
		}
		return Array.isArray(arr) && arr.length && has;
	}

	_removeLastChar(str){
		return str.substring(0,str.length-1);
	}

	_clear(){
		this.arrNames = [];
		this.strTypeTo = '';
		this.strTypeFrom = '';
		this.strDecisionIdFrom = '';
		this.arrStrAssociations = [];
		this.strDecisionIdTo = '';
		this.strDecisionIdFrom = '';
		this.strDecisionIdTo = '';
		this.strDecFrom = '';
		this.strDecTo = '';
		this.strDecId = '';
		this.strDecWhat = '';
		this.strDecTypeTo = '';
		this.strDecTypeFrom = '';
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