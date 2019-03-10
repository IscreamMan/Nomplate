
//rough sketch for now
//1 mounth later...
//dear god no one can read my code and its too late to change anything
document.getElementById("copyClip").addEventListener("click",function()
{
	document.getElementById("docs").select();
	document.execCommand("copy");
})

document.getElementById("clear").addEventListener("click",function()
{
	document.getElementById("docs").select();
	document.execCommand("delete");
	if(document.getElementById("docs").value !="")
	{
		document.execCommand("cut");
	}
})

document.getElementById("template").addEventListener("click",function()
{
	document.getElementById("mngr").style.visibility = "visible";
})

document.getElementById("close").addEventListener("click",function()
{
	document.getElementById("mngr").style.visibility = "hidden";
})

load_wizard();
function load_wizard()
{
	var button = {
		saveButton:document.getElementById("save"),
		titleBin  :document.getElementById("title"),
		noteBin   :document.getElementById("note"),
		screen    :document.getElementById("hold")
	};
	button.saveButton.addEventListener("click",function()
	{
		button.screen.innerHTML+=" <div class='btnWrapper' id='wrapbtn'><button name='"+button.noteBin.value+"'class='t'>"+button.titleBin.value+"</button>"+"<button class='delete'>X</button></div>";
		for(i=0;i<document.getElementsByClassName("t").length;i++)
		{
			document.getElementsByClassName("t")[i].addEventListener("click",handle_wizard);
			document.getElementsByClassName("delete")[i].addEventListener("click",delete_parent);
		}
	});
}

function handle_wizard(e)
{
	var view = document.getElementById("docs");
	view.value += e.target.name+"\n";
	
}

window.onload = function checkHold()
{
	for(i=0;i<document.getElementsByClassName("t").length;i++)
	{
		document.getElementsByClassName("t")[i].addEventListener("click",handle_wizard);
	}
}

function delete_parent(e)
{
	e.target.parentNode.outerHTML = "";
}

