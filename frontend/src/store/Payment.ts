import axios, { Axios } from "axios";
import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import { TPayCard, TPayCardToAdd } from "../another/interfaces";

const AddCardPopupString = [
  "Карта успешно добавлена",
  "Не удалось добавить карту",
  "Номер карты должен состоять из 16 цифр",
  "CVV карты должен состоять из 3 цифр",
];

class Payment {
  public Root: any;

  constructor(Root: any) {
    makeAutoObservable(this);
    this.Root = Root;
  }

  code: number | null = null;
  cards: TPayCard[] = [];
  paymentList: [] = [];
  popupStr: string = "";
  isPopupShow: boolean = true;
  pushId: number | null = null;
  selected: any = "";

  setSelected(value: string) {
    this.selected = value;
  }

  setShowPopup(boolean: boolean) {
    this.isPopupShow = boolean;
  }

  setCode(code: number) {
    this.code = code;
  }

  setCards(cards: TPayCard[]) {
    this.cards = cards;
  }

  addCard(card: TPayCardToAdd) {
    const dataValid = () => card.number.toString().length === 16 && card.cvv.toString().length === 3;

    if (this.cards.find((c) => c.number == card.number)) {
      this.Root.alerts.addAlert("Карта уже добавлена");
    } else {
      if (dataValid()) {
        const token = Cookies.get("session_token");
        const data = { token: token, number: card.number, cvv: card.cvv };

        axios
          .post("card/add", data)
          .then((res) => {
            let array = this.cards;
            array.push({ ...card, addDate: res.data.addDate });
            this.setCards(array);
            this.Root.alerts.addAlert("Карта успешно добавлена");
          })
          .catch((err) => {
            // попап карта не добавлена
            this.Root.alerts.addAlert("Не удалось добавить карту");
            console.log(`err`);
          });
      } else {
        if (card.number.toString().length !== 16) {
          this.Root.alerts.addAlert("Номер карты должен состоять из 16 цифр");
        }
        if (card.cvv.toString().length !== 3) {
          this.Root.alerts.addAlert("CVV карты должен состоять из 3 цифр");
        }
      }
    }
  }

  setPopupStr(str: string) {
    this.popupStr = str;
  }

  removeCard(number: number) {
    const token = Cookies.get("session_token");
    const data = { token: token, number: number };

    axios
      .post("/card/remove", data)
      .then((res) => {
        this.cards = this.cards.filter((card) => card.number != number);
        this.Root.alerts.addAlert("Карта успешно удалена");
      })
      .catch((err) => {
        // попап карта не удалена
        this.Root.alerts.addAlert("Не удалось удалить карту");
        console.log(`err`);
      });
  }

  requireCode(number: number) {
    if (this.Root.cars.currentCar) {
      const token = Cookies.get("session_token");
      const data = { token: token, number: number };
      axios
        .post("/card/require_code", data)
        .then((res) => {
          // this.setPopupStr(`Enter code  ( ${res.data.pushCode} ) `);
          // this.setShowPopup(true);

          this.Root.alerts.addAlert(`Enter code  ( ${res.data.pushCode} ) `);

          this.pushId = res.data.id;
        })
        .catch((err) => {
          // попап код не запрошен
          console.log(`err`);
        });
    }
  }

  handlePay() {
    if (this.code?.toString().length === 3) {
      const token = Cookies.get("session_token");
      const data = { token: token, cardId: this.Root.cars.currentCar.id, pushId: this.pushId, pushCode: this.code };

      console.log("send data", data);

      axios
        .post("/card/pay", data)
        .then((res) => {
          // заблочить машину, закинуть в текущие заказы, роут на заказы
          console.log(`всё ок`, res.data);
        })
        .catch((err) => {
          // не удалось подтвердить оплату
          console.log(`err`);
        });
    }
  }
}

export default Payment;
