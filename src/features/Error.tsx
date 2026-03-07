import { useRouteError } from "react-router-dom";

// error page render with route error
const ErrorPage = () => {
  const newError = useRouteError();
  console.log(newError);
  return (
    <section>
      <h1>Error Occured!</h1>
      <p> Something went wrong, unable to load the page. </p>
    </section>
  );
};

export default ErrorPage;
