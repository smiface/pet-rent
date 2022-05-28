import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { TCardItem } from "../../another/interfaces";
import RootStore from "../../store/RootStore";
import style from "./Card.module.scss";
import { motion } from "framer-motion";
type TSize = "xs" | "m" | "xl";

// const availableSizes = new Set<TSize | undefined>(["xs", "m", "xl"]);

const Card = ({ size, item, fn, isActive }: { size?: TSize; item: TCardItem; fn: Function; isActive: boolean }) => {
  const getSize = () => "size-" + size?.toLowerCase();
  const cardEl = useRef(null);

  // useEffect(() => {
  //   if (getSize() == "size-m") {
  //     let arr = RootStore.cars.carsRefs;
  //     arr.push(cardEl);
  //     RootStore.cars.carsRefs = arr;
  //   }
  // }, [cardEl]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* <div ref={cardEl} className={"card " + style[getSize()]} onMouseDown={(e) => fn(e, item)}> */}
      <div  className={"card " + style[getSize()]} onMouseDown={(e) => fn(e, item)}>
        <h3 className={isActive ? style.active : ""}>{item.title.toUpperCase()}</h3>

        <div className={style.wrapper}>
          <img src={item.img} alt=""  />
        </div>
      </div>
    </motion.div>
  );
};

export default observer(Card);
