import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RootStore from "../../store/RootStore";
import Store from "../../store/RootStore";
import style from "./Footer.module.scss";

const Footer = () => {
  const CardNumberEnd = (number: number) => number.toString().slice(number.toString.length - 5);

  const handleTypeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (RootStore.payment.isPopupShow) RootStore.payment.setShowPopup(false);
    if (e.target.value.length > 3) {
      RootStore.payment.setPopupStr("Maximum three numbers code");
      RootStore.payment.setShowPopup(true);
    }
    if (e.target.value.length === 3) {
      RootStore.payment.setCode(Number(e.target.value));
    }
  };

  const handleSelectCard = (e: React.ChangeEvent<HTMLSelectElement>) => {
    RootStore.payment.setSelected(e.target.value);
    RootStore.payment.requireCode(Number(e.currentTarget.value));
  };

  return (
    <footer className={style.footer}>
      <h2>Payment</h2>

      <div className={style.wrapper}>
        <p>Start price: {Store.cars.currentCar ? Store.cars.currentCar.price * 10 : 0} $</p>

        {RootStore.payment.isPopupShow ? (
          <div className={style.popup}>
            {RootStore.payment.popupStr}
            <button onClick={() => RootStore.payment.setShowPopup(false)}>
              <p>x</p>
            </button>
          </div>
        ) : (
          false
        )}

        <select value={RootStore.payment.selected} onChange={(e) => handleSelectCard(e)}>
          <option value="card">Card :</option>
          {Store.payment.cards.map((el) => (
            <option key={el.number} value={el.number}>
              {CardNumberEnd(el.number)}
            </option>
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
