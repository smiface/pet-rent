import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import RootStore from "../../store/RootStore";
import Store from "../../store/RootStore";
import style from "./Footer.module.scss";

const Footer = () => {
  const CardNumberEnd = (number: number) => number.toString().slice(number.toString.length - 5);
  const [showPoput, setShowPopup] = useState(false);
  const [poputStr, setPopupStr] = useState("Enter code from SMS here");

  const handleTypeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showPoput) setShowPopup(false);
    if (e.target.value.length > 3) {
      setPopupStr("Maximum three numbers code");
      setShowPopup(true);
    } 
    if (e.target.value.length === 3) {
      RootStore.payment.setCode(Number(e.target.value));
    }
  };

  const handleSelectCard = () => {
    setPopupStr("Enter code from SMS here");
    setShowPopup(true);
  };

  return (
    <footer className={style.footer}>
      <h2>Payment</h2>

      <div className={style.wrapper}>
        <p>Start price: {Store.cars.currentCar ? Store.cars.currentCar.price * 10 : 0} $</p>

        {showPoput ? (
          <div className={style.popup}>
            {poputStr}
            <button onClick={() => setShowPopup(false)}>
              <p>x</p>
            </button>
          </div>
        ) : (
          false
        )}

        <select defaultValue={"card"} onChange={() => handleSelectCard()}>
          <option value="card" hidden disabled>
            Card :
          </option>
          {Store.payment.cards.map((el) => (
            <option key={el.number}>{CardNumberEnd(el.number)}</option>
          ))}
        </select>

        <div className={style.code}>
          <p>
            <label htmlFor="code_input">Code:</label>
          </p>
          <input type="number" name="" id="code_input" min="3" max="10" maxLength={3} onChange={(e) => handleTypeCode(e)} />
        </div>
        <button onClick={() => RootStore.payment.handlePay()}>Pay</button>
      </div>

      <nav>
        <Link to="/">H</Link>
        <Link to="/feedback">F</Link>
        <Link to="/payment">P</Link>
        <Link to="/info">I</Link>
      </nav>
    </footer>
  );
};

export default observer(Footer);