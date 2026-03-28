import { Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LinkButton from "./LinkButton";
import { starsGenerator } from "@/constants/helper";

const ProductCard = ({
  name = "Product Title",
  price = "2000",
  rating = 3.5,
  image = "",
}) => {
  const imageUrl = typeof image === "string" ? image : image?.url;


  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  return (
    <div className="relative overflow-hidden group">
      <img
        src={imageUrl}
        alt={name}
        className="object-cover w-[30rem] h-[20rem] transition-transform duration-500 group-hover:scale-105"
      // className="object-contain w-full h-[20rem] bg-white transition-transform duration-500 group-hover:scale-105"
      />

      <div className="px-3 gap-1 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 translate-y-[3rem] transition-all duration-500 group-hover:translate-y-0">
        <h2>{truncateText(name, 20)}</h2>
        <div className="flex justify-between">
          <div className="flex">{starsGenerator(rating)}</div>
          <span>₹{price}</span>
        </div>
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ">
          <LinkButton to={`/product/${name.split(" ").join("-")}`} text="View Product" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
