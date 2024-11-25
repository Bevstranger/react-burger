import styles from "../burger-constructor/burger-constructor.module.css";
import imgDone from "../../images/done.png";
import { useSelector } from "react-redux";
import loading from "../../images/loading.svg";
const OrderDetails = () => {
  const data = useSelector((state) => state.orderDetails);

  return (
    <div className={styles.detailsModal}>
      {data.orderRequest ? (
        <img src={loading} alt="loading" />
      ) : data.orderRequestError ? (
        <p>Error</p>
      ) : (
        <>
          <p className={`text text_type_digits-large pb-8 `}>{data.order}</p>
          <p className={`text text_type_main-medium pb-2`}>
            идентификатор заказа
          </p>
          <img src={imgDone} type="primary" className="pt-15 pb-15" />
          <p className={`text text_type_main-default pb-2 `}>
            Ваш заказ начали готовить
          </p>
          <p className={`text text_type_main-small `}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
