import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { motion } from "motion/react";

import { useUserStore } from "../features/auth/useAuthStore";
import {
  userKey,
  tasksKey,
  linksKey,
  pomoKey,
  notesKey,
} from "../global/storageKeys";
import { checkImgURL } from "../global/globalFunctions";
import { bgFiles } from "../assets/bgFiles.js";
import "./MainSettings.css";
import { useRef } from "react";

const bgURLS = Object.values(bgFiles)
  .map((arr) => arr)
  .flat();
let randomNum = () => {
  return Math.floor(Math.random() * bgURLS.length);
};

const MainSettings = ({ setIsOpen }: { setIsOpen: (val: boolean) => void }) => {
  const navigate = useNavigate();
  const { username, location, logoutUser, updateBackground } = useUserStore(
    useShallow((state) => ({
      username: state.username,
      location: state.location,
      logoutUser: state.logOutUser,
      updateBackground: state.updateBackground,
    })),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const keysArr = [userKey, tasksKey, linksKey, pomoKey, notesKey];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="settings-wrap"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
        exit={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="settings-content glass"
      >
        <div className="settings-close-btn" onClick={() => setIsOpen(false)}>
          X
        </div>
        <h2>Hey {username}!</h2>

        <div>
          <strong>Current Location :</strong>
          <p>{location.latitude}</p>
          <p>{location.longitude}</p>
        </div>

        <div>
          <input
            type="text"
            name="urlpath"
            placeholder="URL for the Background Image"
            ref={inputRef}
            // onChange={(event) => {
            //   const value = event?.target.value;
            //   setCustomImgURL(value);
            // }}
          />
          <p className="error-msg" ref={errorRef}></p>
          <div className="btn-wrap">
            <button
              onClick={async () => {
                const inputElm = inputRef.current;
                const errorElm = errorRef.current;
                if (inputElm && errorElm) {
                  let inputValue = inputElm?.value;
                  // checks if its image url then either changes bg or throws error
                  let isValidURL = await checkImgURL(inputValue);
                  if (isValidURL) {
                    let newCustomBG = `url(${inputValue})`;
                    updateBackground(newCustomBG);
                    errorElm.innerText = "";
                  } else if (!isValidURL && inputValue.length <= 0) {
                    errorElm.innerText = "URL cannot be blank.";
                  } else {
                    errorElm.innerText = `Error Occured, Failed to fetch URL`;
                  }
                  inputElm.value = "";
                }

                // clears error text
                setTimeout(() => {
                  if (!errorElm) return;
                  errorElm.innerText = "";
                }, 1000);
              }}
            >
              Set Custom BG
            </button>

            <button
              onClick={() => {
                let newURL = `url(${bgURLS[randomNum()]})`;
                updateBackground(newURL);
              }}
            >
              Random BG
            </button>
          </div>
        </div>

        <button
          className="log-out-user"
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
      </motion.div>
    </motion.div>
  );
};

export default MainSettings;
