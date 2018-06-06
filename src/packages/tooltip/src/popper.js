function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};

const cssNumber = {
	"animationIterationCount": true,
	"columnCount": true,
	"fillOpacity": true,
	"flexGrow": true,
	"flexShrink": true,
	"fontWeight": true,
	"lineHeight": true,
	"opacity": true,
	"order": true,
	"orphans": true,
	"widows": true,
	"zIndex": true,
	"zoom": true
};

function style(el,name,value){
	var type = typeof value,
		style = el.style;
	if ( value !== undefined ) {

		if(type === 'number'){
			value += cssNumber[name]?'':'px';
		}

		style[ name ] = value;
	}
}	
function getStyle(el){
	var view = el.ownerDocument.defaultView;

	if ( !view || !view.opener ) {
		view = window;
	}

	return view.getComputedStyle( el );
}
function curCSS(el,type,styles){
	var val;
	if(styles){
		val = styles.getPropertyValue(type) || styles[type];
	}
	return val;
}
function css(el,name,value){
	// 取值
	if(typeof name === 'string' && value === undefined){
		var styles = getStyle(el);
		var val = curCSS(el,name,styles);
		return val;
	}

	// 赋值		
	var type = typeof name,
	i;
	if(type === 'string'){
		style(el,name,value);
	}else if(type === 'object'){
		for(i in name){
			style(el,i,name[i]);
		}
	}
}
function getRelativeBoundingClientRect(reference, position) {
	var parentRect = getBoundingClientRect(document.documentElement);
	var referenceRect = getBoundingClientRect(reference);

	if(position === 'fixed') {
		return referenceRect;
	}

	return {
		top: referenceRect.top - parentRect.top,
		bottom: referenceRect.top - parentRect.top + referenceRect.height,
        left: referenceRect.left - parentRect.left,
        right: referenceRect.left - parentRect.left + referenceRect.width,
        width: referenceRect.width,
        height: referenceRect.height
    };
}
// TODO
function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();

    // whether the IE version is lower than 11
    var isIE = navigator.userAgent.indexOf("MSIE") != -1;

    // fix ie document bounding top always 0 bug
    var rectTop = isIE && element.tagName === 'HTML'
        ? -element.scrollTop
        : rect.top;

    return {
        left: rect.left,
        top: rectTop,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rectTop
    };
}
function getWidthOrHeight(el,type,extra){
	var isHide = false;
	var _display, _visibility;
	if(el.style.display === 'none') { //不可见
		isHide = true;
		_display = el.style.display, 
		_visibility = el.style.visibility;
		el.style.display = 'block';
		el.style.visibility = 'hidden';
	}

	var styles = getStyle(el),
		val = curCSS(el,type,styles),
		isBorderBox = curCSS(el,'boxSizing',styles) === 'border-box';

	if(val === 'auto'){
		val = el['offset'+type[0].toUpperCase()+type.slice(1)];
	}

	val = parseFloat(val)||0;
	
	var finalVal = ( val + argumentWidthOrHeight(el,type,extra,isBorderBox,styles) );

	if(isHide){
		el.style.display = _display;
		el.style.visibility = _visibility;
	}

	return finalVal;
}

function getStyle(el){
	var view = el.ownerDocument.defaultView;

	if ( !view || !view.opener ) {
		view = window;
	}

	return view.getComputedStyle( el );
}

function curCSS(el,type,styles){
	var val;
	if(styles){
		val = styles.getPropertyValue(type) || styles[type];
	}
	return val;
}

//当为 borderBox 时，width 宽度为 content+padding+border
function argumentWidthOrHeight(el,type,extra,isBorderBox,styles){
	var val = 0;
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	var i;

	if(extra === (isBorderBox?'border':'content') ){ // 此时不需要进行padding、border、margin的加减，所以不参与循环
		i = 4;
	}else{
		i = ( type==='width' ? 1 : 0 );			
	}

	for(;i<4;i=i+2){

		if(extra === 'margin'){
			val += parseFloat( curCSS(el, 'margin'+cssExpand[i], styles) );
		}

		// 当为 border-box 时，减去
		if(isBorderBox){
			// padding 和 content 时都会减去 border
			if(extra !== 'margin'){
				val -= parseFloat( curCSS(el, 'border'+cssExpand[i]+'Width', styles) );
			}

			if(extra === 'content'){
				val -= parseFloat( curCSS(el, 'padding'+cssExpand[i], styles) );
			}
		}else{
			if(extra !== 'content'){
				val += parseFloat( curCSS(el, 'padding'+cssExpand[i], styles) );
			}
			if(extra === 'border'|| extra === 'margin'){
				val += parseFloat( curCSS(el, 'border'+cssExpand[i]+'Width', styles) );
			}
		}

	}
	return val;
}

