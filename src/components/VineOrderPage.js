import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { vines } from "./BuyModal";

export const VineOrderPage = () => {
  const [vine, setVine] = useState({});
  const { vineName } = useParams();

  useEffect(() => {
    setVine(vines.find((item) => item.name === vineName));
  }, [vineName]);

  return (
    <div className="shop__page">
      <div className="shop__page__title">Store homepage</div>
      <div className="vine__order__page__flex">
        <div className="vine__order__page__flex__element">
          <div>
            <img src={vine.img} alt="" />
          </div>
          <button className="vine__order__page__flex__element__button">
            <img src={vine.img} alt="" />
          </button>
        </div>
        <div className="vine__order__page__flex__element">
          <div className="vine__isStock__text">{vine.inStock}</div>
          <div className="page__vine__name">{vine.name}</div>
          <div className="page__vine__product__code">
            Product code {vine.productCode}
          </div>
          <div className="page__vine__price">{vine.price},00 USD</div>
          <div className="page__vine__order">
            <input type="number" />
            <button className="page__vine__order__button">Add to cart</button>
          </div>
          <div className="description">Description</div>
          <div className="description__text">{vine.description}</div>
        </div>
      </div>
    </div>
  );
};
