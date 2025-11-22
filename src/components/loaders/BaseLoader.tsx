import ScrollToTop from "@/utils/ScrollToTop";

const BaseLoader = () => {
  return (
    <div className="bg-black/90 flex justify-center items-center fixed top-0 left-0 w-dvw h-dvh z-50">
      <ScrollToTop />
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
    </div>
  );
};

export default BaseLoader;
