import Boost from "./Boost";
import Jump from "./Jump";
import DoubleJump from "./DoubleJump";
import Walk from "./Walk";
import Slam from "./Slam";
import Float from "./Float";
import Gravity from "./Gravity";
import MoveVertical from "./MoveVertical";
import MoveHorizontal from "./MoveHorizontal";
import RegenEnergy from "./RegenEnergy";
import UpdateMissile from "./UpdateMissile";
import UpdateGuns from "./UpdateGuns";
import UpdateGrapple from "./UpdateGrapple";

//Order matters. not yet but it will.
export default [
	Boost,
	Jump,
	DoubleJump,
	Walk,
	Slam,
	Float,
	Gravity,
	RegenEnergy,
	UpdateMissile,
	UpdateGuns,
	MoveHorizontal,
	MoveVertical,
	UpdateGrapple,
];