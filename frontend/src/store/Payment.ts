import axios from "axios";
import { makeAutoObservable } from "mobx";
import { TPayCard, TPayCardToAdd } from "../another/interfaces";

class Payment {
  constructor() {
    makeAutoObservable(this);
  }

  code: number | null = null;
  cards: TPayCard[] = [];
  paymentList: [] = [];

  setCode(code: number) {
    this.code = code
  }

  setCards(cards: TPayCard[]) {
    this.cards = cards;
  }

  addCard(card: TPayCardToAdd) {
    if (card.number.toString().length === 16 && card.cvv.toString().length === 3) {
      let array = this.cards;
      array.push({ ...card, addDate: Date.now() });
      this.setCards(array);
    }
  }

  removeCard(number: number) {
    this.cards = this.cards.filter((card) => card.number != number);
  }

  handlePay() {
    console.log(this.code)
    // if (this.code?.toString().length === 3) {
    //   axios.get("/pay.json").then((res) => console.log(res.data));
    // }
  }
}

export default Payment;
