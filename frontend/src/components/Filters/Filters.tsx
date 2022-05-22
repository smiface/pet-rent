import { observer } from "mobx-react-lite";
import style from "./Filters.module.scss";
import { useFilterRefs } from "./useFilterRefs";

const Filters = () => {
  const {  priceMinRef, priceMaxRef, handlePriceMin, handlePriceMax } = useFilterRefs();
  return (
    <section className={style.filters}>
      <h2>Filters</h2>
      <div className={style.filters_grid}>
        <div className={style.price}>
          <h3>
            <label htmlFor="price-min_input">Price min</label>
          </h3>
          <div>
            <input type="number" min="0" ref={priceMinRef} name="" id="price-min_input" onChange={(e) => handlePriceMin(e)} /> <p>$ per min</p>
          </div>
        </div>
        <div className={style.price}>
          <h3>
            {" "}
            <label htmlFor="price-max_input">Price max</label>
          </h3>
          <div>
            <input type="number" min="0" ref={priceMaxRef} name="" id="price-max_input" onChange={(e) => handlePriceMax(e)} /> <p>$ per min</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(Filters);
