import Vue from 'vue';
import Main from './main.vue';
import merge from '../../../utils/merge.js'

let Constructor = Vue.extend(Main);
let instance;

const defaultOptions = {
	title: '',
	message: '',
	confirmButtonText: '',
	cancelButtonText: '',
	showConfirmButton: true,
	showCancelButton: false,
	type: '', // 类型，info/success/help/warn/error
	iconClass: '', //自定义图标的class
	center: false, //文本居中
	lockScroll: true, //隐藏滚动条
	beforeClose: null,
	callback: null, //关闭后的回调
}

// 默认的关闭后的回调，处理了 Promise；若options设置了callback属性，则该defaultCallback被覆盖
const defaultCallback = function(action) {
	if(action === 'confirm' && this.resolve){
		this.resolve(action)
	}else if(action === 'cancel' && this.reject){
		this.reject(action);
	}
}

const MessageBox = function(options){
	if(!instance){
		instance = new Constructor();	
	}
	// 因为是复用一个 instance，因此需要遍历赋值，覆盖之前的选项
	for(let prop in options){
		if (options.hasOwnProperty(prop)) {
			instance[prop] = options[prop];
		}
	}
	if(typeof instance.callback !== 'function'){
		instance.callback = defaultCallback;
	}

	if(typeof Promise !== 'undefined'){
		return new Promise((resolve, reject) => {
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.visible = true;
			instance.resolve = resolve;
			instance.reject = reject;
		});
	}else{
		console.log('can not suport Promise !');
		instance.$mount();
		document.body.appendChild(instance.$el);
		instance.visible = true;
	}
}

MessageBox.alert = function(message, title, options){
	options = options || {};
	options.title = title;
	options.message = message;
	options.$type = 'alert';
	// 因为是复用一个 instance，因此需要合并 defaultOptions 进行初始化
	return MessageBox( merge({}, defaultOptions, options) );
}

MessageBox.confirm = function(message, title, options){
	options = options || {};
	options.title = title;
	options.message = message;
	options.$type = 'confirm';
	options.showCancelButton = true;
	return MessageBox( merge({}, defaultOptions, options) );
}

export default MessageBox;