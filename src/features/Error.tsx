import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const newError = useRouteError();
  console.log(newError);
  return (
    <section>
      <h1>Error Occured!</h1>
    </section>
  );
};

export default ErrorPage;
