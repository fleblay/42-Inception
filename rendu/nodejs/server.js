const express = require('express');
const app = express();
const fs = require('fs');

let mapArray = [];
mapArray.push(fs.readFileSync("./map_1.txt", "utf-8"));
mapArray.push(fs.readFileSync("./map_2.txt", "utf-8"));
mapArray.push(fs.readFileSync("./map_3.txt", "utf-8"));

function getMap(mapArray)
{
	map = mapArray[Math.floor(Math.random() * 3)];
	map = map.trim("\n").split("\n");
	let split_map = [];

	for (let map_index of map)
		split_map.push(map_index.split(''));

	console.log(split_map);
	return (split_map);
}


app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

app.get('/', (request, response) => {
	response.render('pages/index', {
		test : 'Hello',
		map : JSON.stringify(getMap(mapArray))
		});
});

app.listen(8080);
