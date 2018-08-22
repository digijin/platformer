
export const GROUNDED = "grounded";
export const AIRBORNE = "airborne";
export const CLIMB = "climing";
export const DASH = "dashing";
export const SLAM = "slamming";


const State = { GROUNDED, AIRBORNE, CLIMB, DASH };

export default State;

export type PlayerStateType = "grounded"|"airborne"|"climing"|"dashing"|"slamming";