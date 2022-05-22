import { observer } from "mobx-react-lite";
import { TCar } from "../../another/interfaces";
import Card from "../Card/Card";
import style from "./Cars.module.scss";
import { useCars } from "./useCars";
import { AnimatePresence } from "framer-motion";

const Cars = ({ cars }: { cars: TCar[] }) => {
  const { handleClick, isCurrent } = useCars();

  return (
    <section className={style.cars}>
      <h2>Cars</h2>
      <div className={style.cars_grid}>
        <AnimatePresence exitBeforeEnter>
          {cars.length ? (
            cars.map((el) => <Card isActive={isCurrent(el)} size="m" key={el.title} item={el} fn={(e: any) => handleClick(e, el)} />)
          ) : (
            <p>No cars availible</p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default observer(Cars);
