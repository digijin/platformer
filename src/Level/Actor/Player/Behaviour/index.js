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
import RenderGrapple from "./RenderGrapple";
import FocusCamera from "./FocusCamera";
import Dash from "./Dash";

//Order matters. not yet but it will.
export default [
	Boost,
	Dash,
	Jump,
	DoubleJump,
	Walk,
	Gravity,
	Slam,
	Float,
	RegenEnergy,
	UpdateMissile,
	UpdateGuns,
	MoveHorizontal,
	MoveVertical,
	UpdateGrapple,
	RenderGrapple,
	FocusCamera,
];