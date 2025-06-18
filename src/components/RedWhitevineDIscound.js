export const RedWhiteVineDiscound = () => {
  return (
    <div className="red__white__vine__discount">
      <div className="red__white__vine__discount__grid">
        <div className="order__vine red__vine">
          <div className="order__vine__margin">
            <div className="order__vine__title">Red Wines</div>
            <div className="main__flex__element__line order__vine__line"></div>
            <div className="order__vine__text">
              Great selection of red wines for you.
            </div>
            <a href="#shop__vines">
              <button class="vine__button order__vine__button order__vine__button">
                Shop red wines
              </button>
            </a>
          </div>
        </div>
        <div className="order__vine white__vine">
          <div className="order__vine__margin">
            <div className="order__vine__title">White Wines</div>
            <div className="main__flex__element__line order__vine__line"></div>
            <div className="order__vine__text">
              Top white wines for any occasion.
            </div>
            <a href="#shop__vines">
              <button class="vine__button order__vine__button order__vine__button">
                Shop white wines
              </button>
            </a>
          </div>
        </div>
        <div className="personal__discound">
          <div className="personal__discound__background"></div>
          <div className="personal__discound__info">
            <div className="personal__discound__title">
              Get your 15% personal discount
            </div>
            <div className="personal__discound__text">
              Join our club of wine-lovers and be the first to know about the
              special offers.
            </div>
            <div className="learn__button personal__discound__button">
              Join
              <svg
                className="personal__discound__button__svg"
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    className="svg__path"
                    d="m9.88528137 7.48578644 1.41421353 1.41421356-6.0994949 6.0997864 25.4426407.0002136v2l-25.4286407-.0002136 6.0854949 6.085495-1.41421353 1.4142135-8.48528137-8.4852813.022-.0214272-.022-.0217186z"
                    transform="matrix(-1 0 0 -1 32.04264 31.985282)"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
