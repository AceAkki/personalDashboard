import { writeClipboardText } from "../../../global/globalFunctions";
import type { linkObject, RenderLinksProps } from "../linkTypes";

const RenderLinks = ({ links, setLinks }: RenderLinksProps) => {
  async function processLink(text: string) {
    writeClipboardText(text);
    setLinks((prevLinks) => prevLinks.filter((link) => link.link !== text));
  }

  const calculateHours = (link: linkObject) => {
    const milliDiff = link.expiryTime - Date.now();
    const totalSeconds = Math.floor(milliDiff / 1000);

    // const seconds = totalSeconds % 60;
    // const minutes = Math.floor((totalSeconds % 3600) / 60);
    const totalHours = Math.floor(totalSeconds / 3600);
    return totalHours;
  };

  return links.map((link) => {
    return (
      <div
        className="link-pen-item"
        key={link.link}
        onClick={() => processLink(link.link)}
      >
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
          <p>{`${calculateHours(link)}h`}</p>
        </div>
      </div>
    );
  });
};

export default RenderLinks;
