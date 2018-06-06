import Vue from 'vue';
import Main from './main.vue';

let Constructor = Vue.extend(Main);
let instance;
let instances = [];
let index = 0;

const Notification = function(options){
	let id = 'notification_' + index++;

	/*
		position: top-left/top-right/bottom-left/bottom-right
	*/
	let position = options.position || 'top-right';
	let verticalOffset = 0;
	for(let i=0,l=instances.length;i<l;i++){
		if(position === instances[i].position){
			verticalOffset += instances[i].$el.offsetHeight+16;
		}
	}

	// 当某个组件被关闭后，它后面的组件要跟着偏移位置
	let userOnClose = options.onClose;
	options.onClose = function(){
		let index = -1;
		let instance;
		for(let i=0,l=instances.length; i<l; i++){
			if(id === instances[i].id){
				index = i;
				instance = instances[i];
				instances.splice(i, 1);
				break;
			}
		}
		if(!instance) return;
		let removeOffset = instance.$el.offsetHeight;
		for(let i=index,l=instances.length; i<l; i++){
			if(position === instances[i].position){
				instances[i].verticalOffset -= removeOffset + 16;
			}
		}
		if(typeof userOnClose === 'function'){
			userOnClose(instance);
		}
	}

	instance = new Constructor({
		data: options
	});
	instance.id = id;
	instance.verticalOffset = verticalOffset + 16 + (options.offset ? options.offset : 0);
	instances.push(instance);

	instance.$mount();
	document.body.appendChild(instance.$el);
	instance.visible = true;

	return instance;
};

['info', 'success', 'help', 'warn', 'error'].forEach(function(type){
	Notification[type] = function(options){
		options.type = type;
		return Notification(options);
	}
})

Notification.closeAll = function(){
	for(let i=instances.length-1; i>=0; i--) {
		instances[i].close();
	}
}

export default Notification;