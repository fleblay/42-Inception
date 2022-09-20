let inputMove = document.getElementById("input-move");
window.addEventListener("keydown", (event) => {
	if (event.defaultPrevented)
		return ;
	/*
	setTileColor(`${player_y}.${player_x}`, "white");
	switch (event.key){
		case "ArrowDown":
			player_y += player_y < 9 ? 1 : 0;
			inputMove.innerHTML = "DOWN";
			break;
		case "ArrowUp":
			player_y -= player_y > 0 ? 1 : 0;
			inputMove.innerHTML = "UP";
			break;
		case "ArrowLeft":
			player_x -= player_x > 0 ? 1 : 0;
			inputMove.innerHTML = "LEFT";
			break;
		case "ArrowRight":
			player_x += player_x < 9 ? 1 : 0;
			inputMove.innerHTML = "RIGHT";
			break;
		default :
			return;
	}
	inputMove.innerHTML += ` ${player_x}:${player_y}`;
	setTileColor(`${player_y}.${player_x}`, "red");
	*/
	tryMove(event.key);
	event.preventDefault();
}, true);

let map_tile_id = [];
for (let i = 0; i < 10; i++)
{
	for (let j = 0; j < 10; j++)
	{
		let str = i.toString() +  "." +  j.toString();
		map_tile_id.push(str);
	}
}

function create_maze(table_elem, size)
{
	for (let i = 0; i < size; i++)
	{
		let row = document.createElement("tr");
		row.setAttribute("id", "row-" + i.toString());
		table_elem.appendChild(row);
		for (let j = 0; j < size; j++)
		{
			let col = document.createElement("td");
			col.setAttribute("id", "tile-" + i.toString() + "." + j.toString());
			row.appendChild(col);
		}
	}

}

function set_maze_color(load_map)
{
	for (let i = 0; i < load_map.length; i++)
	{
		for (let j = 0; j < load_map[i].length; j++)
		{
			if (load_map[i][j] == "1")
				document.getElementById(`tile-${i}.${j}`).style.backgroundColor = "black";
		}
	}
}

function setTileColor(position, color)
{
	document.getElementById("tile-" + position).style.backgroundColor = color;
}

function tryMove(move)
{
	let new_player_x = player_x;
	let new_player_y = player_y;
	switch (move){
		case "ArrowDown":
			new_player_y += 1;
			inputMove.innerHTML = "DOWN";
			break;
		case "ArrowUp":
			new_player_y -= 1;
			inputMove.innerHTML = "UP";
			break;
		case "ArrowLeft":
			new_player_x -= 1;
			inputMove.innerHTML = "LEFT";
			break;
		case "ArrowRight":
			new_player_x += 1;
			inputMove.innerHTML = "RIGHT";
			break;
		default:
			return ;
	}
	if (new_player_x < 0
		|| new_player_x > 9
		|| new_player_y < 0
		|| new_player_y > 9
		|| load_map[new_player_y][new_player_x] == "1")
		return ;
	setTileColor(`${player_y}.${player_x}`, "white");
	player_x = new_player_x;
	player_y = new_player_y;
	inputMove.innerHTML += ` ${player_x}:${player_y}`;
	setTileColor(`${player_y}.${player_x}`, "red");
}

let player_x = 5;
let player_y = 5;

create_maze(document.getElementById("map"), 10);
set_maze_color(load_map);
setTileColor(`${player_y}.${player_x}`, "red");

console.log(load_map);
