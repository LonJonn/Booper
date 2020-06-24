function nodeIsVisible(node) {
	// prettier-ignore
	let nodeNotVisible =
		!node.offsetParent ||
		!isInViewport(node) ||
		!node.textContent.trim();

	return !nodeNotVisible;
}

function cleanNodeText(node) {
	node.cleanText = node.textContent.trim().toLowerCase();

	return node;
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

function isInViewport(elem) {
	const boundingRect = elem.getBoundingClientRect();
	return (
		boundingRect.top >= 0 &&
		boundingRect.left >= 0 &&
		boundingRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		boundingRect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}
