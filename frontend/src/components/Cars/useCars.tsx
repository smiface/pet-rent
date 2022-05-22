import { useEffect } from "react";
import { TCar, TCardItem } from "../../another/interfaces";
import RootStore from "../../store/RootStore";

const useCars = () => {
  const handleClick = (e: any, el: TCar) => {
    if (e.button === 1) {
      // do something on middle mouse button click
      window.open("/car/1", "_blank");
      console.log("mid");
    } else {
      RootStore.cars.setCurrentCar(el);
    }
  };
  const isCurrent = (el: TCardItem) => el.title === RootStore.cars.currentCar?.title;

  return { handleClick, isCurrent };
};

export { useCars };
