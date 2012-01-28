/*
 * juCore Plugin - JeeUtil JavaScript Library 
 * Version 1.0
 *
 * The MIT License
 *
 * Copyright (c) 2008-2012 www.myjeeva.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Republic of India Patent Pending (IP): IPL-V-101-JU
 *
 * Changes Logs: please refer https://github.com/jeevatkm/jeeutil-js-library/blob/master/src/plugin/README 
 *
 */

var ju = new Object();

nua = navigator.userAgent.toLowerCase();

Add(ju, {
	ver: '1.0',	
	
	ratio: '100.0',
	
	empty: function(){ },
	
	isBool: function(val){
		return typeof val == 'boolean';
	},
	
	isEqual: function(l, r){
		return l === r;
	},
	
	isFunction: function(val){
		return typeof val == 'function';
	},
	
	isList: function(val){
		return val && typeof val == 'object' && val.constructor == Array;
	},
	
	isNull: function(val){
		return typeof val == 'undefined' || (typeof val == 'object' && !val);
	},
	
	isUndefined: function(val){
		return typeof val == 'undefined';
	},
	
	isString: function(val){
		return typeof val == 'string';
	},
	
	isObject: function(val){
		return typeof val == 'object';
	},
	
	getEnv: function(){
		return (window.attachEvent) ? 1 
			: (window.addEventListener) ? 2 
			: 3;
	},
	
	createElement: function(ele){
		return (document.createElement(ele));
	},
	
	addStyleSheet: function(file){
		ele = this.createElement("link");
		ele.setAttribute("type","text/css");
		ele.setAttribute("rel","stylesheet");
		ele.setAttribute("href",file);
		ele.setAttribute("media","screen");
		if(!this.isUndefined(document.getElementsByTagName("head"))){
			return(this.appendChild(document.getElementsByTagName("head")[0], ele));
		}
		else return false;
	},
	
	appendChild: function(obj, ele){		
		if(!obj || !ele) return false;
		obj.appendChild(ele);
		return true;
	},
	
	AddCss: function(file){
		try
		{
			s = this.createElement("link");
			s.setAttribute("type","text/css");
			s.setAttribute("rel","stylesheet");
			s.setAttribute("href",file);
			s.setAttribute("media","screen");
			if(!this.isUndefined(document.getElementsByTagName("head"))){
				this.appendChild(document.getElementsByTagName("head")[0], s);				
			}
			return true;
		}
		catch(ex){
			return false;
		}		
	},
	
	addStyle: function(css){
		try
		{
			if(document.styleSheets.length==0){			
				s = this.createElement("style");		
				s.setAttribute("type","text/css");		
				s.setAttribute("media","screen");
				if(!this.isUndefined(document.getElementsByTagName("head"))){
					this.appendChild(document.getElementsByTagName("head")[0], s);				
				}
			}
			ss = document.styleSheets[document.styleSheets.length - 1];
			for(var prop in css){
				if(ss.addRule){
					ss.addRule(prop, css[prop], 0);			
				}else if(ss.insertRule){				
					ss.insertRule(prop.concat('{' + css[prop] + '}'), 0);
				}
			}
			return true;
		}
		catch(ex){
			return false;
		}		
	},
	
	getFunction: function(func){
		return ((func && this.isFunction(func)) ? func : ju.empty);
	},
	
	getPageBody: function(){
		return (document.getElementsByTagName ? document.getElementsByTagName("body")[0] : (document.body || null));
	},
	
	getPageDimension: function(){
		var bodyref = ju.getPageBody();		
		if(bodyref){
			return {
				"width": bodyref.clientWidth,
				"height": bodyref.clientHeight
			}
		}
		return { "width":0, "height":0 };
	},
	
	focus: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;	
		ele.focus();
	},
	
	getOpaRef: function(){
		var css = this.getPageBody().style;	
		return (!this.isUndefined(css.filter)) ? 1 
				: (!this.isUndefined(css.KhtmlOpacity)) ? 2 
				: (!this.isUndefined(css.KHTMLOpacity)) ? 3
				: (!this.isUndefined(css.MozOpacity)) ? 4 
				: (!this.isUndefined(css.opacity)) ? 5 
				: 0;
	},
	
	getObj: function(ele){		
		if(this.isString(ele)){
			if (document.getElementById){
				ele = document.getElementById(ele);
			}
			else if (document.all){
				ele = document.all[ele];
			}			
			//to fetch element outside the iframe
			if(this.isNull(ele))
				ele = top.document.getElementById(ele);
		}	
		return (this.isNull(ele)) ? null : ele;
	},
	
	elementType: function(ele, type){	
		if (this.isNull(type)){
			return !this.isNull(ele) 
				&& this.isObject(ele) 
				&& ele.nodeName != null;
		}
		else{
			return !this.isNull(ele) 
				&& this.isObject(ele) 
				&& !this.isNull(ele.nodeName) 
				&& ele.nodeName.toLower() == type.toLower();
		}	
	},
	
	addFunction: function (ele, eType, func){
		if(!ele || !eType || !func)
			return null;		
		if(!this.isFunction(func))
			return null;
		ele = this.getObj(ele);
		if(ele){
			switch(this.getEnv()){
				case 1: var eve = ele.attachEvent('on'+eType, func); break;
				case 2: ele.addEventListener(eType, func, false); break;
				case 3: ele['on'+eType] = func;
			}
			return true;
		}
		return false;
	},
	
	deleteFunction: function (ele, eType, func){	
		if(!ele || !eType || !func)
			return null;		
		if(!this.isFunction(func))
			return null;
		ele = this.getObj(ele);
		if(ele){
			switch(this.getEnv()){
				case 1: var eve = ele.detachEvent('on'+eType, func); break;
				case 2: ele.removeEventListener(eType,  func, false); break;
				case 3: ele['on'+eType] = false;			
			}
			return true;
		}
		return false;
	},
	
	replaceFunction: function (ele, eType, oldFunc, newFunc){
		if(!ele || !eType || !oldFunc || !newFunc)
			return null;
		if(!this.isFunction(oldFunc) || !this.isFunction(newFunc))
			return null;
		if(this.deleteFunction(ele, eType, oldFunc)){
			return this.addFunction(ele, eType, newFunc);
		}		
		return false;
	},
	
	swap: function(item1, item2){
		try{
			if(!item1 || !item2) return false;
			item1 = (this.isString(item1)) ? this.getObj(item1) : item1;
			item2 = (this.isString(item2)) ? this.getObj(item2) : item2;
			var parent = item1.parentNode;
			parent.removeChild(item1);
			parent.insertBefore(item1, item2);
		}
		catch(e){
			return null;
		}
	},
	
	nextItem: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var sibling = ele.nextSibling;
		while (sibling != null) {
			if (sibling.nodeName == ele.nodeName) return sibling;
			sibling = sibling.nextSibling;
		}
		return null;
	},
	
	previousItem: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var sibling = ele.previousSibling;
		while (sibling != null) {
			if (sibling.nodeName == ele.nodeName) return sibling;
			sibling = sibling.previousSibling;
		}
		return null;
	},
	
	
	getParentBackColor: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var el=ele.parentNode, c;
		while(el.tagName.toUpper()!="HTML" && (c=this.getBackColor(el))=="transparent")
			el=el.parentNode;
		if(c=="transparent") c="#FFFFFF";
		return c;
	},
		
	getBackColor: function(ele){
		if(!ele) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		var c=this.getStyleProp(ele,"backgroundColor");
		if(this.isNull(c) || c=="transparent" || c.find("rgba(0, 0, 0, 0)"))
			return("transparent");
		if(c.find("rgb")) c=this.toHexa(c);
		return c;
	},
		
	getPadding: function(ele, side){
		var p=this.getStyleProp(ele,"padding"+side);
		if(this.isNull(p) || !p.find("px")) return (0);
		return (p.toInt());
	},
	
	getStyleProp: function(ele, prop){
		if(!ele || !prop) return false;
		ele = (this.isString(ele)) ? this.getObj(ele) : ele;
		if(ele.currentStyle)
			return (ele.currentStyle[prop]);
		if(document.defaultView.getComputedStyle)
			return (document.defaultView.getComputedStyle(ele,'')[prop]);
		return null;
	},
	
	toHexa: function(value){
		var hex="",v,h,i;
		var regexp=/([0-9]+)[, ]+([0-9]+)[, ]+([0-9]+)/;
		var h=regexp.exec(value);
		for(i=1;i<4;i++){
			v=parseInt(h[i]).toString(16);
			if(v.length==1) hex+="0"+v;
			else hex+=v;
		}
		return ("#"+hex);
	},
	
	fadeIn: function(el, speed){
		if(!el)
			return null;
		speed = (speed) ? speed : 5;
		speed = Math.round(speed * 100 / this.ratio.toFloat());	
		var timer = 0;
		for(i=0; i<=100; i++){
			setTimeout("ju.setOpa('"+ el + "'," + i + ")",(timer * speed));
			timer++;
		}
	},
	
	fadeOut: function(el, speed){
		if(!el)
			return null;
		speed = (speed) ? speed : 5;
		speed = Math.round(speed * 100 / this.ratio.toFloat());	
		var timer = 0;
		for(i=100; i>=0; i--){
			setTimeout("ju.setOpa('"+ el + "'," + i + ")",(timer * speed));
			timer++;
		}
	},
	
	setOpa: function(el, opa){
		var css = ju.getObj(el).style;
		switch(ju.getOpaRef()){
			case 1: 
				css.zoom = "100%"; css.filter = "alpha(opacity=" + opa + ")"; break;
			case 2:
				css.KhtmlOpacity = (opa/this.ratio.toFloat()); break;
			case 3:
				css.KHTMLOpacity = (opa/this.ratio.toFloat()); break;
			case 4:
				css.MozOpacity = (opa/this.ratio.toFloat()); break;
			case 5:
				css.opacity = (opa/this.ratio.toFloat()); break;
		}
	},
	
	getXHR: function(){
		if (window.XMLHttpRequest){
			//for IE7+, Firefox, Chrome, Opera, Safari
			return new XMLHttpRequest();
		}
		else if (window.ActiveXObject){
			//for IE6, IE5
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
});

