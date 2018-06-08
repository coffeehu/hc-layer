import Vue from 'vue';
import Loading from './loading.vue';
import { addClass, removeClass, css } from '../../../utils/dom.js';

const Constructor = Vue.extend(Loading);

function toggleLoading(el, binding) {
	if(binding.value) {
		let parent = el;
		if(binding.modifiers.fullscreen){ //全窗口
			parent = document.body;
			addClass(el.loadingEl, 'h-is-fullscreen');
			if(binding.modifiers.lock){
				addClass(document.body, 'h-is-overflow-hidden');
			}
		}
		insertToParent(el, parent);
	}else {
		let target = el;
		if(binding.modifiers.fullscreen) target = document.body;
		removeClass(target, 'h-is-relative');
		removeClass(document.body, 'h-is-overflow-hidden');
	}
	el.instance.visible = binding.value;
}

function insertToParent(el, parent) {
	const elDisplay = css(el, 'display');
	const elVisibility = css(el, 'visibility');
	if(elDisplay === 'none' || elVisibility === 'hidden') return;
	
	const parentPosition = css(parent, 'position');
	if( parentPosition !== 'absolute' && parentPosition !== 'fixed'
	&& parentPosition !== 'relative'){
		addClass(parent, 'h-is-relative');
	}
	parent.appendChild(el.loadingEl);
}

const loadingDirective = {};

loadingDirective.init = () => {
	Vue.directive('loading', {
		bind: function(el, binding) {
			console.log('bind',el, binding)
			const loadingType = el.getAttribute('h-loading-type'); //获得动画类型
			const loadingText = el.getAttribute('h-loading-text'); //获得文本
			const loadingTextType = el.getAttribute('h-loading-text-type'); // 水平or竖直，默认竖直
			const loading = new Constructor().$mount();
			el.instance = loading;
			if(loadingType) el.instance.type = parseInt(loadingType);
			if(loadingText) el.instance.text = loadingText;
			if(loadingTextType) el.instance.textType = loadingTextType;
			el.loadingEl = loading.$el;
			binding.value && toggleLoading(el, binding);
		},

		update: function(el, binding) {
			console.log('update',el, binding)
			if(binding.value != binding.oldValue){
				toggleLoading(el, binding);
			}
		},

		unbind: function(el, binding) {
			console.log('unbind',el, binding)
		}
	})
}

export default loadingDirective;