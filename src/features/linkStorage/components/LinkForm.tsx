import useLinkMain from "../hooks/useLinkMain";
import type { reactStringSet } from "../../mainTypes";

const LinksForm = ({ setLinks }: { setLinks: reactStringSet }) => {
  const { link, handleChange } = useLinkMain(setLinks);
  return (
    <input
      type="text"
      name="link"
      value={link}
      onChange={handleChange}
      className="link-input"
      placeholder="Paste a link here to triage..."
    />
  );
};

export default LinksForm;
