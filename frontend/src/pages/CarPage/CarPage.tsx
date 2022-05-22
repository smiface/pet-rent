import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RootStore from "../../store/RootStore";
import style from "./CarPage.module.scss";

const CarPage = () => {
  const params = useParams();
  const [mainImg, setMainImg] = useState("");
  const handleClick = (path: string) => setMainImg(path);

  useEffect(() => {
    setMainImg(RootStore.car.images[0]);
  }, [RootStore.car.images]);

  useEffect(() => {
    RootStore.car.loadCar(Number(params.id));
  }, []);

  return (
    <div className={style.carPage}>
      <Header />
      <div className={style.container}>
        <h2>Car Page</h2>
        <p>{RootStore.car.title}</p>
        <p>{RootStore.car.category}</p>

        <div className={style.images}>
          <div className={style.mainImage}>
            <img src={mainImg} alt="" />
          </div>
          <div className={style.previews}>
            {RootStore.car.images.map((el) => (
              <img key={el} onClick={() => handleClick(el)} src={el} />
            ))}
          </div>
        </div>
      </div>

      <p>{RootStore.car.about}</p>
      <p>Price per min : {RootStore.car.price} $</p>
      <Footer />
    </div>
  );
};

export default observer(CarPage);
