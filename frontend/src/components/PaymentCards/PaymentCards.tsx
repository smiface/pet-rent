import { observer } from "mobx-react-lite";
import { TPayCard } from "../../another/interfaces";
import RootStore from "../../store/RootStore";
import style from "./PaymentCards.module.scss";

function PaymentCards({ cards }: { cards: TPayCard[] }) {
  return (
    <div className={style.cardsColumn}>
      <div className={style.cardLine}>
        <div>number</div>
        <div>cvv</div>
        <div>addDate</div>
      </div>
      {cards.map((el) => (
        <div className={style.cardLine} key={el.number}>
          <div>{el.number}</div>
          <div>{el.cvv}</div>
          <div>{new Date(el.addDate).toLocaleDateString()} {new Date(el.addDate).toLocaleTimeString()}</div>
          <button onClick={()=> {}}>
            <img src="./img/editCard.svg" alt="" />
          </button>
          <button onClick={()=> RootStore.payment.removeCard(el.number)}>
            <img src="./img/removeCard.svg" alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default observer(PaymentCards);
