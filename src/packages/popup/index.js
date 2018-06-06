import PopupManager from './popup-manager.js';
import { css, getScrollBarWidth } from '../../utils/dom.js';

export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		lockScroll: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		visible(val) {
			if(val){ //打开 modal
				this.open();
			}else{ //关闭 modal
				this.close();
			}
		}
	},
	methods: {
		open() {
			PopupManager.openModal();
			/*
				将 overflow 设为 hidden 能隐藏滚动条，但同时造成页面偏移；
				同理，还原滚动条时也一样会引起偏移；
				因此为了更好的视觉体验，需要根据滚动条的宽度设置 padding 值
			*/
			if(this.lockScroll){
				this.overflow = css(document.body, 'overflow');
				this.paddingRight = css(document.body, 'paddingRight');
				css(document.body, {'overflow':'hidden', 'paddingRight': getScrollBarWidth()});
			}
		},
		close() {
			PopupManager.closeModal();
			if(this.lockScroll){
				// 需要等到弹框隐藏了之后，再恢复 padding 和 滚动条。否则会看到弹框偏移，影响体验。
				setTimeout(() => {
					css(document.body, {'overflow': this.overflow, 'paddingRight': this.paddingRight});
				}, 300)
			}
		}
	}
}