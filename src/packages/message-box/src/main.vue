<template>
	<transition name="h-msgbox-fade">
		<div class="h-message-box--wrapper" v-show="visible">
			<div class="h-message-box" :class="[center?'h-message-box--center':'']">
				<div class="h-message-box--header">
					<div v-if="(typeClass || iconClass) && center" class="h-message-box--icon" :class="typeClass"></div>
					<h2 class="h-message-box--title">{{ title }}</h2>
					<i class="h-icon--close h-message-box--close" @click="handleAction('cancel')"></i>
				</div>
				<div class="h-message-box--content">
					<div v-if="(typeClass || iconClass) && !center" class="h-message-box--icon" :class="typeClass"></div>
					<div class="h-message-box--message"><p>{{ message }}</p></div>
				</div>
				<div class="h-message-box--btns">
					<button v-if="showCancelButton" class="h-btn" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
					<button v-show="showConfirmButton" class="h-btn h-btn-blue" ref="confirm" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import Popup from '../../popup'
let typeMap = {
	success: 'success',
	info: 'info',
	help: 'help',
	warn: 'warn',
	error: 'error'
};

export default {
	mixins: [Popup],
	watch: {
		visible(val){
			this.$nextTick(() => {
			 this.$refs.confirm.focus();
            });
		}
	},
	data() {
		return {
			title: '',
			message: '',
			confirmButtonText: '',
			cancelButtonText: '',
			showConfirmButton: true,
			showCancelButton: false,
			type: '',
			iconClass: '',
			center: false,
		}
	},
	computed: {
		typeClass: function() {
			if(this.iconClass){
				return this.iconClass;
			}else{
				return this.type && typeMap[this.type] ? 'h-icon--'+this.type : '';
			}
		}
	},
	methods: {
		handleAction(action) {
			this.action = action;
			if(typeof this.beforeClose === 'function'){
				this.beforeClose(this, this.safeClose);
			}else{
				this.doClose();
			}
		},
		doClose() {
			this.visible = false;
			this.callback(this.action);
		},
		safeClose() {
			this.$nextTick(() => {
				this.doClose();
			})
		},
		
	}
}
</script>

<style scoped>
</style>