window.pageDetect = (() => {
	const isGistCheck = location.hostname === 'gist.github.com';

	return {
		isGistCheck
	};
})();