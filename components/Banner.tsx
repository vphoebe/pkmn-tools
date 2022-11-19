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
    <div className="px-2 py-4 bg-electric text-xs flex justify-center">
      <span>{message}</span>
      <button
        type="button"
        className="absolute right-4 font-bold text-2xl leading-[12px] text-dark"
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
