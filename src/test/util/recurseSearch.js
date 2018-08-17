export default function recurseSearch(id, node) {
	// debugger;
	// console.log("checking if", node.testingId, "is",  id);
	if (node.testingId == id) {
		// console.log('it is', node.testingId);
		return node;
	}
	const direct = node.children.find(child => {
		return child.testingId == id;
	});
	if (direct) {
		// console.log("scan of children returns", direct.testingId)
		return direct;
	}

	// console.group('it is not so recurse children');
	let result;
	node.children.find(child => {
		// console.log("recursing ", child.testingId, id)
		// console.group('recursion');
		const search = recurseSearch(id, child);
		// console.groupEnd();
		if (search) {
			result = search;
			// console.log("my search result is", search.testingId);
		}
		return search;
	});
	// if(result){
	// 	console.log("result is ", result.testingId)
	// }else{
	// 	console.log('no result returned')
	// }
	// console.groupEnd();
	return result;
}
