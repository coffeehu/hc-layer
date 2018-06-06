import Vue from 'vue';
import Main from './main.vue';

let Constructor = Vue.extend(Main);

let instance;
let instances = [];
let index = 0;

const Message = function(options) {
	if(typeof options === 'string'){
		options = {
			message: options
		}
	}
	
	let id = 'message_' + index++;
	// onClose 预处理，目的是维护 isntances 数组的长度
	let userOnClose = options.onClose;
	options.onClose = function(){
		for(let i=0,l=instances.length; i<l; i++){
			if(id === instances[i].id){
				if(typeof userOnClose === 'function'){
					userOnClose(instance);
				}
				instances.splice(i, 1);
				break;
			}
		}
	}

	instance = new Constructor({
		data: options
	});
	instance.id = id;
	instance.$mount();

	document.body.appendChild(instance.$el);
	instance.visible = true;
	instances.push(instance);
	return instance;
};

['info', 'success', 'help', 'warn', 'error'].forEach(function(type){
	Message[type] = function(options){
		if(typeof options === 'string'){
			options = {
				message: options
			}
		}
		options.type = type;
		return Message(options);
	}
})

Message.closeAll = function(){
	for(let i = instances.length-1; i>=0; i--){
		instances[i].close();
	}
}

export default Message;
