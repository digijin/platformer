
export const GROUNDED = "grounded";
export const AIRBORNE = "airborne";
export const CLIMB = "climing";
export const DASH = "dashing";
export const SLAM = "slamming";
export const GRAPPLE = "grappling";


const State = { GROUNDED, AIRBORNE, CLIMB, DASH, SLAM, GRAPPLE };

export default State;

export const ALL = [GROUNDED, AIRBORNE, CLIMB, DASH, SLAM, GRAPPLE];

export type PlayerStateType = "grounded"|"airborne"|"climing"|"dashing"|"slamming"|"grappling";