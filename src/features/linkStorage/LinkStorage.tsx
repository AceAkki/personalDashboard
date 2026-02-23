import { useShallow } from "zustand/shallow";
import LinkForm from "./components/LinkForm";
import RenderLinks from "./components/RenderLinks";

import { useLinkStore } from "./hooks/useLinkStore";
import "./linkStorage.css";

const LinkStorage = () => {
  // const { links, setLinks } = useOutletContext<DashboardContext>();
  const { links, deleteLink, updateLinks, clearAllLinks } = useLinkStore(
    useShallow((state) => ({
      links: state.links,
      deleteLink: state.deleteLink,
      updateLinks: state.updateLinks,
      clearAllLinks: state.clearAllLinks,
    })),
  );
  return (
    <div className="link-pen">
      <div className="linkpen-input">
        <LinkForm setLinks={updateLinks} />
      </div>
      <div className="linkpen-list-wrap">
        <RenderLinks links={links} deleteLink={deleteLink} />
      </div>
      <div className="linkpen-footer-wrap">
        <div>
          <p>Items: {links.length}</p>
        </div>
        <div>
          <button onClick={() => clearAllLinks()} className="link-clear-btn">
            Clear All
          </button>
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
