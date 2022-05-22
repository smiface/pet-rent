import { observer } from "mobx-react-lite";
import AddPaymentCard from "../../components/AddPaymentCard/AddPaymentCard";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PaymentCards from "../../components/PaymentCards/PaymentCards";
import RootStore from "../../store/RootStore";
import style from './PaymentPage.module.scss';

const PaymentPage = () => {
  return (
    <div className={style.paymentPage}>
      <Header/>
      <h2>PaymentPage</h2>
      <AddPaymentCard />
      <PaymentCards cards={RootStore.payment.cards} />
      <Footer />
    </div>
  );
};

export default observer(PaymentPage);
