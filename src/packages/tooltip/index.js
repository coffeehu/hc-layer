import HTooltip from './src/main.js';

HTooltip.install = function(Vue) {
	Vue.component(HTooltip.name, HTooltip);
};

export default HTooltip;