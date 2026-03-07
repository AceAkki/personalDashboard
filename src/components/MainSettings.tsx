import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "../features/auth/useAuthStore";
import {
  userKey,
  tasksKey,
  linksKey,
  pomoKey,
  notesKey,
} from "../global/storageKeys";
import { toggleClass } from "../global/globalFunctions";
import { bgFiles } from "../assets/bgFiles.js";
import "./MainSettings.css";

const bgURLS = Object.values(bgFiles)
  .map((arr) => arr)
  .flat();
let randomNum = () => {
  return Math.round(Math.random() * bgURLS.length - 1);
};

const MainSettings = ({ divRef }: { divRef: any }) => {
  const navigate = useNavigate();
  const { username, logoutUser, updateBackground } = useUserStore(
    useShallow((state) => ({
      username: state.username,
      logoutUser: state.logOutUser,
      updateBackground: state.updateBackground,
    })),
  );
  const keysArr = [userKey, tasksKey, linksKey, pomoKey, notesKey];

  return (
    <div className="settings-wrap hide" ref={divRef}>
      <div className="settings-content">
        <div
          className="settings-close-btn"
          onClick={() =>
            toggleClass({
              refElem: divRef,
              classname: "hide",
            })
          }
        >
          X
        </div>
        <h2>Hey {username}!</h2>

        <button
          onClick={() => {
            let newURL = `url(${bgURLS[randomNum()]})`;
            updateBackground(newURL);
          }}
        >
          Change BG
        </button>

        <button
          onClick={() => {
            logoutUser();
            keysArr.forEach((key) => localStorage.removeItem(key));
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          }}
        >
          Logout
        </button>
        <p>Logging out will delete all stored data.</p>
      </div>
    </div>
  );
};

export default MainSettings;
