// @flow

type WeaponList = {
    [id]: {
        type: string
    }
}

type WeaponState = {
    primary: {},
    secondary: {},
    arm: {},
    booster: {},
    ultimate: {},
}


export default function weapons(state:WeaponState, action:Object){

    if(!state){
        state = {
            primary: {starter: {type:'basic'}},
            secondary: {starter: {type:'basic'}},
            arm: {starter: {type:'basic'}},
            booster: {starter: {type:'basic'}},
            ultimate: {},
        }
    }

}