import { Form } from "react-router-dom";

export async function action({ request }: { request: any }) {
  console.log(await request);
}

const Login = () => {
  return (
    <>
      <h1>Login</h1>

      <Form method="post">
        <input type="text" placeholder="name" name="username" />
        <button role="submit">Submit</button>
      </Form>
    </>
  );
};

export default Login;
