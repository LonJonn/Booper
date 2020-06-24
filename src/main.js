import Fuse from "fuse.js";

function search(query) {
	let buttonNodes = [...document.querySelectorAll("[role='button']")];

	// prettier-ignore
	const filtered = buttonNodes
		.filter(nodeIsVisible)
		.map(cleanNodeText)
		.reduce(removeRelatedButtons, []);

	const fuse = new Fuse(filtered, {
		keys: ["cleanText"],
		includeScore: true,
		includeMatches: true,
	});
	return fuse.search(query); //.map((result) => result.item);
}
