import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Cars from "../../components/Cars/Cars";
import Categories from "../../components/Categories/Categories";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RootStore from "../../store/RootStore";
import style from "./Home.module.scss";

const HomePage = () => {
  let params = useParams();

  useEffect(()=>{
      RootStore.filters.loadCities()
  },[])

  useEffect(()=>{
      RootStore.filters.loadCategories()
     if (params.city)  RootStore.cars.loadCars(params.city)
  },[params])

  return (
    <div className={style.home}>
      <Header cities={RootStore.filters.cities} />
      <Categories categories={RootStore.filters.categories} />
      <Filters />
      <Cars cars={RootStore.cars.filtredCars} />
      <Footer />
    </div>
  );
};

export default observer(HomePage);
