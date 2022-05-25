import axios from "axios";
import { makeAutoObservable } from "mobx";
import { TCar } from "../another/interfaces";

class Cars {
  public Root: any;

  constructor(Root: any) {
    makeAutoObservable(this);
    this.Root = Root;
  }

  cars: TCar[] = [];
  filtredCars: TCar[] = [];
  currentCar: TCar | null = null;

  setCars(data: TCar[]) {
    this.cars = data;
  }

  setCurrentCar(car: TCar) {
    if (this.currentCar != car) {
      this.currentCar = car;
      this.Root.payment.setSelected("");
      this.Root.payment.setShowPopup(false);
    }
  }

  setFiltredCars(cars: TCar[]) {
    this.filtredCars = cars;
  }

  filterCars(setMinMax: boolean) {
    // by category
    if (setMinMax) {
      if (this.Root.filters.currentCategory) this.filtredCars = this.cars.filter((el) => el.category === this.Root.filters.currentCategory.title);
      this.Root.filters.setMinMaxRefs();
    } else {
      // by minmax
      this.filtredCars = this.cars;
      this.filtredCars = this.filtredCars.filter((el) => el.price >= this.Root.filters.priceMinRef.value);
      this.filtredCars = this.filtredCars.filter((el) => el.price <= this.Root.filters.priceMaxRef.value);
    }
  }

  loadCars(city: string) {
    this.Root.filters.setCurrentCity(city);
    const url = "/pick/cars:" + city.toLowerCase().replace(" ", "-");
    console.log(url);
    axios.get(url).then((res) => {
      this.setCars(res.data);
      this.setFiltredCars(res.data);
      this.Root.filters.setMinMaxRefs();
    });
  }
}

export default Cars;
