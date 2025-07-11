import { useContext, useEffect, useState } from "react";
import { BuyContext } from "./BuyModal";

export const Shop = () => {
  const [vines, setVines] = useState([]);
  const { allVine, handleOrder } = useContext(BuyContext);

  useEffect(() => {
    if (allVine) {
      setVines(allVine.filter((item) => item.shopId));
    }
  }, [allVine]);

  return (
    <div className="vine__shop">
      <div className="vine__shop__grid">
        {vines.map((el) => (
          <div className="vine__shop__grid__element" key={el.shopId}>
            <img src={el.img} alt="" />
            <div className="vine__name">{el.name}</div>
            <div className="Vine__price">{el.price},00USD</div>
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
