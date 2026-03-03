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
import "./MainSettings.css";
const MainSettings = ({ divRef }: { divRef: any }) => {
  const navigate = useNavigate();
  const { username, logoutUser } = useUserStore(
    useShallow((state) => ({
      username: state.username,
      logoutUser: state.logOutUser,
    })),
  );
  const keysArr = [userKey, tasksKey, linksKey, pomoKey, notesKey];
  return (
    <div className="settings-wrap hide" ref={divRef}>
      <div className="settings-content">
        <h2>{username}</h2>

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
