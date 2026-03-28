import { Colors } from "@/constants/colors";
import { useToast } from "@/hooks/use-toast";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import useRazorpay from "@/hooks/use-razorpay";

const CartProduct = ({ name, price, _id, image,color, quantity, stock,blacklisted }) => {

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { generatePayment, verifyPayment} = useRazorpay();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleBuyNow = async () => {

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (quantity > stock) {
      toast({ title: "Product out of stock" });
      return;
    }
    if (!blacklisted) {
      toast({ title: "Product isn't available for purchase" });
      return;
    }

    if (color === "") {
      toast({ title: "Please select a color" });
      return;
    }
 
    const order = await generatePayment(price * quantity);
    await verifyPayment(
      order,
      [{ id: _id, quantity, color }],
      "123 Main street"
    );
  };


  const handleIncrease = () => {
    if (quantity === stock) {
      toast({ title: "Maximum stock reached" });
      return;
    }
    dispatch(addToCart({ _id, quantity: 1, price }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(removeFromCart({ _id, quantity: 1, price }));
    }
  };

  return (
    <div className="border w-fit rounded-2xl overflow-clip grid relative hover:shadow-md">
      <img
        src={image}
        alt={name}
        className="w-[30rem] sm:w-[20rem] h-[20rem] object-cover rounded-t-2xl"
      />

      <div className="px-3 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 rounded-xl">
        <h2 className="text-md font-medium">{name}</h2>
        <span className="font-semibold text-md">₹{price}</span>

        <div className="flex justify-between my-2">
          <div className="flex items-center gap-5 bg-gray-100 rounded-lg px-3 py-2 w-fit">
            <Minus
              size={15}
              stroke={Colors.customGray}
              className={`cursor-pointer ${quantity === 1 ? "opacity-40" : ""}`}
              onClick={handleDecrease}
            />

            <span className="text-slate-950 text-sm sm:text-md">
              {quantity}
            </span>

            <Plus
              size={15}
              stroke={Colors.customGray}
              className={`cursor-pointer ${
                quantity === stock ? "opacity-40" : ""
              }`}
              onClick={handleIncrease}
            />
          </div>
          <Button onClick={handleBuyNow} size="sm">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
