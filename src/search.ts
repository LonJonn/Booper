import Fuse from "fuse.js";
import {
	nodeIsVisible,
	cleanNodeText,
	removeRelatedButtons,
	CleanedElement,
} from "./utils";

/**
 * Will run every mount.
 *
 * Finds all the currently visible button/boop nodes
 */
export function getVisibleNodes(): CleanedElement[] {
	let nodes = [
		...document.querySelectorAll("[role='button']"),
		...document.querySelectorAll("button"),
	];

	// prettier-ignore
	return nodes
		.filter(nodeIsVisible)
		.map(cleanNodeText)
		.reduce(removeRelatedButtons, []);
}

/**
 * Fuzzy search the text content of Elements
 *
 * @param nodes HTML Elements to search through
 * @param query Query to search by
 */
export function search(nodes: CleanedElement[], query: string) {
	const fuse = new Fuse(nodes, {
		keys: ["cleanText"],
		includeScore: true,
		includeMatches: true,
	});

	return fuse.search(query);
}

/**
 * Highlight HTML Elements
 *
 * @param results HTML Element search results
 */
export function applyStyles(results: Fuse.FuseResult<CleanedElement>[]) {
	for (const result of results) {
		const node = result.item;
		node.style.outline = "solid 3px yellow";
	}
}

/**
 * Undo style changes performed on HTML Elements
 * by the `applyStyles` function.
 *
 * @param results HTML Element search results
 */
export function clearStyles(results: Fuse.FuseResult<CleanedElement>[]) {
	for (const result of results) {
		const node = result.item;
		node.style.outline = "";
	}
}
