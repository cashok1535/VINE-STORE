import vineImg from "../img/historyVine.jpg";

export const HistoryVine = () => {
  return (
    <div id="history__vine" className="history__vine">
      <div className="history__vine__img__parrent">
        <img className="history__vine__img" src={vineImg} alt="" />
      </div>
      <div className="history__vine__flex">
        <div className="history__vine__flex__element">
          <div className="history__vine__flex__age">1796</div>
          <div className="history__vine__flex__title">The Beginning </div>
          <div className="main__flex__element__line history__line"></div>
          <div className="history__vine__flex__text">
            Our family has been engaged in winemaking since the 18th century
            when the first grape bushes were planted in the Napa Valley by our
            ancestors.
          </div>
        </div>
        <div className="history__vine__flex__element">
          <div className="history__vine__flex__age">1912</div>
          <div className="history__vine__flex__title">Selling Wines</div>
          <div className="main__flex__element__line history__line"></div>
          <div className="history__vine__flex__text">
            Our home-based winery in California became a small, family-owned
            business, that supplied wine for connoisseurs of this amazing drink.
          </div>
        </div>
        <div className="history__vine__flex__element">
          <div className="history__vine__flex__age">1946</div>
          <div className="history__vine__flex__title">
            Restart of Production
          </div>
          <div className="main__flex__element__line history__line"></div>
          <div className="history__vine__flex__text">
            After the Second World War, we adopted the experience of European
            winemakers and began to use new technologies in our wine-making
            processes.
          </div>
        </div>
        <div className="history__vine__flex__element">
          <div className="history__vine__flex__age">2010</div>
          <div className="history__vine__flex__title">Worldwide Shipping</div>
          <div className="main__flex__element__line history__line"></div>
          <div className="history__vine__flex__text">
            We used to sell our wines only wine only in California. But since
            2010, we have been shipping our bottles to other American states and
            even other countries.
          </div>
        </div>
      </div>
    </div>
  );
};
