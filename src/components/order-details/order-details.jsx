import styles from "../burger-constructor/Burger-Constructor.module.css";
import imgDone from "../../images/done.png";

const OrderDetails = () => {
  return (
    <div className={styles.detailsModal}>
      <p className={`text text_type_digits-large pb-8 `}>034536</p>
      <p className={`text text_type_main-medium pb-2`}>идентификатор заказа</p>
      <img src={imgDone} type="primary" className="pt-15 pb-15" />
      <p className={`text text_type_main-default pb-2 `}>
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-small `}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
