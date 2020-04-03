class Clazz {
	constructor(){
		this.strName = '';
		this.strStereotype = '';
		this.strRefLabel = '';
		this.strNote = '';
		this.strBgColor = '';
		this.arrStrAttributes = [];
		this.arrStrMethods = [];
		this.arrStrAggregates = [];
		this.arrStrAssociations = [];
		this.arrStrCompositions = [];
		this.arrStrInheritances = [];
		this._prototypeStringFormatFunction();
	}

	setName(strName){
		this.strName =  strName;
		return this;
	}

	setStereotype(strStereotype){
		this.strStereotype = strStereotype;
		return this;
	}

	setRefLabel(strRefLabel){
		this.strRefLabel = strRefLabel;
		return this;
	}

	setNote(strNote){
		this.strNote = strNote;
		return this;
	}

	setBgColor(strBgColor){
		this.strBgColor = strBgColor;
		return this;
	}

	setAttributes(arrStrAttributes){
		this.arrStrAttributes = arrStrAttributes;
		return this;
	}

	setMethods(arrStrMethods){
		this.arrStrMethods = arrStrMethods;
		return this;
	}

	setAggregates(arrStrAggregates){
		this.arrStrAggregates = arrStrAggregates;
		return this;
	}

	setAssociations(arrStrAssociations){
		this.arrStrAssociations = arrStrAssociations;
		return this;
	}

	setCompositions(arrStrCompositions){
		this.arrStrCompositions = arrStrCompositions;
		return this;
	}

	setInheritances(arrStrInheritances){
		this.arrStrInheritances = arrStrInheritances;
		return this;
	}

	getOutputStr(){

		if(this.strName == "") return "Type something on the left side!";

		var tag1 = "[";
		var tag2 = "]";
		var tag3 = "|";
		var tag4 = ";";
		var tag5 = "\n";

		// class attributes
		var strCla = tag1;
		if(this._hasAttr(this.strStereotype)){ 
			strCla+=('<<{0}>>;'.format(this.strStereotype)); 
		}
		strCla+=this.strName;
		if(this._hasAttr(this.strBgColor) && this.strBgColor === "Background Color"){ 
			strCla+='{bg:{0}}'.format("wheat");
		}else{
			strCla+='{bg:{0}}'.format(this.strBgColor);
		}

		var hasAttributes = this._hasArr(this.arrStrAttributes);
		if(hasAttributes){ 
			strCla+=tag3;
			this.arrStrAttributes.forEach(e => {
				strCla+=(e+tag4);
			});
		}
		if(hasAttributes) { strCla = this._removeLastChar(strCla); }

		var hasMethods = this._hasArr(this.arrStrMethods);
		if(hasMethods){ 
			strCla+=tag3;
			this.arrStrMethods.forEach(e => {
				strCla+=(e+tag4);
			});
		}
		if(hasMethods) { strCla = this._removeLastChar(strCla); }
		strCla+=tag2+tag5;


		// class notes
		var strNot = "";
		if(this._hasAttr(this.strNote)){ 
			strNot+=('[{0}]-.-[note: {1}]'.format(this.strName, this.strNote) + tag5); 
		}


		// class associations
		var strAss = "";
		var hasAssociations = this._hasArr(this.arrStrAssociations);
		if(hasAssociations){ 
			this.arrStrAssociations.forEach(e => {
				strAss+=('[{0}]->[{1}]'.format(this.strName,e) + tag5);
			});
		}

		// class aggregations
		var strAgg = "";
		var hasAggretations = this._hasArr(this.arrStrAggregates);
		if(hasAggretations){ 
			this.arrStrAggregates.forEach(e => {
				strAgg+=('[{0}]<>->[{1}]'.format(this.strName,e) + tag5);
			});
		}

		// class compositions
		var strCom = "";
		var hasCompositions = this._hasArr(this.arrStrCompositions);
		if(hasCompositions){ 
			this.arrStrCompositions.forEach(e => {
				strCom+=('[{0}]++->[{1}]'.format(this.strName,e) + tag5);
			});
		}

		// class inheritances
		var strInh = "";
		var hasInheritances = this._hasArr(this.arrStrInheritances);
		if(hasInheritances){ 
			this.arrStrInheritances.forEach(e => {
				strInh+=('[{1}]^[{0}]'.format(this.strName,e) + tag5);
			});
		}

		return strCla + strNot + strAss + strAgg + strCom + strInh;
		//return this.getOutputImageStr((strCla + strNot + strAss + strAgg + strCom + strInh));
	}

	getOutputImageStr(input){
		var img = "http://yuml.me/diagram/scruffy/class/{0}"; 
		return img.format(this._replaceAllLineBreaks(input, ', '));
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

	_replaceAllLineBreaks(input, replacement){
		return input.replace(/[\n\r]/g, replacement)
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