export const VineSliderElement = ({ vine, slideRef, handleOrderVine }) => {
  return (
    <div ref={slideRef} className="vineSliderElement">
      <img className="vine__img" src={vine.img} alt="" />
      <div className="vine__name">{vine.name}</div>
      <div className="vine__price">{vine.price},00USD</div>
      <button
        onClick={() => {
          handleOrderVine(vine);
        }}
        className="vine__button"
      >
        Add to cart
      </button>
    </div>
  );
};
