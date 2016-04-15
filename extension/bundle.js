'use strict';

window.pageDetect = function () {
	var isGistCheck = location.hostname === 'gist.github.com';

	return {
		isGistCheck: isGistCheck
	};
}();
