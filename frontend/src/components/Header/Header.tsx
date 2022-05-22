import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RootStore from "../../store/RootStore";
import style from "./Header.module.scss";

const Header = ({ cities }: any) => {
  //   useEffect(() => {
  //   }, [RootStore.filters.cities, cities]);

  // const params = useSearchParams()
  // console.log(`p`, params)
  const isCurrentCity = (city: string) => false;

  return (
    <header className={style.header}>
      <div className="wrapper  wow bounceInUp'">
        <Link to="/">
          <h1>RENT CAR DROM</h1>
        </Link>

        <div className={style.cities_links}>
          {RootStore.filters.cities.map((city) => (
            <Link to={"/city/" + city.toString()} key={city} className={RootStore.filters.currentCity == city ? style.boldLink : ""}>
              {city}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Link to={'/profile'}>GUEST</Link>
        <button onClick={() => RootStore.auth.logout()}>logout</button>
      </div>
    </header>
  );
};

export default observer(Header);
