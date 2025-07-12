import { useEffect, useState, useContext } from "react";
import { VinesOrderElement } from "./VinesOrderElement";
import { BuyContext } from "./BuyModal";
import { useNavigate } from "react-router-dom";

export const VineOrderModal = () => {
  const {
    isOrderModal,
    handleCloseModal,
    countAllVines,
    handleAddCountVine,
    handleRemoveOrder,
    handleDiscount,
    isOrderModalButton,
    handleRemoveAllOrder,
  } = useContext(BuyContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoInput, setPromoInput] = useState(false);
  const [isPromoTextRight, setIsPromoTextRight] = useState(true);
  const [promoText, setPromoText] = useState("");
  const [isPromoRight, setIsPromoRight] = useState(false);
  const [isActivePromo, setIsActivePromo] = useState(false);
  const [formError, setFormError] = useState({
    name: null,
    email: null,
    phone: null,
  });
  const [formValidate, setFormValidate] = useState(
    formError.email && formError.name && formError.phone
  );
  const [orderFormInfo, setOrderFormInfo] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
    vines: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormValidate(formError.email && formError.name && formError.phone);
  }, [formError]);

  useEffect(() => {
    setIsPromoRight(promoText === "promo");
  }, [promoText]);

  useEffect(() => {
    document.body.style.overflow = isOrderModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOrderModal]);

  useEffect(() => {
    setTotalPrice(
      parseFloat(
        countAllVines.reduce((tot, acc) => {
          return (tot += acc.count * acc.price);
        }, 0)
      )
        .toFixed(2)
        .replace(".", ",")
    );
  }, [countAllVines, totalPrice]);

  useEffect(() => {
    if (!isOrderModalButton) {
      setIsActivePromo(false);
    }
  }, [isOrderModalButton]);

  useEffect(() => {
    setPromoInput(!isOrderModal);
  }, [isOrderModal]);

  const handlePromo = () => {
    setPromoInput((prev) => !prev);
    setIsPromoTextRight(true);
    setPromoText("");
  };

  const handlePromoActive = () => {
    if (isPromoRight) {
      setIsPromoTextRight(true);
      setIsActivePromo(true);
      handleDiscount(isPromoRight, isActivePromo);
      setPromoText("");
      setPromoInput(false);
    } else {
      setPromoInput(true);
      setIsPromoTextRight(false);
    }
  };

  const onChangeInput = (nameInput, event) => {
    setOrderFormInfo((prev) => ({
      ...prev,
      [nameInput]: event.target.value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const hasErrorNameInput =
      orderFormInfo.name.length === 0 || orderFormInfo.name.charAt(0) === " ";
    setFormError((prev) => ({
      ...prev,
      name: hasErrorNameInput,
    }));
    const isEmail =
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderFormInfo.email) &&
      orderFormInfo.email.length > 0;
    setFormError((prev) => ({
      ...prev,
      email: !isEmail,
    }));
    const isNumbers =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        orderFormInfo.phone
      );
    const isErrorPhoneInput = !isNumbers;
    setFormError((prev) => ({
      ...prev,
      phone: isErrorPhoneInput,
    }));
    if (formValidate) {
      navigate("/shop/order");
      handleRemoveAllOrder();
    }
  };

  return (
    <>
      {isOrderModal ? (
        <div className="vine__order__modal">
          <div className="vine__order__modal__form">
            <div className="order__form">
              <div className="order__form__header">
                <div className="order__form__text">Shopping cart</div>
                <button
                  onClick={() => {
                    handleCloseModal();
                  }}
                  className="order__form__button"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
                      fill="#000"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="order__form__info">
                <div className="title__order">Products</div>
                <div className="order__products">
                  {countAllVines.map((vines, index) => (
                    <VinesOrderElement
                      key={index}
                      vines={vines}
                      handleAddCountVine={handleAddCountVine}
                      handleRemoveOrder={handleRemoveOrder}
                    />
                  ))}
                </div>
                <div
                  className={`order__form__total ${
                    isActivePromo ? "activePromo" : ""
                  }`}
                >
                  {isActivePromo ? (
                    <div className="promo__text">PROMO</div>
                  ) : (
                    <button
                      onClick={handlePromo}
                      className="order__form__promo"
                    >
                      Promo code
                    </button>
                  )}
                  <div className="order__form__total__price">
                    Total::
                    <span className="order__form__total__price__number">
                      {totalPrice}
                      USD
                    </span>
                  </div>
                </div>
                {promoInput ? (
                  <div className="promo">
                    <div className="promo__input__parrent">
                      <input
                        onChange={(event) => {
                          setPromoText(event.target.value);
                        }}
                        value={promoText}
                        className={`promo__input ${
                          isPromoTextRight ? "isRight" : "isWrong"
                        }`}
                        placeholder="Enter promo code"
                        maxLength="10"
                      />
                      {isPromoTextRight ? (
                        <></>
                      ) : (
                        <div className="promo__error">
                          Promo code can't be applied
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        handlePromoActive();
                      }}
                      className="promo__button"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <form
                  className="order__person__info"
                  onSubmit={(event) => {
                    formSubmit(event);
                  }}
                  noValidate
                >
                  <div className="title__order person__info">
                    Place an order
                  </div>

                  <div className="order__person__info__title">
                    Name
                    <span className="order__person__info__title__star">*</span>
                  </div>
                  <input
                    placeholder="Your name"
                    className={`order__person__info__input ${
                      formError.name ? "isEmpty" : ""
                    }`}
                    maxLength="20"
                    onChange={(event) => {
                      onChangeInput("name", event);
                    }}
                    value={orderFormInfo.name}
                    title="Please enter your name here!"
                    required
                  />
                  <div className="order__person__info__title">
                    Email
                    <span className="order__person__info__title__star">*</span>
                  </div>
                  <input
                    onChange={(event) => {
                      onChangeInput("email", event);
                    }}
                    value={orderFormInfo.email}
                    placeholder="Your email address"
                    className={`order__person__info__input ${
                      formError.email ? "isEmpty" : ""
                    }`}
                    maxLength="20"
                    title="Please enter your email here!"
                    required
                  />
                  <div className="order__person__info__title">
                    Phone
                    <span className="order__person__info__title__star">*</span>
                  </div>
                  <input
                    onChange={(event) => {
                      onChangeInput("phone", event);
                    }}
                    placeholder="Your phone"
                    className={`order__person__info__input ${
                      formError.phone ? "isEmpty" : ""
                    }`}
                    type="tel"
                    maxLength="15"
                    title="The phone number must start with + and contain 10 to 15 digits."
                  />
                  <div className="order__person__info__title ">Comment</div>
                  <input
                    onChange={(event) => {
                      onChangeInput("comment", event);
                    }}
                    value={orderFormInfo.comment}
                    placeholder="Your comment"
                    className="order__person__info__input order__person__comment"
                  />
                  <div className="vine__button__parrent">
                    <button
                      type="submit"
                      className="vine__button order__button__submit"
                    >
                      Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
