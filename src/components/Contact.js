export const Contact = () => {
  return (
    <div id="contact" className="contact">
      <div className="contact__flex">
        <div className="contact__info">
          <div className="boutique__wines__italic">Join</div>
          <div className="contact__info__title">Join Our Newsletter Now</div>
          <div className="blog__flex__element__text">
            Learn more about wines and our special offers with our weekly
            digests.
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="contact__form"
        >
          <input
            required
            className="contact__form__input"
            maxLength="200px"
            placeholder="Enter your email address here"
          />
          <button className="vine__button contact__form__button">Submit</button>
        </form>
      </div>
      <div className="contact__svg">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="31">
          <path
            d="M0 15.5 L3000 15.5"
            fill="none"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1px"
          ></path>
        </svg>
      </div>
    </div>
  );
};
