import loadingDirective from './src/main.js';

export default {
	install: function(Vue){
		loadingDirective.init();
	}
}