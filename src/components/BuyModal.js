import { createContext, useContext, useEffect, useState } from "react";
import whiteVine from "../img/whiteVine.jpeg";
import redVine from "../img/redVine.jpeg";

export const vines = [
  {
    id: 1,
    subId: 1,
    img: redVine,
    name: "Cabarnet",
    price: 17,
  },
  {
    id: 2,
    subId: 2,
    img: whiteVine,
    name: "Sauvignon Blanc",
    price: 12,
  },
  {
    id: 3,
    subId: 3,
    img: redVine,
    name: "Syrah",
    price: 13,
  },
  {
    id: 4,
    subId: 4,
    img: whiteVine,
    name: "Pinot Grigio",
    price: 10,
  },
  {
    id: 5,
    subId: 1,
    img: redVine,
    name: "Cabarnet",
    price: 17,
  },
  {
    id: 6,
    subId: 2,
    img: whiteVine,
    name: "Sauvignon Blanc",
    price: 12,
  },
  {
    id: 7,
    subId: 3,
    img: redVine,
    name: "Syrah",
    price: 13,
  },
];

export const BuyContext = createContext();

export const BuyProvider = ({ children }) => {
  const [vinesOrder, setVinesOrder] = useState([]);
  const [isOrderModalButton, setIsOrderModalButton] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [countAllVines, setCountAllVines] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isDiscount, setIsDiscount] = useState();
  const [isPhone, setIsPhone] = useState();

  useEffect(() => {
    return () => {
      phone();
    };
  }, []);

  const phone = (usePhone) => {
    setIsPhone(usePhone);
  };

  useEffect(() => {
    if (totalCount === 0) {
      setIsOrderModalButton(false);
    } else setIsOrderModalButton(true);
  }, [totalCount]);

  useEffect(() => {
    setTotalCount(
      countAllVines.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.count;
      }, 0)
    );
  }, [countAllVines, vinesOrder]);

  const handleOpenModal = () => {
    setIsOrderModal(true);
  };

  const handleRemoveOrder = (name) => {
    const indexVine = countAllVines.findIndex((item) => {
      return item.name === name;
    });
    setTotalCount((prev) => prev - countAllVines[indexVine].count);
    setCountAllVines((prev) => {
      return prev.filter((item) => item.name !== name);
    });
  };
  const handleCloseModal = () => {
    setIsOrderModal(false);
  };
  const handleAddCountVine = (name, value) => {
    setCountAllVines((prev) => {
      const nessVineIndex = prev.findIndex((item) => item.name === name);
      if (nessVineIndex !== -1) {
        return prev.map((el, index) => {
          return index === nessVineIndex
            ? { ...el, count: parseInt(value) }
            : el;
        });
      } else return prev;
    });
  };

  const handleOrder = (vine) => {
    setIsOrderModalButton(true);
    setVinesOrder((prev) => (prev.includes(vine) ? prev : [...prev, vine]));
    setCountAllVines((prev) => {
      const existingVineIndex = prev.findIndex((el) => el.name === vine.name);
      if (existingVineIndex !== -1) {
        return prev.map((el, index) => {
          if (index === existingVineIndex) {
            return { ...el, count: el.count + 1 };
          }
          return el;
        });
      } else {
        if (isDiscount && isOrderModalButton) {
          return [
            ...prev,
            {
              img: vine.img,
              name: vine.name,
              price: vine.price - vine.price * 0.1,
              currency: vine.currency,
              count: 1,
            },
          ];
        } else
          return [
            ...prev,
            {
              img: vine.img,
              name: vine.name,
              price: vine.price,
              currency: vine.currency,
              count: 1,
            },
          ];
      }
    });
  };

  const handleDiscount = (promo, isDiscountAtive) => {
    setCountAllVines((prev) => {
      return promo
        ? prev.map((el) => {
            return { ...el, price: el.price - el.price * 0.1 };
          })
        : prev;
    });
    setIsDiscount(!isDiscountAtive);
  };

  return (
    <BuyContext.Provider
      value={{
        isOrderModalButton,
        vinesOrder,
        handleOrder,
        handleOpenModal,
        isOrderModal,
        handleCloseModal,
        countAllVines,
        handleAddCountVine,
        handleRemoveOrder,
        totalCount,
        handleDiscount,
        phone,
        isPhone,
      }}
    >
      {children}
    </BuyContext.Provider>
  );
};

export const Buy = () => useContext(BuyContext);

export const OrderButton = () => {
  const { isOrderModalButton, handleOpenModal, totalCount, handleCloseModal } =
    Buy();
  const [buttonOrderCount, setButtonOrderCount] = useState(0);

  useEffect(() => {
    setButtonOrderCount((prev) => {
      if (totalCount <= 9) {
        return totalCount;
      } else if (totalCount > 9) {
        return "9+";
      } else return prev;
    });
    if (totalCount === 0) {
      handleCloseModal();
    }
  }, [totalCount, handleCloseModal]);

  return (
    <>
      {isOrderModalButton ? (
        <button onClick={handleOpenModal} className="order__button">
          <svg
            id="svg2"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="defs6" />
            <g id="g10" transform="matrix(1.3333333,0,0,-1.3333333,0,32)">
              <path
                d="m 8.0926596,15.429785 8.2762924,-0.009 c 0.29522,-3.3e-4 0.503205,-0.40222 0.532917,-0.89985 l 0.414495,-6.9418698 c 0.02971,-0.49763 -0.237696,-0.89984 -0.532938,-0.89984 H 7.7583084 c -0.2952399,0 -0.5570339,0.40191 -0.5329142,0.89985 l 0.3343464,6.9000098 c 0.024134,0.49793 0.2376803,0.95085 0.532919,0.95053 z"
                id="path243"
                style={{
                  opacity: 1,
                  fill: "none",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "#333333",
                  strokeWidth: 1,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeDashoffset: 0,
                  strokeOpacity: 1,
                  paintOrder: "markers fill stroke",
                }}
              />
              <path
                d="m 14.876087,15.94637 a 2.6054041,2.6942251 0 0 1 -1.306789,2.335703 2.6054041,2.6942251 0 0 1 -2.609479,-0.0073 2.6054041,2.6942251 0 0 1 -1.2945014,-2.343008"
                id="path245"
                style={{
                  opacity: 1,
                  fill: "none",
                  fillOpacity: 1,
                  fillRule: "nonzero",
                  stroke: "#333333",
                  strokeWidth: 1,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 4,
                  strokeDasharray: "none",
                  strokeDashoffset: 0,
                  strokeOpacity: 1,
                  paintOrder: "markers fill stroke",
                }}
              />
            </g>
          </svg>
          <div className="count__order">{buttonOrderCount}</div>
        </button>
      ) : (
        <></>
      )}
    </>
  );
};
