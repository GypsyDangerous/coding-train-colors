import React, { useState, useEffect } from 'react';
import './App.css';
import colors from './colors.json';
import Color from './Color';

const compliment = color => {
	if(color === "0,0,0")return "255, 255, 255"
	const [r, g, b] = color.split(",").map(Number)
	const nr = Math.max(r,b,g) + Math.min(r,b,g) - r   
	const nb = Math.max(r,b,g) + Math.min(r,b,g) - b
	const ng = Math.max(r,b,g) + Math.min(r,b,g) - g
	return [nr, ng, nb].join(",")
}

const lighten = (color, amount) => {
	const [R, G, B] = color.split(",").map(Number)
	const nr = Math.min(255, R + 255 * amount)
	const ng = Math.min(255, G + 255 * amount)
	const nb = Math.min(255, B + 255 * amount)
	return [nr, ng, nb].join(",")
}

const getColor = color => {
	const brightness = color.split(",").map(Number).reduce((acc, cur) => acc+cur)/3
	return brightness > 127 ? "black" : "white"
}

function App() {
	const [ displayColors, setDisplayColors ] = useState([]);
	const [backgroundColor, setBackgroundColor] = useState("")

	console.log(`rgb(${compliment(backgroundColor)})`)

	useEffect(() => {
		setDisplayColors(colors.hex.map((c, i) => {
			return [c, c.slice(1).match(/../g).map(n => parseInt(n, 16)).join(',')]
		}));
	}, []);

	useEffect(() => {
		document.getElementById("root").style.background = `rgb(${(backgroundColor)})`
	}, [backgroundColor])

	return (
		<main className="App" style={{
			// background: `rgb(${(backgroundColor)})`,
			color: `${getColor((backgroundColor))}`
		}}>
			{displayColors.sort(([, rgb], [, rgb1]) => rgb1.split(",").map(Number).reduce((acc, cur) => acc + cur) > rgb.split(",").map(Number).reduce((acc, cur) => acc+cur) ? -1 : 1).map((color) => (
				<Color setBackgroundColor={setBackgroundColor} displayColor={color[0]} color={color} />
			))}
		</main>
	)
}

export default App;
