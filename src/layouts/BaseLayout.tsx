import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default BaseLayout;
