import React, { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import NewRecord from "./components/NewRecord";

function App() {
  const [numbers, setNumbers] = useState(allNewDice());
  const [rolls, setRolls] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const value = numbers[0].value;
    if (numbers.every((die) => die.isHeld)) {
      if (numbers.every((num) => num.value === value)) {
        setTenzies(true);
        if (localStorage.getItem("rolls")) {
          if (rolls < localStorage.getItem("rolls")) {
            console.log("fuhiyoo new record");
            localStorage.setItem("rolls", rolls);
            setNewRecord(true);
          }
        } else {
          localStorage.setItem("rolls", rolls);
        }
      }
    }
  }, [numbers]);

  function holdDice(event) {
    const currId = event.currentTarget.id;

    setNumbers((oldNumber) =>
      oldNumber.map((item) =>
        item.id === currId ? { ...item, isHeld: !item.isHeld } : item
      )
    );
  }

  function allNewDice() {
    let numberArray = [];
    for (let i = 0; i < 10; i++) {
      numberArray.push({
        value: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return numberArray;
  }

  function rollDice() {
    const tempArray = allNewDice();
    console.log(`new array`, tempArray);

    if (!tenzies) {
      setNumbers((oldNumber) => {
        for (let i = 0; i < 10; i++) {
          tempArray[i] = !oldNumber[i].isHeld
            ? { ...oldNumber[i], value: tempArray[i].value }
            : oldNumber[i];
        }
        setRolls((oldRolls) => oldRolls + 1);
        return tempArray;
      });
    } else {
      setTenzies(false);
      setNewRecord(false);
      setNumbers(tempArray);
      setRolls(0);
    }
  }

  const diceElements = numbers.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      id={item.id}
      holdDice={holdDice}
    />
  ));

  return (
    <main>
      {newRecord && <NewRecord />}
      {tenzies && (
        <Confetti
          width={400}
          height={400}
          tweenDuration={500}
          numberOfPieces={100}
        />
      )}
      <h1 className="title">TENZIES</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="DieContainer">{diceElements}</div>
      <button className={"roll-button"} onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <h3 className="rolls">
        Number of Rolls <span>{rolls}</span>
      </h3>
    </main>
  );
}

export default App;
