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

function onGenerate(){
  let clazz = new Clazz();

  document.getElementById("outTxt").value = clazz.setName(document.getElementById("cla").value).
    setStereotype(document.getElementById("ste").value).
    setBgColor(document.getElementById("bg").value).
    setAttributes(document.getElementById("att").value.split(",")).
    setMethods(document.getElementById("met").value.split(",")).
    setAggregates(document.getElementById("agg").value.split(",")).
    setAssociations(document.getElementById("ass").value.split(",")).
    setCompositions(document.getElementById("com").value.split(",")).
    setInheritances(document.getElementById("inh").value.split(",")).
    getOutputStr();

}

function onClear(){
  document.getElementById("outTxt").value = "Type something on the left side!";
  document.getElementById("cla").value = "";
  document.getElementById("ste").value = "";
  document.getElementById("bg").value = "Background Color";
  document.getElementById("att").value = "";
  document.getElementById("met").value = "";
  document.getElementById("agg").value = "";
  document.getElementById("ass").value = "";
  document.getElementById("com").value = "";
  document.getElementById("inh").value = "";
}

