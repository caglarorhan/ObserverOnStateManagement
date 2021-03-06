function observerOnState(targetObject){
    for (const key in targetObject) {
        if (targetObject.hasOwnProperty(key) && targetObject[key] instanceof Object && targetObject[key].constructor===Object && !Array.isArray(targetObject[key])) {
            let value = targetObject[key];
            if(!value.subsList){
                value["subsList"]=[];
                value["subscribeMe"]= function(subs){this.subsList.push(subs)};
                value["unSubscribeMe"] = function(subs){
                    while(value.subsList.indexOf(subs)>-1){
                        value.subsList.splice(value.subsList.indexOf(subs),1)
                    }
                }
            }
            Object.defineProperty(value, 'tmp',{
                set(v){
                    if(value.subsList){
                        value.subsList.forEach((item)=>{
                            console.log(`Publish to: ${item}`);// publisher comes to here
                        });
                    }
                }
            })
            observerOnState(value);
        }
    }
}

const state ={userInfo:{hair:'long', eye: 'brown', beard:{type:'goat', length:{inch:2}}, category:{face:'Johny', mustache:{tip:'Texan', length:22}}}}; //create state or empty state

observerOnState(state); // initiate setter
state.userInfo.category.mustache.subscribeMe('Barbers'); // Manage the subscription with subscribeMe and unSubscribeMe methods
state.userInfo.category.mustache.tmp={tip:'Mexican', length:22}; // use tmp trigger method to update a property
state.userInfo.category.mustache.tmp={tip:'Mexican', length:22, color:'red'}; //use tmp trigger method to update a property

