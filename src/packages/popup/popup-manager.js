import { addClass, removeClass } from '../../utils/dom.js'

const getModal = function() {
	let modalDom = PopupManager.modalDom;
	if( !modalDom ){
		modalDom = document.createElement('div');
		PopupManager.modalDom = modalDom;
		modalDom.addEventListener('click', PopupManager.doOnModalClick)
	}
	return modalDom;
}

const PopupManager = {
	modalDom: null,
	openModal() {
		const modalDom = getModal();
		addClass(modalDom, 'h-modal h-modal-enter');
		setTimeout(() => {
			removeClass(modalDom, 'h-modal-enter');
		}, 300)
		document.body.appendChild(modalDom);
	},
	closeModal() {
		const modalDom = getModal();
		addClass(modalDom, 'h-modal h-modal-leave');
		setTimeout(() => {
			removeClass(modalDom, 'h-modal-leave');
			if(modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
		}, 300)
	},
	doOnModalClick() {
	
	}
}

export default PopupManager;