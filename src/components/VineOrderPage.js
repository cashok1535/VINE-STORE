import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { vines } from "./BuyModal";

export const VineOrderPage = () => {
  const [vine, setVine] = useState({});
  const { vineName } = useParams();

  useEffect(() => {
    setVine(vines.find((item) => item.name === vineName));
  }, [vineName]);

  return <div className="vine__order__page">{vine.name}</div>;
};
