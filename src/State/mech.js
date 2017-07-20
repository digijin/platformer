//@flow

type MechState = {
    primary: string,
    secondary: string,
    arm: string,
    booster: string,
    ultimate: string,
    weapons: Object
}

export default function mech(state:MechState, action:Object){
    if(!state){
        state = {
            primary: 'starter',
            secondary: 'starter',
            arm: 'starter',
            booster: 'starter',
            ultimate: 'starter',
            weapons: {}
        }
    }
}