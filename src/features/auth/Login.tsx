import { useRef, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useUserStore } from "./useAuthStore";

import { BrainIcon, MapPinAreaIcon } from "@phosphor-icons/react";
import "./login.css";

export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  let username = formData.get("username");
  let latitude = formData.get("latitude");
  let longitude = formData.get("longitude");
  const errors = {} as any;
  const locationRegx = new RegExp(/-?\d+\.\d+/m);
  if (!locationRegx.test(latitude)) {
    errors.latitudeErr = "Invalid input";
  }
  if (!locationRegx.test(longitude)) {
    errors.longitudeErr = "Invalid input";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return {
      user: username,
      latitude: latitude,
      longitude: longitude,
    };
  }
}

async function grabLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (locationObject) => {
        resolve(locationObject);
      },
      (err) => reject(err),
    );
  });
}

const Login = () => {
  let actionData = useActionData();
  const navigate = useNavigate();
  let refLatitude = useRef(null);
  let refLongitude = useRef(null);
  const { username, updateUser } = useUserStore(
    useShallow((state) => ({
      username: state.username,
      updateUser: state.updateUser,
    })),
  );

  useEffect(() => {
    if (actionData?.user && username.length === 0) {
      let { user, latitude, longitude } = actionData;

      updateUser(user, latitude, longitude);
      navigate("/", { replace: true });
    }
  }, [actionData, navigate]);

  return (
    <section className="login-section">
      <Form method="post" className="form-wrap">
        <div className="form-icon">
          <BrainIcon size={32} />
        </div>
        <div>
          <h1 className="login-title">Login </h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="username"
            className="userInput"
            required
          />
        </div>
        <div className="location-main-wrap">
          <div className="location-grp-wrap">
            <div className="location-input-wrap">
              <input
                type="number"
                step="any"
                placeholder="latitude"
                name="latitude"
                ref={refLatitude}
                required
              />
              {actionData?.latitudeErr && <p>{actionData.latitudeErr}</p>}
            </div>

            <div className="location-input-wrap">
              <input
                type="number"
                step="any"
                placeholder="longitude"
                name="longitude"
                ref={refLongitude}
                required
              />
              {actionData?.longitudeErr && <p>{actionData.longitudeErr}</p>}
            </div>
          </div>
          <div className="location-btn-wrap">
            <button
              onClick={async () => {
                let locationObject: any = await grabLocation();
                let latElem =
                  refLatitude.current as unknown as HTMLInputElement;
                let lonElem =
                  refLongitude.current as unknown as HTMLInputElement;
                latElem.value = locationObject.coords.latitude;
                lonElem.value = locationObject.coords.longitude;
              }}
            >
              <MapPinAreaIcon size={32} />
            </button>
          </div>
        </div>
        <div>
          <button role="submit">Submit</button>
        </div>
      </Form>
    </section>
  );
};

export default Login;