//Extending String Object functionality
String.prototype.find = function(key){
	return (this.indexOf(key)>=0 ? true : false);
}

String.prototype.toInt = function(){
	return (parseInt(this));
}

String.prototype.toFloat = function(){
	return (parseFloat(this));
}

String.prototype.trim = function(){
	return (this.replace(/\s+$/, '')).replace(/^\s+/, '');
}
	
String.prototype.rTrim = function(){
	return (this.replace(/\s+$/, ''));
}

String.prototype.lTrim = function(){
	return (this.replace(/^\s+/, ''));
}

String.prototype.toLower = function(){
	return (this.toLowerCase().trim());
}

String.prototype.toUpper = function(){
	return (this.toUpperCase().trim());
}

String.prototype.count = function(){
	return (this.trim().length);
}

String.prototype.initCap = function(){
	return (this.charAt(0).toUpper() + this.substr(1));
}

String.prototype.isEmpty = function(){
	return ((this.count()==0) ? true : false);
}

String.prototype.equalTo = function(str){
	return ((!str) ? null 
			 : (this.trim().toLower() == str.trim().toLower()) ? true
			 : false);
}

String.prototype.notEqualTo = function(str){
	return (!this.equalTo(str));
}

String.prototype.stripHTML = function(){	
	return this.replace(/<script(.*?)>((.|\n)*?)(<\/script>)/ig, "").replace(/<(?:.|\s)*?>/ig,"").replace(/&(?:.|\s)*?;/ig, "");
}

//Extending Array Object Functionality
Array.prototype.count = function(){
	return (this.length);
}

Array.prototype.isEmpty = function(){	
	var c=0;
	for(var i=0; i<this.length; i++){
		if(this[i].isEmpty())
			c++;
	}
	return (c==this.length) ? true : false;
}

Array.prototype.find = function(key, intval){
	for(var i=0; i<this.count(); i++){
		if(this[i].equalTo(key))
			return ((intval) ? i : this[i].trim());
	}
	return false;
}

Array.prototype.findPos = function(key){
	return (this.find(key, 'in') + 1);
}

function Add(dest, source){
	for(var prop in source){
		dest[prop] = source[prop];
	}
}

function Remove(obj, prop){
	delete(obj[prop]);
}