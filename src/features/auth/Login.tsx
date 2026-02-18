import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { BrainIcon } from "@phosphor-icons/react";
import "./login.css";
export async function action({ request }: { request: any }) {
  const formData = await request.formData();
  let username = formData.get("username");
  let latitude = formData.get("latitude");
  let longitude = formData.get("longitude");
  const errors = {} as any;
  const locationRegx = new RegExp(/-?\d+\.\d+/m);
  console.log(
    username,
    latitude,
    longitude,
    !locationRegx.test(latitude),
    !locationRegx.test(longitude),
  );
  if (!locationRegx.test(latitude)) {
    errors.latitude = "Invalid input";
  }
  if (!locationRegx.test(longitude)) {
    errors.longitude = "Invalid input";
  }

  return errors;
}

type location = {
  latitude: number;
  longitude: number;
};

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
  let [location, setLocation] = useState<location>({
    longitude: 0,
    latitude: 0,
  });

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
          <input type="text" placeholder="Name" name="username" required />
        </div>
        <div className="location-main-wrap">
          <div className="location-grp-wrap">
            <div className="location-input-wrap">
              <input
                type="number"
                step="any"
                placeholder="latitude"
                name="latitude"
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
                required
              />
              {actionData?.longitude && <p>{actionData.longitude}</p>}
            </div>
          </div>
          <button
            onClick={async () => {
              let locationObject: any = await grabLocation();
              setLocation({
                latitude: locationObject.coords.latitude,
                longitude: locationObject.coords.longitude,
              });
            }}
          >
            Grab my Location
          </button>
        </div>
        <div>
          <button role="submit">Submit</button>
        </div>
      </Form>
    </section>
  );
};

export default Login;
