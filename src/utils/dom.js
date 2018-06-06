function stripAndCollapse(value){
	//var htmlwhite = ( /[^\x20\t\r\n\f]+/g );
	var htmlwhite = ( /[^\s]+/g );
	var arr = value.match(htmlwhite)||[];
	return arr.join(' ');
}

function classesToArray(value){
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		//var htmlwhite = ( /[^\x20\t\r\n\f]+/g );
		var htmlwhite = ( /[^\s]+/g );
		return value.match( htmlwhite ) || [];
	}
	return [];
}

export function addClass(el, value){
	var classes = classesToArray(value),
	curValue,cur,j,clazz,finalValue;

	if(classes.length>0){
		curValue = el.getAttribute && el.getAttribute('class') || '';
		cur = ' '+stripAndCollapse(curValue)+' ';

		if(cur){
			var j=0;
			while( (clazz = classes[j++]) ){
				if ( cur.indexOf( ' ' + clazz + ' ' ) < 0 ) {
					cur += clazz + ' ';
				}
			}

			finalValue = stripAndCollapse(cur);
			if(curValue !== finalValue){
				el.setAttribute('class',finalValue);
			}
		}
	}
}

export function removeClass(el, value){
	var classes = classesToArray(value),
	curValue,cur,j,clazz,finalValue;

	if(classes.length>0){
		curValue = el.getAttribute && el.getAttribute('class') || '';
		cur = ' '+stripAndCollapse(curValue)+' ';

		if(cur){
			var j=0;
			while( (clazz = classes[j++]) ){
				if ( cur.indexOf( ' ' + clazz + ' ' ) > -1 ) {
					cur = cur.replace(' '+clazz+' ' ,' ');
				}
			}

			finalValue = stripAndCollapse(cur);
			if(curValue !== finalValue){
				el.setAttribute('class',finalValue);
			}
		}
	}
}

export function hasClass(el,value){
	var className = ' '+value+' ';
	var curValue = el.getAttribute && el.getAttribute('class') || '';
	var cur = ' '+stripAndCollapse(curValue)+' ';

	if(cur.indexOf(className) > -1){
		return true;
	}
	return false;
}

/*------------ css 取值赋值 -------------*/
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
export function css(el,name,value){
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

/*------------ 滚动条宽度 ------------------*/

export function getScrollBarWidth() {
	let scrollBarWidth;
	const outer = document.createElement('div');
	outer.className = 'h-scrollbar--wrap';
	outer.style.visibility = 'hidden';
	outer.style.width = '100px';
	outer.style.position = 'absolute';
	outer.style.top = '-9999px';
	document.body.appendChild(outer);

	const widthNoScroll = outer.offsetWidth;
	outer.style.overflow = 'scroll';

	const inner = document.createElement('div');
	inner.style.width = '100%';
	outer.appendChild(inner);

	const widthWithScroll = inner.offsetWidth;
	outer.parentNode.removeChild(outer);
	scrollBarWidth = widthNoScroll - widthWithScroll;

	return scrollBarWidth;
};

/*------------ 事件 ------------------*/
export function on(element, type, handler){
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	}
	else if (element.attachEvent) {
		element.attachEvent("on" + type, handler);
	}else {
		element["on" + type] = handler;
    }
}

export function off(element, type, handler){
	if(element.removeEventListener){
		element.removeEventListener(type, handler, false);
	}else if(element.attachEvent){
		element.detachEvent("on"+type, handler);
	}else{
		element["on" + type] = null;
	}
}