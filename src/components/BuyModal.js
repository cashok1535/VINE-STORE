import { createContext, useContext, useEffect, useState, useRef } from "react";
import whiteVine from "../img/whiteVine.jpeg";
import redVine from "../img/redVine.jpeg";
import black from "../img/black.jpeg";
import green from "../img/green.jpeg";
import blue from "../img/blue.jpeg";
import purple from "../img/purple.jpeg";

export const vines = [
  {
    shopId: 1,
    id: 1,
    subId: 1,
    img: redVine,
    name: "Cabarnet",
    price: 17,
    inStock: "In stock",
    productCode: 18,
    description:
      "If you don't want which red wine to buy, think of this Cabernet. It has a very deep dark purple color and opens with boysenberry, bourbon, and vanilla aromas. Then you'll feel brown sugar, cocoa, spices, and currants. It's a wine with a really rich taste.",
  },
  {
    shopId: 2,
    id: 2,
    subId: 2,
    img: whiteVine,
    name: "Sauvignon Blanc",
    price: 12,
    inStock: "In stock",
    productCode: 22,
    description:
      "Light yet unique in character, this Sauvignon Blanc by CaliWines is filled with aromas of apple, grapefruit, gooseberry, and guava. This wine is light bodied with a fresh finish and a light yellow color.",
  },
  {
    shopId: 3,
    id: 3,
    subId: 3,
    img: redVine,
    name: "Syrah",
    price: 13,
    inStock: "In stock",
    productCode: 19,
    description:
      "This intense wine has aromas of violets, red fruit, cherry, blackberry, and vanilla. It also features rich flavors of blackberry, black cherry, plum, and vanilla with silky tannins and a rich finish.",
  },
  {
    shopId: 4,
    id: 4,
    subId: 4,
    img: whiteVine,
    name: "Pinot Grigio",
    price: 10,
    inStock: "In stock",
    productCode: 23,
    description:
      "Bright golden color. Gentle aromas and flavors of peach cobbler, honeydew, and apple with a silky, fruity-yet-dry medium body, and lemon and nut in the finish.",
  },
  {
    id: 5,
    subId: 1,
    img: redVine,
    name: "Cabarnet",
    price: 17,
    inStock: "In stock",
    productCode: 18,
  },
  {
    id: 6,
    subId: 2,
    img: whiteVine,
    name: "Sauvignon Blanc",
    price: 12,
    inStock: "In stock",
    productCode: 22,
  },
  {
    id: 7,
    subId: 3,
    img: redVine,
    name: "Syrah",
    price: 13,
    inStock: "In stock",
    productCode: 19,
  },
];

export const redWhitevines = [
  {
    shopId: 5,
    id: 1,
    img: black,
    name: "Pinot Noir",
    price: 12,
    inStock: "In stock",
    productCode: 20,
    description: `It is one of the lightest red wines. Pinot Noir is easy to drink, it won't punch you in the face like some reds can and is perfect for romantic evenings and meetings with friends. Our Pinot Noir has a "light body" and feels silky to the tongue. You might taste bright berries like raspberry and cranberry.`,
  },
  {
    shopId: 6,
    id: 2,
    img: green,
    name: "Riesling",
    price: 16,
    inStock: "In stock",
    productCode: 24,
    description: `Dazzling silver-gold in color, with intense mineral aromas of shale, gravel, and limestone, combined with notes of white flower, green apple, peach, and lemon oil. You can smell the flavors of fresh apricot, lime, and grapefruit pith.`,
  },
  {
    shopId: 7,
    id: 3,
    img: blue,
    name: "Zifandel",
    price: 14,
    inStock: "In stock",
    productCode: 21,
    description: `This wine is produced from more ripened berries than usual. Core flavors are rich, with jammy blackberries and mocha. You can pair this wine with braised ribs, chicken enchiladas, or dark chocolate.`,
  },
  {
    shopId: 8,
    id: 4,
    img: purple,
    name: "Soave",
    price: 12,
    inStock: "In stock",
    productCode: 25,
    description: `Our Californian tribute to Italian wine varieties.

Light straw color. Delicate and gentle aroma of sweet field flowers: camomile, elder, and iris. Minced palate with almond aftertaste. Pairs with steamed fish, fresh cheese, and mussels.`,
  },
];

export const BuyContext = createContext();

export const BuyProvider = ({ children }) => {
  const [isOrderModalButton, setIsOrderModalButton] = useState(false);
  const [isOrderPage, setIsOrderPage] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [countAllVines, setCountAllVines] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isDiscount, setIsDiscount] = useState();
  const [isPhone, setIsPhone] = useState(false);
  const [isHeaderBlack, setIsHeaderBlack] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(null);
  const [allVine, setAllVine] = useState();
  const [personInfo, setPersonInfo] = useState({});
  const bodyRef = useRef(document.body);

  const handlePersonInfo = (personInfo) => {
    setPersonInfo(personInfo);
  };

  useEffect(() => {
    setCountAllVines(countAllVines);
  }, [countAllVines]);

  useEffect(() => {
    setAllVine([...vines, ...redWhitevines]);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (bodyRef.current) {
        setWrapperWidth(bodyRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (wrapperWidth < 992) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }, [wrapperWidth]);

  useEffect(() => {
    return () => {
      phone();
    };
  }, []);

  const phone = (usePhone) => {
    setIsPhone(usePhone);
  };

  useEffect(() => {
    if (countAllVines.length === 0 || isOrderPage) {
      setIsOrderModalButton(false);
    }
  }, [totalCount, countAllVines, isOrderPage]);

  useEffect(() => {
    if (countAllVines.length > 0) {
      setTotalCount(
        countAllVines.reduce((accumulator, currentObject) => {
          return accumulator + currentObject.count;
        }, 0)
      );
    } else setTotalCount(0);
  }, [countAllVines]);

  const handleOpenModal = () => {
    setIsOrderModal(true);
    localStorage.removeItem("vineInfo");
    localStorage.removeItem("personInfo");
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

  const handleAddCountVine = (vine, value) => {
    setCountAllVines((prev) => {
      const nessVineIndex = prev.findIndex((item) => item.name === vine.name);
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

  const handleOrderFromShop = (vine, count) => {
    setIsOrderModalButton(true);
    setCountAllVines((prev) => {
      const isNecessaryVine = prev.findIndex((item) => item.name === vine.name);
      if (isNecessaryVine !== -1) {
        return prev.map((el) => {
          return el.name === vine.name
            ? {
                ...el,
                count: Number(el.count) + Number(count),
              }
            : el;
        });
      } else {
        return [
          {
            img: vine.img,
            name: vine.name,
            price: vine.price,
            currency: vine.currency,
            count: count,
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

  const handleLinkOpen = () => {
    setIsHeaderBlack(true);
  };
  const handleLinkClose = () => {
    setIsHeaderBlack(false);
  };

  const handleOpenOrderPage = () => {
    setIsOrderPage(true);
  };
  const handleCloseOrderPage = () => {
    setIsOrderPage(false);
  };

  return (
    <BuyContext.Provider
      value={{
        isOrderModalButton,
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
        isHeaderBlack,
        handleLinkOpen,
        handleLinkClose,
        handleOrderFromShop,
        allVine,
        personInfo,
        handlePersonInfo,
        handleOpenOrderPage,
        handleCloseOrderPage,
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
        return Number(totalCount);
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
