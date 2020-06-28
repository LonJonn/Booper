import Fuse from "fuse.js";
import { nodeIsVisible, removeRelatedButtons } from "./utils";

/**
 * Will run every mount.
 *
 * Finds all the currently visible button/boop nodes
 */
export function getVisibleNodes(): HTMLElement[] {
	let nodes = [
		...document.querySelectorAll("[role='button']"),
		...document.querySelectorAll("button"),
	];

	// prettier-ignore
	return nodes
		.filter(nodeIsVisible)
		// .map(cleanNodeText)
		.reduce(removeRelatedButtons, []);
}

/**
 * Fuzzy search the text content of Elements
 *
 * @param nodes HTML Elements to search through
 * @param query Query to search by
 */
export function search(nodes: HTMLElement[], query: string) {
	const fuse = new Fuse(nodes, {
		keys: ["textContent"],
		includeScore: true,
		includeMatches: true,
	});

	return fuse.search(query);
}
