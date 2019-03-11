# Qubit
Notepad templates for the common man

var rect = element.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left)
function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coords = "X coords: " + x + ", Y coords: " + y;
