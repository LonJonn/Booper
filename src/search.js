import Fuse from "fuse.js";
console.log(Fuse, "hehe");

let results = [];

let buttonNodes = [...document.querySelectorAll("[role='button']")];

// This runs every mount
// prettier-ignore
const filtered = buttonNodes
	.filter(nodeIsVisible)
	.map(cleanNodeText)
	.reduce(removeRelatedButtons, []);

function search(query) {
	const fuse = new Fuse(filtered, {
		keys: ["cleanText"],
		includeScore: true,
		includeMatches: true,
	});

	return fuse.search(query);
}

function onInputChange(e) {
	resetResults();

	results = search(e.target.value);
	for (result of results) {
		const node = result.item;
		node.style.outline = "solid 3px yellow";
	}
}

function resetResults() {
	for (result of results) {
		const node = result.item;
		node.style.outline = "";
	}

	results = [];
}
