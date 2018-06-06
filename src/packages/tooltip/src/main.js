import Vue from 'vue';
import {on, off} from '../../../utils/dom.js';
import Popper from './popper.js';

export default {
	name: 'HTooltip',

	props: {
		content: {
			type: String,
			default: ''
		},
		placement: {
			type: String,
			default: 'bottom'
		}
	},

	beforeCreate() {
		this.popperVM = new Vue({
	      data: { node: '' },
	      render(h) {
	        return this.node;
	      }
	    }).$mount();
	},

	render(h) {
		if(this.popperVM){
			this.popperVM.node = (
	        <transition name="h-anime-fade">
	          <div
	            ref="popper"
	            class="h-tooltip--popper"
	            v-show={this.showPopper}
	            onMouseleave={ () => { this.setIsEnterPopper(false); this.close() } }
            	onMouseenter= { () => { this.setIsEnterPopper(true); } }
	            >
	            { this.content }
	          </div>
	        </transition>);
		}
		return this.$slots.default[0];
	},

	mounted() {
		on(this.$el, 'mouseenter', this.show);
		on(this.$el, 'mouseleave', this.close);
	},

	watch: {
		showPopper(val) {
			if(val){
				if(this.instance === null){
					const reference = this.$el;
					const popper = this.$refs.popper;
					document.body.appendChild(popper);
					this.addArrow(popper);
					this.instance = new Popper(reference, popper, { placement: this.placement });	
				}else {
					this.instance.update();
				}
				
			}
		}
	},

	methods: {
		show() {
			clearTimeout(this.timeoutId);
			this.showPopper = true;
		},
		close() {
			this.timeoutId = setTimeout(() => {
				if(!this.isEnterPopper)
					this.showPopper = false;
			}, 200);
		},
		addArrow(popper) {
			if(this.hasArrow) return;
			this.hasArrow = true;
			const arrow = document.createElement('div');
			arrow.className = 'h-popper--arrow';
			popper.appendChild(arrow);
		},
		setIsEnterPopper(isEnterPopper) {
			this.isEnterPopper = isEnterPopper;
		}
	},

	data() {
		return {
			showPopper: false,
			hasArrow: false,
			isEnterPopper: false,
			instance: null
		}
	},

	destroyed() {
	    const reference = this.$el;
	    off(reference, 'mouseenter', this.show);
	    off(reference, 'mouseleave', this.close);
	  }

}