import Card from "../Card/Card";
import { TCardItem, TCategory } from "../../another/interfaces";
import style from "./Categories.module.scss";
import RootStore from "../../store/RootStore";

const Categories = ({ categories }: { categories: TCategory[] }) => {
  const handleClick = (e: any, category: TCategory) => {
    if (e.button === 1) {
     e.preventDefault()
    } else {
      RootStore.filters.setCategory(category);
    }
  };

  const isCurrent = (el: TCardItem) => el.title === RootStore.filters.currentCategory?.title;

  return (
    <section className={style.categories}>
      <h2>Categories</h2>
      <div className={style.categories_grid}>
        {categories.map((el) => (
          <Card size="xs" isActive={isCurrent(el)} key={el.title} item={el} fn={(e: any) => handleClick(e, el)} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
