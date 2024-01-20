import React from "react";
import Header from "components/layout/Header";

const Layout = (props: any) => {

  return (
    <React.Fragment>
      <main className="content">
        <div className="body-content">
          <Header />
          {props.children}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Layout;
