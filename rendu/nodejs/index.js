let elemToReplace = document.getElementById("my-content");
window.addEventListener("keydown", (event) => {
	if (event.defaultPrevented)
		return ;
	switch (event.key){
		case "ArrowDown":
			elemToReplace.innerHTML = "DOWN";
			break;
		case "ArrowUp":
			elemToReplace.innerHTML = "UP";
			break;
		case "ArrowLeft":
			elemToReplace.innerHTML = "LEFT";
			break;
		case "ArrowRight":
			elemToReplace.innerHTML = "RIGHT";
			break;
		default :
			return;
	}
	event.preventDefault();
}, true);
