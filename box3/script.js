
//rough sketch for now
document.getElementById("copyClip").addEventListener("click",function()
{
	document.getElementById("docs").select();
	document.execCommand("copy");
})

document.getElementById("clear").addEventListener("click",function()
{
	document.getElementById("docs").value = "";
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
		button.screen.innerHTML+="<button name='"+button.noteBin.value+"'class='t'>"+button.titleBin.value+"</button>";
		for(i=0;i<document.getElementsByClassName("t").length;i++)
		{
			document.getElementsByClassName("t")[i].addEventListener("click",handle_wizard);
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