import { useOutletContext } from "react-router-dom";
import LinkForm from "./components/LinkForm";
import type { DashboardContext } from "../mainTypes";
import "./linkStorage.css";

const LinkStorage = () => {
  const { links, setLinks } = useOutletContext<DashboardContext>();

  const RenderLinks = links.map((link) => {
    const calculateHours = () => {
      const milliDiff = link.expiryTime - Date.now();
      const totalSeconds = Math.floor(milliDiff / 1000);

      const seconds = totalSeconds % 60;
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const totalHours = Math.floor(totalSeconds / 3600);
      return totalHours;
    };

    return (
      <div className="link-pen-item" key={link.link}>
        <div className="favIcon-wrap">
          <img
            src={`http://www.google.com/s2/favicons?domain=${link}`}
            alt="favicon"
          />
        </div>
        <div className="url-title-wrap">
          <p>{link.link}</p>
        </div>
        <div className="exp-hour-wrap">
          <p>{`${calculateHours()}h`}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="link-pen">
      <div className="linkpen-input">
        <LinkForm setLinks={setLinks} />
      </div>
      <div className="linkpen-list-wrap">{RenderLinks}</div>
      <div className="linkpen-footer-wrap">
        <div>
          <p>Items: {links.length}</p>
        </div>
        <div>
          <button onClick={() => setLinks([])}>Clear All</button>
        </div>
      </div>
    </div>
  );
};
export default LinkStorage;

/*
_______________________________________________________
|  [🔗]  Paste a link here to triage...          [+]  |  <-- Input
|_____________________________________________________|
|                                                     |
|  ( )  How to Build a Personal Dashboard...   [24h]  |  <-- Active Link
|  ( )  Documentation - React Query            [42h]  |
|  ( )  Figma Design System 2026               [ 2h]  |  <-- Expiring (Red)
|_____________________________________________________|
|  Items: 3                      [ Clear All ] [ ⚙️ ] |
_______________________________________________________
*/
