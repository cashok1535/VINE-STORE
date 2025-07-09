import { MainTopStiky } from "./MainTopStiky";
import { MainFlex } from "./MainFlex";
import { LearnMoreVine } from "./LearnMoreVine";
import { DiscoverOurVines } from "./DiscoverOurVines";
import { BestDials } from "./BestDials";
import { HistoryVine } from "./HistoryVine";
import { VinesTipes } from "./VIneTipes";
import { RedWhiteVines } from "./RedWhiteVines";
import { History } from "./History";
import { RedWhiteVineDiscound } from "./RedWhitevineDIscound";
import { Awards } from "./Awards";
import { Feedback } from "./Feedback";
import { Blog } from "./Blog";
import { FAQ } from "./FAQ";
import { WhatWeDo } from "./WhatWeDo";
import { Contact } from "./Contact";
import { useContext, useEffect } from "react";
import { BuyContext } from "./BuyModal";

export const Main = () => {
  const { handleLinkClose } = useContext(BuyContext);

  useEffect(() => {
    handleLinkClose();
  }, [handleLinkClose]);
  return (
    <main className="main">
      <MainTopStiky />
      <div className="main__brown">
        <MainFlex />
        <LearnMoreVine />
      </div>
      <div className="discover__stiky__parrent">
        <div className="discover__stiky"></div>
      </div>
      <DiscoverOurVines />
      <div className="main__brown">
        <BestDials />
        <HistoryVine />
        <VinesTipes />
        <RedWhiteVines />
      </div>
      <History />
      <div className="main__brown">
        <RedWhiteVineDiscound />
        <Awards />
        <Feedback />
        <Blog />
        <FAQ />
        <WhatWeDo />
      </div>
      <Contact />
    </main>
  );
};
