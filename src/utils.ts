/**
 * A modified interface that extends the generic `HTMLElement`
 * interface to include the `cleanText` property
 */
export interface CleanedElement extends HTMLElement {
	cleanText?: string;
}

/**
 * Checks whether a particular HTML Element is visible.
 *
 * @param node HTML Element to check
 */
export function nodeIsVisible(node: HTMLElement) {
	// prettier-ignore
	let nodeNotVisible =
		!node.offsetParent ||
		!isInViewport(node) ||
		!node.textContent.trim();

	return !nodeNotVisible;
}

/**
 * Santise the text content of a HTML element and
 * store it's value onto a new `cleanText` property.
 *
 * @param node HTML Element to clean
 * @returns The cleaned HTML Element
 */
export function cleanNodeText(node: CleanedElement) {
	node.cleanText = node.textContent.trim().toLowerCase();

	return node;
}

/**
 * A reducer function to remove nested buttons/boops
 *
 * @param acc HTML Element Accumulator
 * @param currentNode Current HTML Element
 */
export function removeRelatedButtons(
	acc: HTMLElement[],
	currentNode: HTMLElement
) {
	const hasRelative = acc.some((node) => {
		const isChild = node.contains(currentNode);
		const isParent = currentNode.contains(node);

		return isChild || isParent;
	});

	if (!hasRelative) acc.push(currentNode);

	return acc;
}

/**
 * Checks whether a particular HTML Element is in the view port.
 *
 * @param node HTML Element to check
 */
export function isInViewport(node: HTMLElement) {
	const boundingRect = node.getBoundingClientRect();
	const height = window.innerHeight || document.documentElement.clientHeight;
	const width = window.innerWidth || document.documentElement.clientWidth;

	return (
		boundingRect.top >= 0 &&
		boundingRect.left >= 0 &&
		boundingRect.bottom <= height &&
		boundingRect.right <= width
	);
}
