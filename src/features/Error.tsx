import { useRouteError } from "react-router-dom";

// error page render with route error
const ErrorPage = () => {
  const newError: any = useRouteError();
  return (
    <section className="section-full error-section">
      <div className="error-wrapper">
        <h1 className="section-title">Error Occured!</h1>
        <p> Something went wrong, unable to load the page. </p>

        <hr />
        <h2>Following is the reason:-</h2>
        <p>{newError?.message}</p>
      </div>
    </section>
  );
};

export default ErrorPage;
