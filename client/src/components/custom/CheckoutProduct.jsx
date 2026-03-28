import { Colors } from "@/constants/colors";
import React from "react";

const CheckoutProduct = ({
  name = "Custom Designed Keyboard",
  price = 299,
  quantity = 2,
  image = {
    url: "https://images.pexels.com/photos/1102360/pexels-photo-1102360.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  color = Colors.customYellow
}) => {
  return (
    <div className="flex justify-between items-start p-3 rounded-lg bg-gray-100 dark:bg-zinc-900">
      <div className="flex flex-row items-center gap-2">
        <img src={image} alt={name} className="w-20 sm:w-24 rounded-lg" />
        <div className="grid sm:gap-1">
          <h1 className="font-semibold text-sm sm:text-base">
            Custom Designed Keyboard
          </h1>
          <p className="flex flex-col sm:flex-row sm:gap-2 text-gray-500 dark:text-customGray text-xs sm:text-sm my-0">
            <span>
              Color: <span style={{ backgroundColor: color }}>{color}</span>
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Qty : {" "}
              <span className="font-medium text-customYellow">{quantity}</span>{" "}
            </span>
            <span className="hidden sm:block">|</span>
            <span className="font-semibold">
              Price : {" "}
              <span className="font-medium text-customYellow">{price}</span>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
