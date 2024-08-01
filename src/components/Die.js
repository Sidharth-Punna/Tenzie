import React from "react";

function Die(props) {
  return (
    <div
      id={props.id}
      className={`Die ${props.isHeld ? "held" : ""}`}
      onClick={props.holdDice}
    >
      <p>{props.value}</p>
    </div>
  );
}

export default Die;
