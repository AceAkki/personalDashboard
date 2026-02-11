import { useOutletContext } from "react-router-dom";
import LinkForm from "./components/LinkForm";
import type { DashboardContext } from "../mainTypes";

const LinkStorage = () => {
  const { links, setLinks } = useOutletContext<DashboardContext>();

  const RenderLinks = links.map((link) => {
    return (
      <div className="link-pen-item">
        <div className="favIcon-wrap">
          <img
            src={`http://www.google.com/s2/favicons?domain=${link}`}
            alt="favicon"
          />
        </div>
        <div className="url-title-wrap">
          <p>{link}</p>
        </div>
        <div className="exp-hour-wrap">
          <p>24h</p>
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
          <button>Clear All</button>
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
