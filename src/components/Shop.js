import { useContext, useEffect, useState } from "react";
import { BuyContext } from "./BuyModal";
import { Link } from "react-router-dom";

export const Shop = () => {
  const [vines, setVines] = useState([]);
  const { allVine, handleOrder, handleLinkOpen } = useContext(BuyContext);

  useEffect(() => {
    if (allVine) {
      setVines(allVine.filter((item) => item.shopId));
    }
  }, [allVine]);

  useEffect(() => {
    handleLinkOpen();
  }, [handleLinkOpen]);

  return (
    <div className="vine__shop">
      <div className="vine__shop__title">Store homepage</div>
      <div className="vine__shop__title vine__shop__second__title">
        Products
      </div>
      <div className="vine__shop__grid">
        {vines.map((el) => (
          <div className="vine__shop__grid__element" key={el.shopId}>
            <Link className="link" to={`${el.name}`}>
              <img className="vine__shop__img" src={el.img} alt="" />
              <div className="vine__shop__name">{el.name}</div>
              <div className="vine__shop__price">{el.price},00USD</div>
            </Link>
            <button
              onClick={() => {
                handleOrder(el);
              }}
              className="vine__shop__button"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
