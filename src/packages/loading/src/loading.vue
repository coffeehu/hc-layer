<template>
	<div class="h-loading-mask" v-show="visible">
		<div class="h-loading-spinner">
			<svg v-if="type===1" :class="isInline" class="loading-circle-wrapper" width="45" height="45" viewBox="0 0 100 100" >
				<circle class="loading-circle" cx="50" cy="50" r="46" fill="none" stroke-width="4"></circle>
			</svg>	
			<div v-if="type===2" :class="isInline" class="h-loading-flower">
			    <div class="lines">
			        <div></div>
			        <div></div>
			        <div></div>
			        <div></div>
			        <div></div>
			        <div></div>
			    </div>
			</div>
			<div v-if="type===3" :class="isInline" class="h-loading-flower-sm">
			    <div class="lines">
			        <div></div>
			        <div></div>
			        <div></div>
			        <div></div>
			    </div>
			</div>
			<p v-if="text" :class="isInline" class="h-loading-text">{{ text }}</p>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	props: {
		type: {
			type: Number,
			default: 1
		},
		text: {
			type: String,
			default: ''
		},
		textType: {
			type: String,
			default: '' //  可选"horizontal"
		}
	},
	data() {
		return {
			visible: false,
		}
	},
	computed: {
		isInline() {
			return this.textType === "horizontal" ? 'h-is-inlineblock h-is-middle' : '';
		}
	}
}
</script>

<style>


</style>