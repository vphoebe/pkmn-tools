import * as React from "react";

interface BannerProps {
  type: string;
  message: string;
}

const Banner = ({ type, message }: BannerProps) => {
  const [isClosed, setClosed] = React.useState(true);

  React.useEffect(() => {
    const localValue = window.localStorage.getItem("dismissed");
    if (localValue) {
      const value = localValue === "true";
      setClosed(value);
    } else {
      setClosed(false);
    }
  }, []);

  return isClosed ? null : (
    <div className="px-4 py-2 bg-electric text-xs flex justify-between items-center text-center">
      {/* spacer */}
      <span></span>
      <span>{message}</span>
      <button
        type="button"
        className="font-bold text-2xl text-dark pl-4"
        onClick={() => {
          setClosed(true);
          window.localStorage.setItem("dismissed", "true");
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Banner;
