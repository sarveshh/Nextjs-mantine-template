"use client";
import { NextPageContext } from "next";
import { ErrorProps } from "next/error";

const ErrorPage = ({ statusCode }: ErrorProps) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>Oops! Something went wrong.</p>
      <p>You will be redirected to the home page shortly.</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
