import { makeAutoObservable } from "mobx";
import { TAlert } from "../another/interfaces";

class Alerts {
  Root: any;

  constructor(Root: any) {
    makeAutoObservable(this);
    this.Root = Root;
  }

  array: TAlert[] = [];
  lastId: number = 1;

  setArray(array: TAlert[]) {
    this.array = array;
  }

  addAlert(title: string) {
    let newItem = { id: this.lastId + 1, title: title };
    let newArray = [...this.array, newItem];
    this.lastId = this.lastId + 1;
    this.setArray(newArray);
  }

  removeAlert(id: number) {
    let newArray = this.array.filter((item) => item.id != id);
    this.setArray(newArray);
  }
}

export default Alerts;
