<template>
	<transition name="h-notification-fade">
		<div v-show="visible"
			:class="['h-notification', horizontalClass, customClass]"
			:style="positionStyle"
			@click="click">
			<i v-if="type || iconClass" :class="iconClassArr"></i>
			<div class="h-notification--group">
				<h2 class="h-notification--title">{{ title }}</h2>
				<div class="h-notification--content">
					<p v-if="!useHtmlString">{{ message }}</p>
					<p v-else v-html="message"></p>
				</div>
				<div v-if="showClose" class="h-icon--close h-notification--close" @click="close"></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	mounted: function(){
		this.startTimer();
		document.addEventListener('keydown', this.keydown);
	},
	beforeDestroy: function(){
		document.removeEventListener('keydown', this.keydown);
	},
	data: function(){
		return {
			visible: false,
			title: '',
			message: '',
			type: '',
			position: 'top-right',
			duration: 4500,
			closed: false,
			showClose: true,
			iconClass: '',
			customClass: '',
			useHtmlString: false,
			verticalOffset: 0, //当页面有多个 notification 组件时，计算自动偏移值
			offset: 0 //设置的偏移值
		}
	},
	watch: {
		closed: function(newValue){
			if(newValue){
				this.visible = false;
				this.$el.addEventListener('transitionend', this.destroyElement);
			}
		}
	},
	computed: {
		horizontalClass: function(){
			return this.position.indexOf('right') > -1 ? 'right' : 'left';
		},
		verticalProperty: function(){
			return this.position.indexOf('top-') > -1 ? 'top' : 'bottom';
		},
		positionStyle: function(){
			return {
				[this.verticalProperty] : this.verticalOffset + 'px'
			}
		},
		iconClassArr: function(){
			if(this.iconClass){
				return [this.iconClass];
			}else if(this.type){
				return ['h-notification--icon', 'h-icon--'+this.type];
			}
		}
	},
	methods: {
		startTimer: function(){
			const that = this;
			if(that.duration > 0){
				setTimeout(function(){
					if(!that.closed){
						that.close();
					}
				}, that.duration);
			}
		},
		close: function(){
			this.closed = true;
			if(typeof this.onClose === 'function'){
				this.onClose(this);
			}
		},
		destroyElement: function(){
			this.$el.removeEventListener('transitionend', this.destroyElement);
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
		},
		keydown: function(e){
			if (e.keyCode === 27) {
	          if (!this.closed) {
	            this.close();
	          }
	        }
		},
		click: function(){
			if(typeof this.onClick === 'function'){
				this.onClick(this);
			}
		}
	}
}
</script>

<style scoped></style>