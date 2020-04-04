function onload()
{
  // define split pane separators
	dragElement( document.getElementById("seperator1"), "H" );
}

// function is used for dragging and moving
function dragElement( element, direction, handler )
{
  // Two variables for tracking positions of the cursor
  const drag = { x : 0, y : 0 };
  const delta = { x : 0, y : 0 };
  /* if present, the handler is where you move the DIV from
  otherwise, move the DIV from anywhere inside the DIV */
  handler ? ( handler.onmousedown = dragMouseDown ): ( element.onmousedown = dragMouseDown );

  // function that will be called whenever the down event of the mouse is raised
  function dragMouseDown( e )
  {
    drag.x = e.clientX;
    drag.y = e.clientY;
    document.onmousemove = onMouseMove;
    document.onmouseup = () => { document.onmousemove = document.onmouseup = null; }
  }

  // function that will be called whenever the up event of the mouse is raised
  function onMouseMove( e )
  {
    const currentX = e.clientX;
    const currentY = e.clientY;

    delta.x = currentX - drag.x;
    delta.y = currentY - drag.y;

    const offsetLeft = element.offsetLeft;
    const offsetTop = element.offsetTop;

	
	const first = document.getElementById("first");
	const second = document.getElementById("second");
	let firstWidth = first.offsetWidth;
	let secondWidth = second.offsetWidth;
  if (direction === "H" ) // Horizontal
	{
		element.style.left = offsetLeft + delta.x + "px";
		firstWidth += delta.x;
		secondWidth -= delta.x;
	}
    drag.x = currentX;
    drag.y = currentY;
	first.style.width = firstWidth + "px";
	second.style.width = secondWidth + "px";
  }
}

function onSwap(){

  var swap = document.getElementById("cla").value;
  document.getElementById("cla").value = document.getElementById("inh").value;
  document.getElementById("inh").value = swap;
}

function onClear(){
  document.getElementById("cla").value = "";
  document.getElementById("not").value = "";
  document.getElementById("ste").value = "";
  document.getElementById("bg").value = "Background Color";
  document.getElementById("notbg").value = "Background Color";
  document.getElementById("att").value = "";
  document.getElementById("met").value = "";
  document.getElementById("agg").value = "";
  document.getElementById("ass").value = "";
  document.getElementById("com").value = "";
  document.getElementById("inh").value = "";
}

function onAppend(){
  let clazz = new Clazz();
  document.getElementById("yumlId").value = 'class';
  let toAppend = clazz.setName(document.getElementById("cla").value).
    setStereotype(document.getElementById("ste").value).
    setNote(document.getElementById("not").value).
    setNoteBgColor(document.getElementById("notbg").value).
    setBgColor(document.getElementById("bg").value).
    setAttributes(document.getElementById("att").value.split(",")).
    setMethods(document.getElementById("met").value.split(",")).
    setAggregates(document.getElementById("agg").value.split(",")).
    setAssociations(document.getElementById("ass").value.split(",")).
    setCompositions(document.getElementById("com").value.split(",")).
    setInheritances(document.getElementById("inh").value.split(",")).
    getOutputStr();
    if(document.getElementById("outTxt").value !== "Type something on the left side!"){
         var newAppended = document.getElementById("outTxt").value + toAppend;
         document.getElementById("outTxt").value = newAppended;
         document.getElementById("imgId").src = clazz.getOutputImageStr(newAppended);
    }
}

function onAppendArea(){ 
  if(!document.getElementById("outTxt").value.includes("Type something on the left side!")){
         if(document.getElementById("yumlId").value === 'class'){
           let clazz = new Clazz();
           var newAppended = document.getElementById("outTxt").value;
           document.getElementById("imgId").src = clazz.getOutputImageStr(newAppended);
         }else if(document.getElementById("yumlId").value === 'usecase'){
           let usecase = new Usecase();
           var newAppended = document.getElementById("outTxt").value;
           document.getElementById("imgId").src = usecase.getOutputImageStr(newAppended);
         }else{
           // TODO: Activity
           //let activity = new Activity();
           //var newAppended = document.getElementById("outTxt").value;
           //document.getElementById("imgId").src = activity.getOutputImageStr(newAppended);
         }
    }
}

function onClearUse(){
  document.getElementById("use1").value = "";
  document.getElementById("use2").value = "Connection";
  document.getElementById("usenot").value = "";
  document.getElementById("usenotbg").value = "Background Color";
  document.getElementById("typ1").value = "Actor";
  document.getElementById("typ2").value = "Actor";
  document.getElementById("use3").value = "";
}

function onSwapUse(){
    var swap = document.getElementById("use1").value;
    document.getElementById("use1").value = document.getElementById("use3").value;
    document.getElementById("use3").value = swap;
}

function onGenerateUse(){
  let usecase = new Usecase();
  document.getElementById("yumlId").value = 'usecase';
  let toAppend = usecase.setName(document.getElementById("use1").value).
    setConnection(document.getElementById("use2").value).
    setAssociations(document.getElementById("use3").value.split(",")).
    setNote(document.getElementById("usenot").value).
    setNoteBgColor(document.getElementById("usenotbg").value).
    setTypeFrom(document.getElementById("typ1").value).
    setTypeTo(document.getElementById("typ2").value).
    getOutputStr();
    if(toAppend === "Type something on the left side!"){
      document.getElementById("outTxt").value = "Type something on the left side!";
    }
    else{
        if(document.getElementById("outTxt").value.includes("Type something on the left side!")){
          document.getElementById("outTxt").value = toAppend;
          document.getElementById("imgId").src = usecase.getOutputImageStr(toAppend);
        }else if(document.getElementById("outTxt").value.trim() === ""){
          document.getElementById("outTxt").value = toAppend;
          document.getElementById("imgId").src = usecase.getOutputImageStr(toAppend);
        }else{
          var newAppended = document.getElementById("outTxt").value + "\n"+ toAppend;
          document.getElementById("outTxt").value = newAppended;
          document.getElementById("imgId").src = usecase.getOutputImageStr(newAppended);
        }
    }
}

function onClearArea(){
  document.getElementById("outTxt").value = "";
}

function copy() {
  let textarea = document.getElementById("outTxt");
  textarea.select();
  document.execCommand("copy");
}

