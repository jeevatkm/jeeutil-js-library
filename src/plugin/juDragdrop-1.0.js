/*
 * juDragdrop Plugin - JeeUtil JavaScript Library 
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

if(typeof ju == 'undefined'){ 
	alert('JeeUtil JavaScript Library: Missing Information \n\n juDragdrop-x.x plugin required "juCore-x.x plugin", kindly include.');
}else{
ju.dragdrop = new Object();

Add(ju.dragdrop, {
	ver: '1.0',

	_zIndex : 9999,
	group : null,
	isDragging : false,	
	_oElem : null,
	
	enable: function(ele, dragStartCall, dragCall, dragEndCall){
		if(ju.isUndefined(ele))
			return false;
		ele = ju.getObj(ele);	
		if(ele.nodeName.equalTo("UL"))
			return (this.makeContainer(ele, dragStartCall, dragCall, dragEndCall));
		else{
			var list = this.makeDraggable(ele);
			this.setCallback(ele, dragStartCall, dragCall, dragEndCall);
			return list;
		}
	},

	makeDraggable: function(group, inside) {		
		if(!ju.isUndefined(inside)){
			group.handle = group;
			group.handle.group = group;
	
			group.minX = group.minY = group.maxX = group.maxY = null;		
			group.threshold 	= 0;
			group.thresholdY 	= 0;
			group.thresholdX 	= 0;
	
			group._dragStart	= new Function();
			group._dragEnd 		= new Function();
			group._drag 		= new Function();
			
			group.onDragStart	= new Function();
			group.onDragEnd		= new Function();
			group.onDrag		= new Function();
			
			group.setDragHandle 	= this.setDragHandle;
			group.setDragThreshold 	= this.setDragThreshold;
			group.setDragThresholdX = this.setDragThresholdX;
			group.setDragThresholdY = this.setDragThresholdY;
			group.constrain 		= this.constrain;
			group.constVertical = this.constVertical;
			group.constHorizontal = this.constHorizontal;
			
			group.style["cursor"] = "move";
			group.style["position"] = "relative";
	
			group.onmousedown = this.onMouseDown;
		}
		else{
			if(ju.isUndefined(group))
				return false;
				
			group = ju.getObj(group);
			group.onmousedown = ju.dragdrop.invDragStart;
			
			group.onDragStart = new Function();
			group.onDrag = new Function();
			group.onDragEnd = new Function();
			
			group.style["cursor"] = "move";
			group.style["position"] = "relative";
	
			return group;
		}
	},
	
	setCallback: function(ele, dragStartCall, dragCall, dragEndCall) {
		if(!ju.isUndefined(ele)){
			ele.onDragStart = ju.getFunction(dragStartCall);
			ele.onDrag = ju.getFunction(dragCall);
			ele.onDragEnd = ju.getFunction(dragEndCall);
			return true;
		}
		else return false;
	},

	constVertical: function() {
		var nwOffset = ju.dragdrop.northwestOffset(this, true);
		this.minX = nwOffset.x;
		this.maxX = nwOffset.x;
	},

	constHorizontal: function() {
		var nwOffset = ju.dragdrop.northwestOffset(this, true);
		this.minY = nwOffset.y;
		this.maxY = nwOffset.y;
	},

	constrain: function(nwPosition, sePosition) {
		this.minX = nwPosition.x;
		this.minY = nwPosition.y;
		this.maxX = sePosition.x;
		this.maxY = sePosition.y;
	},

	setDragHandle: function(handle) {
		if (handle && handle != null) 
			this.handle = handle;
		else
			this.handle = this;

		this.handle.group = this;
		this.onmousedown = null;
		this.handle.onmousedown = this.onMouseDown;
	},

	setDragThreshold: function(threshold) {
		if (isNaN(parseInt(threshold))) return;
		this.threshold = threshold;
	},

	setDragThresholdX: function(threshold) {
		if (isNaN(parseInt(threshold))) return;
		this.thresholdX = threshold;
	},

	setDragThresholdY: function(threshold) {
		if (isNaN(parseInt(threshold))) return;
		this.thresholdY = threshold;
	},
	
	invDragStart: function(e) {
		var ele = ju.dragdrop._oElem = this;

		if (isNaN(parseInt(ele.style.left))) { ele.style.left = '0px'; }
		if (isNaN(parseInt(ele.style.top))) { ele.style.top = '0px'; }

		var x = ele.style.left.toInt();
		var y = ele.style.top.toInt();

		e = e ? e : window.event;
		ele.mouseX = e.clientX;
		ele.mouseY = e.clientY;

		ele.style["_zIndex"] = ele.style["zIndex"];
		ele.style["zIndex"] = ju.dragdrop._zIndex;
		ele.style["opacity"] = 0.70;

		ele.onDragStart(); //callback		

		document.onmousemove = ju.dragdrop.invDrag;
		document.onmouseup = ju.dragdrop.invDragEnd;
		return false;
	},
	
	invDrag: function(e) {
		var ele = ju.dragdrop._oElem;

		var x = ele.style.left.toInt();
		var y = ele.style.top.toInt();

		e = e ? e : window.event;
		ele.style.left = x + (e.clientX - ele.mouseX) + 'px';
		ele.style.top = y + (e.clientY - ele.mouseY) + 'px';

		ele.mouseX = e.clientX;
		ele.mouseY = e.clientY;

		ele.onDrag(); //callback

		return false;
	},
	
	invDragEnd: function() {
		var ele = ju.dragdrop._oElem;

		var x = ele.style.left.toInt();
		var y = ele.style.top.toInt();

		ele.style["zIndex"] = ele.style["_zIndex"]
		ele.style["opacity"] = "";
		
		ele.onDragEnd(); //callback

		document.onmousemove = null;
		document.onmouseup = null;
		ju.dragdrop._oElem = null;
	},

	onMouseDown: function(event) {
		event = ju.dragdrop.fixEvent(event);
		ju.dragdrop.group = this.group;

		var group = this.group;
		var mouse = event.windowCoordinate;
		var nwOffset = ju.dragdrop.northwestOffset(group, true);
		var nwPosition = ju.dragdrop.northwestPosition(group);
		var sePosition = ju.dragdrop.southeastPosition(group);
		var seOffset = ju.dragdrop.southeastOffset(group, true);

		group.originalOpacity = group.style.opacity;
		group.originalZIndex = group.style.zIndex;
		group.initialWindowCoordinate = mouse;
		
		group.dragCoordinate = mouse;
		group._dragStart(nwPosition, sePosition, nwOffset, seOffset);

		if (group.minX != null)
			group.minMouseX = mouse.x - nwPosition.x + group.minX - nwOffset.x;
		if (group.maxX != null) 
			group.maxMouseX = group.minMouseX + group.maxX - group.minX;

		if (group.minY != null)
			group.minMouseY = mouse.y - nwPosition.y + group.minY - nwOffset.y;
		if (group.maxY != null) 
			group.maxMouseY = group.minMouseY + group.maxY - group.minY;

		group.mouseMin = new ordinate(group.minMouseX, group.minMouseY);
		group.mouseMax = new ordinate(group.maxMouseX, group.maxMouseY);

		document.onmousemove = ju.dragdrop.onMouseMove;
		document.onmouseup = ju.dragdrop.onMouseUp;

		return false;
	},

	onMouseMove: function(event) {
		event = ju.dragdrop.fixEvent(event);
		var group = ju.dragdrop.group;
		var mouse = event.windowCoordinate;
		var nwOffset = ju.dragdrop.northwestOffset(group, true);
		var nwPosition = ju.dragdrop.northwestPosition(group);
		var sePosition = ju.dragdrop.southeastPosition(group);
		var seOffset = ju.dragdrop.southeastOffset(group, true);

		if (!ju.dragdrop.isDragging) {
			if (group.threshold > 0) {
				var distance = group.initialWindowCoordinate.distance(
						mouse);
				if (distance < group.threshold) return true;
			} else if (group.thresholdY > 0) {
				var deltaY = Math.abs(group.initialWindowCoordinate.y - mouse.y);
				if (deltaY < group.thresholdY) return true;
			} else if (group.thresholdX > 0) {
				var deltaX = Math.abs(group.initialWindowCoordinate.x - mouse.x);
				if (deltaX < group.thresholdX) return true;
			}

			ju.dragdrop.isDragging = true;
			group.style["zIndex"] = ju.dragdrop._zIndex;
			group.style["opacity"] = 0.70;
		}
		
		var adjusted = mouse.constrain(group.mouseMin, group.mouseMax);
		nwPosition = nwPosition.plus(adjusted.minus(group.dragCoordinate));
		nwPosition.reposition(group);
		group.dragCoordinate = adjusted;

		var offsetBefore = ju.dragdrop.northwestOffset(group, true);
		group._drag(nwPosition, sePosition, nwOffset, seOffset);
		var offsetAfter = ju.dragdrop.northwestOffset(group, true);

		if (!offsetBefore.equals(offsetAfter)) {
			var errorDelta = offsetBefore.minus(offsetAfter);
			nwPosition = ju.dragdrop.northwestPosition(group).plus(errorDelta);
			nwPosition.reposition(group);
		}

		return false;
	},

	onMouseUp: function(event) {
		event = ju.dragdrop.fixEvent(event);
		var group = ju.dragdrop.group;

		var mouse = event.windowCoordinate;
		var nwOffset = ju.dragdrop.northwestOffset(group, true);
		var nwPosition = ju.dragdrop.northwestPosition(group);
		var sePosition = ju.dragdrop.southeastPosition(group);
		var seOffset = ju.dragdrop.southeastOffset(group, true);

		document.onmousemove = null;
		document.onmouseup   = null;
		group._dragEnd(nwPosition, sePosition, nwOffset, seOffset);

		if (ju.dragdrop.isDragging) {			
			group.style["zIndex"] = group.originalZIndex;
			group.style["opacity"] = group.originalOpacity;
		}

		ju.dragdrop.group = null;
		ju.dragdrop.isDragging = false;

		return false;
	},

	fixEvent: function(event) {
		if (ju.isUndefined(event)) event = window.event;
		ju.dragdrop._fixEvent(event);

		return event;
	},

	firstContainer: null,
	lastContainer: null,
	
	makeContainer: function(list, dragStartCall, dragCall, dragEndCall) {				
		dragStartCall = ju.getFunction(dragStartCall);
		dragCall = ju.getFunction(dragCall);
		dragEndCall = ju.getFunction(dragEndCall);
		if (this.firstContainer == null) {
			this.firstContainer = this.lastContainer = list;
			list.previousContainer = null;
			list.nextContainer = null;
		} else {
			list.previousContainer = this.lastContainer;
			list.nextContainer = null;
			this.lastContainer.nextContainer = list;
			this.lastContainer = list;
		}
		list.onDragOver = new Function();
		list.onDragOut = new Function();
		
    	var items = list.getElementsByTagName( "li" );
		var val = new Array();

		for (var i = 0; i < items.length; i++) {
			ju.dragdrop.makeItemDragable(items[i], dragStartCall, dragCall, dragEndCall);
			val.push(items[i].innerHTML.trim());
		}
	
		list.orgVal = val.join('|');
		
		list.getOrginialValues = function(){
			return this.orgVal.trim().split('|');
		}

		list.getValues = function(){			
			obj = this.getElementsByTagName('li');
			var val = new Array();
			for(var i=0; i<obj.length;i++){
				val[i] = obj[i].innerHTML.trim();
			}
			return val;
		}

		return (list) ? list : null;
	},

	makeItemDragable: function(item, dragStartCall, dragCall, dragEndCall) {
		ju.dragdrop.makeDraggable(item, true);
		item.setDragThreshold(5);	
		item.isOutside = false;		
		item._dragStart = ju.dragdrop.grpDragStart;
		item._drag = ju.dragdrop.grpDrag;
		item._dragEnd = ju.dragdrop.grpDragEnd;
		item.onDragStart = dragStartCall;
		item.onDrag = dragCall;
		item.onDragEnd = dragEndCall;
	},

	grpDragStart: function(nwPosition, sePosition, nwOffset, seOffset) {
		var container = ju.dragdrop.firstContainer;		
		//alert(container.parentNode.innerHTML);
		while (container != null) {
			container.northwest = ju.dragdrop.northwestOffset( container, true );
			container.southeast = ju.dragdrop.southeastOffset( container, true );
			container = container.nextContainer;
		}		
		this.onDragStart();
		this.parentNode.onDragOver();
	},

	grpDrag: function(nwPosition, sePosition, nwOffset, seOffset) {		
		if (this.isOutside) {
			var container = ju.dragdrop.firstContainer;
			while (container != null) {
				if (nwOffset.inside( container.northwest, container.southeast ) ||
					seOffset.inside( container.northwest, container.southeast )) {					
					container.onDragOver();
					this.isOutside = false;					
					var tempParent = this.parentNode;
					//tempParent.removeChild( this );
					container.appendChild( this );
					//alert(this.innerHTML);
					//tempParent.parentNode.removeChild( tempParent );
					break;
				}
				container = container.nextContainer;
			}			
			if (this.isOutside)
				return;	

		} else if (!(nwOffset.inside( this.parentNode.northwest, this.parentNode.southeast ) ||
			seOffset.inside( this.parentNode.northwest, this.parentNode.southeast ))) {
			
			this.parentNode.onDragOut();
			this.isOutside = true;
			
			var container = ju.dragdrop.firstContainer;
			while (container != null) {
				if (nwOffset.inside( container.northwest, container.southeast ) ||
					seOffset.inside( container.northwest, container.southeast )) {					
					container.onDragOver();
					this.isOutside = false;
					//this.parentNode.removeChild( this );
					container.appendChild( this );
					break;
				}
				container = container.nextContainer;
			}
			
			if (this.isOutside) {
				var tempParent = this.parentNode.cloneNode( false );
				//this.parentNode.removeChild( this );
				tempParent.appendChild( this );
				document.getElementsByTagName( "body" ).item(0).appendChild( tempParent );
				return;
			}
		}		
		this.onDrag();
		var parent = this.parentNode;
				
		var item = this;
		var next = ju.nextItem(item);
		while (next != null && this.offsetTop >= next.offsetTop - 2) {
			var item = next;
			var next = ju.nextItem(item);
		}
		if (this != item) {
			ju.swap(this, next);
			return;
		}

		var item = this;
		var previous = ju.previousItem(item);
		while (previous != null && this.offsetTop <= previous.offsetTop + 2) {
			var item = previous;
			var previous = ju.previousItem(item);
		}
		if (this != item) {
			ju.swap(this, item);
			return;
		}
	},

	grpDragEnd: function(nwPosition, sePosition, nwOffset, seOffset) {
		if (this.isOutside) {
			var tempParent = this.parentNode;
			//this.parentNode.removeChild( this );
			//tempParent.parentNode.removeChild( tempParent );
			return;
		}
		this.onDragEnd();
		this.parentNode.onDragOut();
		this.style["top"] = "0px";
		this.style["left"] = "0px";
	},

	origin: new ordinate(0, 0),

	northwestPosition: function(element) {
		var x = element.style.left.toInt();
		var y = element.style.top.toInt();

		return new ordinate(isNaN(x) ? 0 : x, isNaN(y) ? 0 : y);
	},

	southeastPosition: function(element) {
		return ju.dragdrop.northwestPosition(element).plus(
				new ordinate(element.offsetWidth, element.offsetHeight));
	},

	northwestOffset: function(element, isRecursive) {
		var offset = new ordinate(element.offsetLeft, element.offsetTop);

		if (!isRecursive) return offset;

		var parent = element.offsetParent;
		while (parent) {
			offset = offset.plus(
					new ordinate(parent.offsetLeft, parent.offsetTop));
			parent = parent.offsetParent;
		}
		return offset;
	},

	southeastOffset: function(element, isRecursive) {
		return ju.dragdrop.northwestOffset(element, isRecursive).plus(
				new ordinate(element.offsetWidth, element.offsetHeight));
	},

	_fixEvent : function(event) {
		event.windowCoordinate = new ordinate(event.clientX, event.clientY);
	}
});
}

function ordinate(x, y) {
	this.x = x;
	this.y = y;
}

ordinate.prototype.toString = function() {
	return "(" + this.x + "," + this.y + ")";
}

ordinate.prototype.plus = function(that) {
	return new ordinate(this.x + that.x, this.y + that.y);
}

ordinate.prototype.minus = function(that) {
	return new ordinate(this.x - that.x, this.y - that.y);
}

ordinate.prototype.distance = function(that) {
	var deltaX = this.x - that.x;
	var deltaY = this.y - that.y;

	return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

ordinate.prototype.max = function(that) {
	var x = Math.max(this.x, that.x);
	var y = Math.max(this.y, that.y);
	return new ordinate(x, y);
}

ordinate.prototype.constrain = function(min, max) {
	if (min.x > max.x || min.y > max.y) return this;

	var x = this.x;
	var y = this.y;

	if (!ju.isNull(min.x)) x = Math.max(x, min.x);
	if (!ju.isNull(max.x)) x = Math.min(x, max.x);
	if (!ju.isNull(min.y)) y = Math.max(y, min.y);
	if (!ju.isNull(max.y)) y = Math.min(y, max.y);

	return new ordinate(x, y);
}

ordinate.prototype.reposition = function(element) {
	element.style["top"] = this.y + "px";
	element.style["left"] = this.x + "px";
}

ordinate.prototype.equals = function(that) {
	if (this == that) return true;
	if (!that || ju.isNull(that)) return false;

	return this.x == that.x && this.y == that.y;
}

ordinate.prototype.inside = function(northwest, southeast) {
	if ((this.x >= northwest.x) && (this.x <= southeast.x) &&
		(this.y >= northwest.y) && (this.y <= southeast.y)) {
		
		return true;
	}
	return false;
}
