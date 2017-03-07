function queue(max_items){
	/*
	//-------- FIFO queue implementation in javascript --------//
				Takes max_items as numerical input			

	 Usage: 	q = new queue(max_items=2);
				
				q.push(1)		// 	returns null   (will return popped item when queue is full)
				q.peek()		//	returns 1 	   (front of queue)
				q.contents()	//	returns [1]	   (full queue contents as sorted array)
				
				q.push(2)		// 	returns null
				q.peek()		//	returns 1
				q.contents()	//	returns [1,2]
				
				q.push(3)		//	returns 1
				q.peek()		//	returns 2
				q.contents()	// 	returns [2,3]
	*/
	
	this.max_items = max_items;
	this.num_items = 0;
	this.pointer = 0;

	this.push = function(item){
	//	PUSH: add item to end of queue; if queue is full, pop and return front of queue; else return null
		if ( this.num_items < this.max_items ){
			var out_item = null;
			this.num_items++;
		}else{
			var out_item = this[this.pointer - this.max_items];
			delete this[this.pointer - this.max_items];
		}
			this[this.pointer] = item;
			this.pointer++;	
			return out_item;
	}	
		
	this.peek = function(){
	// PEEK: return item at front of queue (queue remains unchanged)
		return this[this.pointer - this.num_items];
	}
		
	this.contents = function(){	
	// CONTENTS: returns sorted queue as array; item zero is front of queue		
		var keys = [];
		for (var k in this){
			keys.push(k);
		}
		keys.sort();
		
		var contents = [];
		for (k=0; k < keys.length; k++){
			! isNaN(keys[k]) ? contents.push(this[keys[k]]) : {};
		}
		return contents;
	}
}

