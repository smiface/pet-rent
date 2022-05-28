import { useState } from "react";
import RootStore from "../../store/RootStore";
import style from "./AddPaymentCard.module.scss";

function AddPaymentCard() {
  const [number, setNumber] = useState(0);
  const [cvv, setCvv] = useState(0);

  return (
    <div className={style.cardLine}>
      <input placeholder="number" type="number" onChange={(e) => setNumber(Number(e.target.value))} />
      <input placeholder="svv" max="999" type="number" onChange={(e) => setCvv(Number(e.target.value))} />
      <button onClick={() => RootStore.payment.addCard({ number: number, cvv: cvv })}>Add</button>
      
    </div>
  );
}

export default AddPaymentCard;
