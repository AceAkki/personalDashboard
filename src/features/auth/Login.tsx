import { useRef } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
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
    errors.latitude = "Invalid input";
  }
  if (!locationRegx.test(longitude)) {
    errors.longitude = "Invalid input";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      username: username,
      location: { latitude: latitude, longitude: longitude },
      tasksList: {
        current: [],
        priority: [],
        completed: [],
      },
      notesList: [],
    }),
  );
  return redirect("/");
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
  let refLatitude = useRef(null);
  let refLongitude = useRef(null);

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
              {actionData?.latitude && <p>{actionData.latitude}</p>}
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
              {actionData?.longitude && <p>{actionData.longitude}</p>}
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
