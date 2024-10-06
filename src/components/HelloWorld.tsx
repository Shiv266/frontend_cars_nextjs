import React from "react";
import CarsContainer from "./Cars/CarsContainer";

export const HelloWorld: React.FC = () => {
  return (
    <div>
      <div className="py-16 px-24 mt-8">
        <img
          alt="Volvo logo"
          height="24"
          src="https://www.volvocars.com/static/shared/images/volvo-wordmark-black-200-1.png"
          width="200"
        />
      </div>
      <div className="mt-48 px-8">
        <CarsContainer />
      </div>
    </div>
  );
};
