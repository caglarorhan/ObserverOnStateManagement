const state = {};

function objectReMake(targetObject){
    if(typeof targetObject === 'object'){
        if(!targetObject.subsList){targetObject["subsList"]=[];}
        Object.defineProperty(targetObject,'tempProp',{
            set(updatedData){
                Object.entries(updatedData).forEach((entry)=>{
                    let key = entry[0];
                    let value = entry[1];
                    targetObject[key]=value;
                    //console.log(typeof value);
                    if(typeof value==='object'){
                        objectReMake(value);
                    }
                    //console.log('Data changed/updated')// We can use triggers here

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
objectReMake(state); //to initiate setter
//console.log(state);
state.tempProp={userInfo:{hair:'long', eye:'brown'}}; // tempProp is to trigging property change mechanism (setter)
//console.log(state);
state.subsList.push('deneme');
//console.log(state);
state.userInfo.tempProp={hair:'long', eye:'blue'}
state.userInfo.subsList.push('uyeler'); //subscribe method
//console.log(state);
state.userInfo.tempProp={hair:'long', eye: 'brown', beard:{type:'goat', length:'short'}}
//console.log(state)
state.userInfo.beard.subsList.push('Berberler');
//console.log(state);
state.userInfo.beard.tempProp={type:'goat', length:'short', color:'red', wide:true}


