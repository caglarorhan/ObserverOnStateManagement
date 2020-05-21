const state = {};

function objectReMake(targetObject){
    if(typeof targetObject === 'object'){
        if(!targetObject.subsList){targetObject["subsList"]=[]; targetObject["subscribeMe"]= function(subs){this.subsList.push(subs); return true;}}
        Object.defineProperty(targetObject,'tempProp',{
            set(updatedData){
                Object.entries(updatedData).forEach((entry)=>{
                    let key = entry[0];
                    let value = entry[1];
                    targetObject[key]=value;
                    // console.log(`
                    // KEY: ${key}
                    // VALUE: ${value}
                    // `);
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
state.userInfo.tempProp={hair:'long', eye:'blue'}
//state.userInfo.subsList.push('uyeler'); //subscribe method, subscribing to userInfo with uyeler name
//console.log(state);
state.userInfo.tempProp={hair:'long', eye: 'brown', beard:{type:'goat', length:{inch:2}}};
console.log(JSON.stringify(state));
state.userInfo.beard.subscribeMe('berberler');
state.userInfo.beard.tempProp = {type:'goat', length:{inch:2, cm:6}};
state.userInfo.beard.length.subscribeMe('Stylist');
state.userInfo.beard.length.tempProp = {inch:2, cm:6, mt:0.06};
console.log(JSON.stringify(state));
