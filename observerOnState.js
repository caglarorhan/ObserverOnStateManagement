const state = {};

function objectReMake(targetObject){
    if(typeof targetObject === 'object'){
        if(!targetObject.subsList){
            targetObject["subsList"]=[];
            targetObject["subscribeMe"]= function(subs){this.subsList.push(subs); return true;}
            targetObject["unSubscribeMe"] = function(subs){
                while(this.subsList.indexOf(subs)>-1){
                    this.subsList.splice(this.subsList.indexOf(subs),1)
                }
                return true;
            }
        }
        Object.defineProperty(targetObject,'tempProp',{
            set(updatedData){
                Object.entries(updatedData).forEach((entry)=>{
                    let key = entry[0];
                    let value = entry[1];
                    targetObject[key]=value;
                    if(typeof value==='object'){
                        objectReMake(value);
                    }
                 });
                if(targetObject.subsList){
                    targetObject.subsList.forEach((item)=>{
                        console.log(`Publish to: ${item}`);// publisher comes to here
                    });
                }
            }
        })
    }
}

//console.log(state);
objectReMake(state); //to initiate setter and other methods
state.tempProp={userInfo:{hair:'long', eye:'brown'}}; // tempProp is to trigging property change mechanism (setter)
state.userInfo.tempProp={hair:'long', eye:'blue'}
state.userInfo.tempProp={hair:'long', eye: 'brown', beard:{type:'goat', length:{inch:2}}, category:{hair:'Johny', mustache:{type:'Texan', length:22}}};
// did not add subList into length property depth after 2 child is not affected
//state.userInfo.category.tempProp = {hair:'Johny', mustache:'Texas', eyebrows:'Mellow'}
console.log(JSON.stringify(state));


