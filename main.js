let buttonNodes = [...document.querySelectorAll("[role='button']")];

let hasShowText = filterByTextFactory("show");

// prettier-ignore
buttonNodes
	.filter(nodeIsVisible)
	.filter(hasShowText)
	.reduce(removeRelatedButtons, []);

/**
 * @param {Element} node an element
 */
function nodeIsVisible(node) {
	let boundingRect = node.getBoundingClientRect();
	let style = window.getComputedStyle(node);

	let nodeNotVisible =
		style.display === "none" ||
		style.visibility === "hidden" ||
		boundingRect.height === 0 ||
		boundingRect.width === 0 ||
		node.textContent.trim() === "";

	return !nodeNotVisible;
}

/**
 * @param {string} query
 * @returns {Function}
 */
function filterByTextFactory(query) {
	/**
	 * @param {Element} node
	 */
	return function filterByText(node) {
		let text = node.textContent.trim().toLowerCase();
		return text.includes(query);
	};
}

function removeRelatedButtons(acc, currentNode) {
	const hasRelative = acc.some((node) => {
		const isChild = node.contains(currentNode);
		const isParent = currentNode.contains(node);

		return isChild || isParent;
	});

	if (!hasRelative) acc.push(currentNode);

	return acc;
}
