/*
 * juDoc Plugin - JeeUtil JavaScript Library 
 * Version 1.1
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
	alert('JeeUtil JavaScript Library: Missing Information \n\n juDoc-x.x plugin required "juCore-x.x plugin", kindly include.');
}else{
ju.doc = new Object();

Add(ju.doc, {
	ver: '1.1',

	setValue: function(ele, val){		
		if(!ele || !val) return false;	
		ele = (ju.isString(ele)) ? ju.getObj(ele) : ele;	
		if(ele){			
			 if (ju.elementType(ele, 'input')){
				switch (ele.type.toLower()){
					case "checkbox":
					case "check-box":
					case "radio":
						ele.checked = val; return;		
					default:
						ele.value = val; return;
				}
			}
			
			if(ju.elementType(ele, 'select')){				 				
				var found  = false;
				//traverse through dropdown values
				for (var i = 0; i<ele.options.length; i++){
					if (ele.options[i].value == val){
						ele.options[i].selected = true;
						found = true;
					}
					else{
						ele.options[i].selected = false;
					}
				}
				if (found){	return; }	
				//traverse through dropdown display text
				val = val.toLower();
				for (i = 0; i<ele.options.length; i++){
					if (ele.options[i].text.equalTo(val)){
						ele.options[i].selected = true;
						break;
					}
				}				
				return;					
			}
			
			if (ju.elementType(ele, 'textarea'))
				ele.value = val.trim();
			ele.innerHTML = val.trim();
			return;
		}
		else{			
			return false;
		}		
	},
	
	getValue: function(ele){
		if(!ele) return false;	
		ele = (ju.isString(ele)) ? ju.getObj(ele) : ele;		
		if(ele){	
			if (ju.elementType(ele, 'input')){
				switch (ele.type.toLower()){
					case "checkbox":
					case "check-box":
					case "radio":
						return ele.checked;			
					default:
						return ele.value;
				}
			}
			
			if(ju.elementType(ele, 'select')){
				//to fetch multi-select option values
				if(ele.multiple){
					if(ele.length){
						var returnValue = new Array();
						var pos = 0;
						for(var i=0; i<ele.options.length; i++){
							if(ele.options[i].selected){
								returnValue[pos++] = ele.options[i].value;
							}
						}
						return returnValue;
					}
					return '';
				}
				else{
					//to fetch normal dropdown value
					if (ele.selectedIndex != -1){
						return ele.options[ele.selectedIndex].value.trim();					
					}
					else{
						return '';
					}
				}
			}
			
			if (ju.elementType(ele, 'textarea')){
				return ele.value.trim();
			}
			return ele.innerHTML.trim();			
		}
		else{			
			return false;
		}
	},
	
	isEmpty: function(obj){
		if(!obj) return null;
		with(this){
			try{
				var val = getValue(obj);
				return (val.isEmpty());
			}
			catch(e){					
				var val = new Array();
				val = getValue(obj);					
				return (val.isEmpty());
			}
		}		
	},
	
	isMailId: function(obj){
		if(!obj) return null;
		with(this){
			if(isEmpty(obj)) return 0;
			var email = getValue(obj);
			//assigning trim value to element
			setValue(obj, email);
		}			
		var pos_at = email.indexOf('@');
		var email_len = email.count();
		if(email.substr(email.indexOf('.') + 1).count() == 0) return false;
		if(email.indexOf('@') == -1) return false;
		if(email.indexOf('@') == -1 || email.indexOf('@') == 0 || email.indexOf('@') == email_len) return false;
		if(email.indexOf('.') == -1 || email.indexOf('.') == 0 || email.indexOf('.') == email_len) return false;
		if(email.indexOf('@', (pos_at +  1)) != -1) return false;
		if(email.substr(pos_at - 1, pos_at).equalTo('.') || email.substr(pos_at + 1, pos_at + 2).equalTo('.')) return false;
		if(email.indexOf('.', (pos_at + 2)) == -1) return false;
		if(email.indexOf(' ') != -1) return false;
		//for multiple @ symbal		
		if(email.match(/[@]/g) && (email.match(/[@]/g).length > 1)) return false;
		return true;			
	},
	
	isNumeric: function(obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.toLower() == 'text'){
				var regExp = /(^\d\d*$)/;
				return regExp.test(obj.value);
			}
			else return null;
		}
	},
	
	isInteger: function(obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.toLower() == 'text'){
				var regExp = /(^(\+|-)?\d\d*$)/;
				return regExp.test(obj.value);
			}
			else return null;
		}
	},
	
	isReal: function(obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.toLower() == 'text'){
				var regExp = /(^(\+|-)?\d\d*\.\d*$)|(^(\+|-)?\d\d*$)|(^(\+|-)?\.\d\d*$)/;
				return regExp.test(obj.value);
			}
			else return null;
		}
	},
	
	passCompare: function(objFrom, objTo){
		if(!objFrom || !objTo) return null;
		else{
			with(this){
				objFrom = (ju.isString(objFrom)) ? ju.getObj(objFrom) : objFrom;
				objTo = (ju.isString(objTo)) ? ju.getObj(objTo) : objTo;			
				if(ju.elementType(objFrom, 'input') && ju.elementType(objTo, 'input')){
					if((objFrom.type.equalTo('text') && objTo.type.equalTo('text')) || 
							(objFrom.type.equalTo('password') && objTo.type.equalTo('password'))){						
						if((objFrom.value.trim() == objTo.value.trim()) && 
								(!isEmpty(objFrom.value) && !isEmpty(objTo.value))){
							return true;
						}
						else return false;
					}
				}
			}
		}
	},
	
	validateForm: function(objList){		
		if(!objList) return null;
		objList = objList.split(',');
		var missingList = new Array();
		var count = 0;
		for(var i=0; i<objList.length; i++){				
			if(this.isEmpty(objList[i])){
				missingList[count++] = objList[i];
			}
		}
		return (count == 0) ? true : missingList;
	},
	
	compareDate: function (date1, date2, type){
		if(!date1 || !date2) return null;
		date1 = (date1) ? this.getValue(date1) : '';
		date2 = (date2) ? this.getValue(date2) : '';		
		type = (type) ? type : 'S';					
		if(type == 'S'){
			if((date1.count() == 10) && (date2.count() == 10)){				
				date1 = new Date(date1.substr(6), date1.substr(0,2)-1, date1.substr(3,2));
				date2 = new Date(date2.substr(6), date2.substr(0,2)-1, date2.substr(3,2));
			}
			else if((date1.count() == 8) && (date2.count() == 8)){
				date1 = new Date(date1.substr(4), date1.substr(0, 2)-1, date1.substr(2, 2));
				date2 = new Date(date2.substr(4), date2.substr(0, 2)-1, date2.substr(2, 2));
			}
		}
		else{
			if((date1.count() == 10) && (date2.count() == 10)){				
				date1 = new Date(date1.substr(6), date1.substr(3, 2)-1, date1.substr(0, 2));
				date2 = new Date(date2.substr(6), date2.substr(3, 2)-1, date2.substr(0, 2));			
			}
			else if((date1.count() == 8) && (date2.count() == 8)){						
				date1 = new Date(date1.substr(4), date1.substr(2, 2)-1, date1.substr(0, 2));
				date2 = new Date(date2.substr(4), date2.substr(2, 2)-1, date2.substr(0, 2));						
			}
		}
		if(date1 < date2)
			return -1;
		else if(date1.toString() == date2.toString())
			return 0;
		else if(date1 > date2)
			return 1;
	},
	
	isAlpha: function (obj){
		if(!obj) return null;
		with(this){
			obj = ju.getObj(obj);		
			//assigning trim value to element
			obj.value = obj.value.trim();
			if(ju.elementType(obj, 'input') && obj.type.equalTo('text')){					
				if(obj.value){
					var numRegExp = /[\d+]/g;
					var splRegExp = /[!@#$%^&\*\(\)\+=\-\[\]\\\';,./{}\|\":<>\?~_+]/g;
					if((obj.value.search(numRegExp) == -1) && (obj.value.search(splRegExp) == -1)){
						return true;
					}
					else{
						return false;
					}
				}					
			}
			return null;				
		}
	}
  });
}
	
