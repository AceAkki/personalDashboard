const LinkStorage = () => {
  return (
    <div className="link-pen">
      <div className="linkpen-input">
        <input type="text" placeholder="Paste a link here to triage..." />
        <button>+</button>
      </div>
      <div className="linkpen-list-wrap">
        <div className="link-pen-item">
          <div className="favIcon-wrap">
            <img src="https://via.placeholder.com/16" alt="favicon" />
          </div>
          <div className="url-title-wrap">
            <p>How to Build a Personal Dashboard...</p>
          </div>
          <div className="exp-hour-wrap">
            <p>24h</p>
          </div>
        </div>
      </div>
      <div className="linkpen-footer-wrap">
        <div>
          <p>Items: </p>
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
