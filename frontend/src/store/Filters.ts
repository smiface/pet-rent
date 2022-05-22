import { makeAutoObservable } from "mobx";
import axios from "axios";
import { TCar, TCategory } from "../another/interfaces";
import Cookies from "js-cookie";

class Filters {
  public Root: any;
  constructor(Root: any) {
    makeAutoObservable(this);
    this.Root = Root;
  }

  cities: string[] = [];
  currentCity: string | null = null;
  priceMin: number | null = null;
  priceMax: number | null = null;
  categories: TCategory[] = [];
  currentCategory: TCategory | null = null;
  priceMinRef: any = null;
  priceMaxRef: any = null;

  setCities(cities: string[]) {
    this.cities = cities;
  }

  setCurrentCity(city: string) {
    this.currentCity = city;
  }

  loadCities() {
    const token = Cookies.get("session_token")
    if (token) {
      axios.get("/pick/cities").then((res) => {
        this.setCities(res.data);
      });
    }
  }

  setMinMaxRefs() {
    let array = this.Root.cars.filtredCars;
    console.log(`aray`, array);
    if (array.length > 1) {
      array.sort(function (a: TCar, b: TCar) {
        return a["price"] - b["price"];
      });
      this.Root.filters.priceMinRef.value = array[0].price;
      this.Root.filters.priceMaxRef.value = array[array.length - 1].price;
    }
    if (array.length === 1) {
      this.Root.filters.priceMinRef.value = array[0].price;
      this.Root.filters.priceMaxRef.value = array[0].price;
    }
    if (array.length === 0) {
      this.Root.filters.priceMinRef.value = 0;
      this.Root.filters.priceMaxRef.value = 0;
    }
  }

  setCategories(data: TCategory[]) {
    this.categories = data;
  }

  setCategory(category: TCategory) {
    this.currentCategory = category;
    this.Root.cars.filterCars(true);
  }

  loadCategories() {
    axios.get("/pick/categories").then((res) => this.setCategories(res.data));
  }

  setFilters(data: any) {
    if (data.priceMax) this.priceMax = data.priceMax;
    if (data.priceMin) this.priceMin = data.priceMin;
    this.Root.cars.filterCars();
  }
}

export default Filters;
