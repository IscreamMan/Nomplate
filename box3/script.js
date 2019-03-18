window.onload=function init()
{
	//load main button functions
	//main pipeline
	initStaticButton();
	//map toggle event to both
	//ui button and create template button
	toggleShow("create-template","template-ui");
	toggleShow("hide","template-ui");
	createBtn("save","inner-btn-container");
	addEventButton();
};

function toggleShow(id,target)
{
	var templateBtn = document.getElementById(id);
	var templateUi  = document.getElementById("template-ui");
	templateUi.style.visibility = "hidden";

	templateBtn.addEventListener("click",function()
	{
		/*check if template ui visible
		if not toggle show/hide
		*/
		if(templateUi.style.visibility === "hidden")
		{
			templateUi.style.visibility = "visible";	
		}
		else
		{
			templateUi.style.visibility = "hidden";	
		};
	});
};

function setStaticButton(id,target,command)
{
	/**handle all static
	button event distribution 
	**/	
	var targetElement = document.getElementById(id);
	var textArea      = document.getElementById(target);
	targetElement.addEventListener("click",function()
	{
		/*
		select notes in textArea
		run input field command
		*/
		textArea.select();
		document.execCommand(command);
	});
};

function initStaticButton()
{
	//possible text editor commands
	var command = 
	{
		copy: "copy",
		//mozilla compatability
		delete: typeof InstallTrigger !== 'undefined' ? "cut" : "delete"
	};
	//dom ibutton id container
	var id = 
	{
		copyBtn : "copy-text",
		clearBtn: "clear-text",
		textArea: "main-notepad"
	};
	//map commands to nav buttons
	setStaticButton(id.copyBtn,id.textArea,command.copy);
	setStaticButton(id.clearBtn,id.textArea,command.delete);
};

function createBtn(id,target)
{
	//generates new buttons
	//throws them in a container div onclick
	var inputField = document.getElementById("title");
	var note       = document.getElementById("note");
	var btn        = document.getElementById(id);
	var container  = document.getElementById(target);
	btn.addEventListener("click",function()
	{
		container.innerHTML += " <div class='flex-container beside'>" + "<button class='dynamic-button' note='" + note.value +"'>"
		+ inputField.value + "</button><button class='dynamic-remove-btn delete-btn'>X</button>";
		addEventButton();
		clear(note);
		clear(inputField);
	});
};

function clear(target)
{
	target.value = "";
};

function addEventButton()
{
	//adds event click
	//checks div if empty
	//if not add re-add event to buttons
	//done to ensure event lives even after saving and reopening
	for(i=0;i<document.getElementsByClassName("flex-container").length;i++)
	{
		document.getElementsByClassName("dynamic-button")[i].addEventListener("click",printAttributValue);
		document.getElementsByClassName("dynamic-remove-btn")[i].addEventListener("click",explodeDiv);
	}
};

function printAttributValue(e)
{
	insertAtCaret("main-notepad", e.target.getAttribute("note")) 
};

function insertAtCaret(areaId, text) 
{
  var txtarea = document.getElementById(areaId);
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false));

  if (br == "ie") 
  {
    txtarea.focus();
    var range = txtarea.selection.createRange();
    range.moveStart('character', -txtarea.value.length);
    strPos = range.text.length;
  } 

  else if (br == "ff") 
  {
    strPos = txtarea.selectionStart;
  }

  var front = (txtarea.value).substring(0, strPos);
  var back = (txtarea.value).substring(strPos, txtarea.value.length);
  txtarea.value = front + text + back ;
  strPos = strPos + text.length;

  if (br == "ie") 
  {
    txtarea.focus();
    var ieRange = document.selection.createRange();
    ieRange.moveStart('character\n', -txtarea.value.length);
    ieRange.moveStart('character\n', strPos);
    ieRange.moveEnd('character\n', 0);
    ieRange.select();
  }

  else if (br == "ff") 
  {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }

};


function explodeDiv(e)
{
	//deletes parent div
	e.target.parentNode.outerHTML = "";
};


