import { useOutletContext } from "react-router-dom";
import LinkForm from "./components/LinkForm";
import RenderLinks from "./components/RenderLinks";
import type { DashboardContext } from "../mainTypes";
import "./linkStorage.css";

const LinkStorage = () => {
  const { links, setLinks } = useOutletContext<DashboardContext>();

  return (
    <div className="link-pen">
      <div className="linkpen-input">
        <LinkForm setLinks={setLinks} />
      </div>
      <div className="linkpen-list-wrap">
        <RenderLinks links={links} setLinks={setLinks} />
      </div>
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