//判断是不是一个 window 对象
function isWindow( obj ) {
	return obj != null && obj === obj.window;
};
function width(el){
	if(isWindow(el)){
		return window.document.documentElement.clientWidth;
	}	
	return getWidthOrHeight(el,'width','content');
}

function inWidth(el){
	return getWidthOrHeight(el,'width','padding');
}

function outWidth(el,margin){
	var extra = margin?'margin':'border';
	return getWidthOrHeight(el,'width',extra);
}
function height(el){
    if(isWindow(el)){
    	return window.document.documentElement.clientHeight;
    }
	return getWidthOrHeight(el,'height','content');
}

function inHeight(el){
	return getWidthOrHeight(el,'height','padding');
}
function outHeight(el,margin){
	var extra = margin?'margin':'border';
	return getWidthOrHeight(el,'height',extra);
}



var DEFAULT = {
	placement: 'bottom',
	modifiers: [ 'applyStyle' ],
}

function Popper(reference, popper, options){
	this._reference = reference;
	this._popper = popper;
	this._options = merge({}, DEFAULT, options);
	this._options.modifiers = this._options.modifiers.map(function(modifier){
		return this.modifiers[modifier] || modifier;
	}.bind(this));
	this._popper.setAttribute('x-placement', this._options.placement);
	this.position = this._getPosition(reference);
	this.update();
	return this;
}

Popper.prototype._getPosition = function(reference){
	var isFixed = this._isFixed(reference);
	return isFixed ? 'fixed' : 'absolute';
}
Popper.prototype._isFixed = function(el){
	if(el === document.body){
		return false;
	}
	if( css(el,'position') === 'fixed' ){
		return true;
	}
	return el.parentNode ? this._isFixed(el.parentNode) : el;
}
Popper.prototype.update = function(){
	var data = { instance: this };
	data.placement = this._options.placement;
	data.offsets = this._getOffsets(this._popper, this._reference, data.placement);

	this.modifiers.applyStyle.call(this,data);
}
/*
	placement: 暂时只有 top/bottom/left/right,
	以后会增加为 top/top-start/top-end/
			   bottom/bottom-start/bottom-end/
			   left/left-start/left-end/
			   right/right-start/right-end
*/
Popper.prototype._getOffsets = function(popper, reference, placement){
	var referenceOffsets = getRelativeBoundingClientRect(reference, this.position);
	var popperOffsets = {};
	popperOffsets.width = outWidth(popper, true);
	popperOffsets.height = outHeight(popper, true);
	
	placement = placement.split('-')[0];
	if(placement === 'right' || placement === 'left') {
		popperOffsets.top = referenceOffsets.top + referenceOffsets.height/2 - popperOffsets.height/2;
		if(placement === 'right'){
			popperOffsets.left = referenceOffsets.right;
		}else {
			popperOffsets.left = referenceOffsets.left - popperOffsets.width;
		}
	}else {
		popperOffsets.left = referenceOffsets.left + referenceOffsets.width/2 - popperOffsets.width/2;
		if(placement === 'top'){
			popperOffsets.top = referenceOffsets.top - popperOffsets.height;
		}else {
			popperOffsets.top = referenceOffsets.bottom;
		}
	}

	return {
        popper: popperOffsets,
        reference: referenceOffsets
    };
}

Popper.prototype.destroy = function(){
	console.log('destroy');
}

Popper.prototype.modifiers = {
	applyStyle: function(data){
		var styles = {
            position: this.position
        };

        // round top and left to avoid blurry text
        var left = Math.round(data.offsets.popper.left);
        var top = Math.round(data.offsets.popper.top);
		styles.left =left;
		styles.top = top;
		css(this._popper, styles);
	}
} 

export default Popper;