let inputMove = document.getElementById("input-move");
window.addEventListener("keydown", (event) => {
	if (event.defaultPrevented)
		return ;
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
				document.getElementById(`tile-${i}.${j}`).classList.add("wall");
			if (load_map[i][j] == "C")
				document.getElementById(`tile-${i}.${j}`).classList.add("chest");
			if (load_map[i][j] == "E")
				document.getElementById(`tile-${i}.${j}`).classList.add("exit");
			if (load_map[i][j] == "P")
			{
				document.getElementById(`tile-${i}.${j}`).classList.add("hero");
				player_y = i;
				player_x = j;

			}
			else
				document.getElementById(`tile-${i}.${j}`).classList.add("floor");
		}
	}
}

function setTileColor(position, color)
{
	document.getElementById("tile-" + position).style.backgroundColor = color;
}

function setTileClass(position, class_name)
{
	document.getElementById("tile-" + position).classList.add(class_name);
}

function removeTileClass(position, class_name)
{
	document.getElementById("tile-" + position).classList.remove(class_name);
}

function noMoreCollectibles(load_map)
{
	for (let i = 0; i < load_map.length; i++)
	{
		for (let j = 0; j < load_map[i].length; j++)
		{
			if (load_map[i][j] == "C")
				return (0);
		}
	}
	return (1);
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
	if (load_map[new_player_y][new_player_x] == "E" && noMoreCollectibles(load_map) == 0)
	{
		document.getElementById("win").innerHTML = "You left some colletibles STUPID !";
		return ;
	}
	removeTileClass(`${player_y}.${player_x}`, "hero");
	setTileClass(`${player_y}.${player_x}`, "floor");
	load_map[player_y][player_x] = "0";
	player_x = new_player_x;
	player_y = new_player_y;
	inputMove.innerHTML += ` ${player_x}:${player_y}`;

	setTileClass(`${player_y}.${player_x}`, "hero");
	if (load_map[new_player_y][new_player_x] == "C")
		removeTileClass(`${player_y}.${player_x}`, "chest");
	else if (load_map[new_player_y][new_player_x] == "E")
	{
		removeTileClass(`${player_y}.${player_x}`, "exit");
		document.getElementById("win").innerHTML = "YOU WIN";
		document.getElementById("map").style.visibility = "hidden";
	}
}

let player_x = -1;
let player_y = -1;

create_maze(document.getElementById("map"), 10);
set_maze_color(load_map);

console.log(load_map);
