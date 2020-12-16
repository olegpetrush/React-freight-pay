import React from "react";
import { Layout } from "antd";
import ReactLoading from "react-loading";

function LoadingAnimation(props) {
  return (
    <Layout className="loading-container">
      <ReactLoading type="cylon" color="#0BD35C" />
    </Layout>
  );
}
export default LoadingAnimation;
