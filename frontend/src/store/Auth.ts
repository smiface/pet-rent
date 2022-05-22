import axios from "axios";
import { makeAutoObservable } from "mobx";
import Cookies from 'js-cookie';

class Auth {
  Root: any;

  constructor(Root: any) {
    makeAutoObservable(this);
    this.Root = Root;
  }

  id = 0;

  setId(id: number) {
    this.id = id;
  }

  login() {
    Cookies.set('session_token', "1")
    this.auth();
  }

  logout() {
    Cookies.remove('session_token')
    this.setId(-1);
  }

  auth() {
    // const token = localStorage.getItem("session_token");
    const token = Cookies.get('session_token')
    if (token) {
      const data = { token: token };

      axios.post('/user/auth', data).then(res => {
        if (res.status === 200) {
          this.setId(res.data.id);
          this.Root.payment.setCards(res.data.cards);
        }
      });
    } else {
      this.logout();
    }
  }
}

export default Auth;
