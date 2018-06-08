<template>
	<div class="h-loading-mask" v-show="visible">
		<div class="h-loading-spinner">
			<svg class="loading-circle-wrapper" width="45" height="45" viewBox="0 0 100 100" >
				<circle class="loading-circle" cx="50" cy="50" r="46" fill="none" stroke-width="4"></circle>
			</svg>			
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	data() {
		return {
			visible: false,
		}
	}
}
</script>

<style>

</style>