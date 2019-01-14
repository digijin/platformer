

class Global{

    values = {}

    get(key){
    	const value = this.values[key];
    	const prom = new Promise((resolve, reject)=>{
    		if(value){
    			resolve(value);
    		}
    	});
    	
    	return prom;
        
    }

    set(key, value){
    	this.values[key] = value;
    }
}


export default new Global();