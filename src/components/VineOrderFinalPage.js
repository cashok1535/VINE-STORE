import { useContext, useEffect, useState } from "react";
import { BuyContext } from "./BuyModal";

export const VineOrderFinalPage = () => {
  const [allVine, setAllVine] = useState([]);
  const [personOrder, setPersonOrder] = useState({});
  const [countVines, setCountVines] = useState(0);
  const [allPrice, setAllPrice] = useState(0);
  const {
    personInfo,
    countAllVines,
    handleOpenOrderPage,
    handleCloseOrderPage,
    handleLinkOpen,
    handleLinkClose,
  } = useContext(BuyContext);

  useEffect(() => {
    handleLinkOpen();
    return () => {
      handleLinkClose();
    };
  }, [handleLinkOpen, handleLinkClose]);

  useEffect(() => {
    handleOpenOrderPage();
    return () => {
      handleCloseOrderPage();
    };
  }, [handleCloseOrderPage, handleOpenOrderPage]);

  useEffect(() => {
    if (countAllVines.length > 0) {
      localStorage.setItem("vineInfo", JSON.stringify(countAllVines));
      localStorage.setItem("personInfo", JSON.stringify(personInfo));
    }
  }, [countAllVines, personInfo]);

  useEffect(() => {
    const vine = localStorage.getItem("vineInfo");
    setAllVine(JSON.parse(vine));
    const person = localStorage.getItem("personInfo");
    setPersonOrder(JSON.parse(person));
  }, []);

  useEffect(() => {
    setCountVines(
      allVine.reduce((tot, acc) => {
        return (tot += acc.count);
      }, 0)
    );
    setAllPrice(
      allVine.reduce((tot, acc) => {
        return (tot += acc.count * acc.price);
      }, 0)
    );
  }, [allVine]);

  return (
    <div className="vine__order__final__page">
      <div className="vine__shop__title">Thank you for your order!</div>
      <div className="vine__order__final__page__flex">
        <div className="vine__order__final__page__flex__element vine__flex__element">
          <div className="count__vines">
            #{String(countVines).padStart(6, "0")}
          </div>
          <div className="vine__order__flex">
            {allVine.map((el, index) => (
              <div className="vine__order__flex__element" key={index}>
                <img className="vine__order__img" src={el.img} alt="" />
                <div className="vine__order__name">{el.name}</div>
                <div className="vine__order__count">{el.count}x</div>
                <div className="vine__order__price">
                  {parseFloat(el.count * el.price)
                    .toFixed(2)
                    .replace(".", ",")}
                  USD
                </div>
              </div>
            ))}
          </div>
          <div className="vine__order__total__price">
            Total::
            <span className="total">
              {parseFloat(allPrice).toFixed(2).replace(".", ",")}
              USD
            </span>
          </div>
        </div>
        <div className="vine__order__final__page__flex__element">
          <div className="vine__order__customer__title">Customer details</div>
          <div className="vine__order__customer__text">
            Name: {personOrder.name}
          </div>
          <div className="vine__order__customer__text">
            Email: {personOrder.email}
          </div>
          <div className="vine__order__customer__text">
            Phone: {personOrder.phone}
          </div>
          <div className="vine__order__customer__text">
            Comment: {personOrder.comment}
          </div>
        </div>
      </div>
    </div>
  );
};
