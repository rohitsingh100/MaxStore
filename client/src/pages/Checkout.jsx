import React, { useState } from "react";
import CheckoutProduct from "../components/custom/CheckoutProduct";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useErrorLogout from "@/hooks/use-error-logout";
import useRazorpay from "@/hooks/use-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { emptyCart } from "@/redux/slices/cartSlice";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
  // const { toast } = useTotal();
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleErrorLogout } = useErrorLogout();
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleCheckout = async () => {
    if (address.trim() === "") {
      return toast({
        title: "Please enter your address",
        variant: "destructive",
      });
    }

    if (cartItems.length === 0) {
      return toast({
        title: "Cart is empty",
        variant: "destructive",
      });
    }


    const productArray = cartItems.map((item) => {
      return {
        id: item._id,
        quantity: item.quantity,
        color: item.color,
      };
    });



    try {
      const options = await generatePayment(totalPrice);
      const success = await verifyPayment(options, productArray, address);
      //  IMPORTANT FIX
      if (success) {
        dispatch(emptyCart());
      }
    } catch (error) {
      return handleErrorLogout(error);
    }
  };

  return (
    <div className="mx-auto w-[90vw] sm-w-[60vw] flex justify-between items-center sm:my-20">
      <div className="flex flex-col sm:flex-row gap-5 mx-auto my-10">
        {/* product details */}
        <div className="space-y-8">
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-medium">Order Summary</h2>
            <div className="space-y-1 text-3xl">
              {cartItems.length === 0 ? (
                <h2 className="text-primary text-3xl">
                  Nothing To Show, Please add some products...
                </h2>
              ) : (
                cartItems.map((item) => (
                  <CheckoutProduct key={item?._id} {...item} />
                ))
              )}
            </div>
            <hr className="my-3 border-t-2 border-gray-300 dark:border-gray-600" />

            <div className="p-3 rounded-mg">
              <p flex justify-between items-center>
                <span className="font-semibold text-customGray">
                  Subtotal:{" "}
                </span>
                <span className="font-bold">₹599</span>
              </p>
              <p flex justify-between items-center>
                <span className="font-semibold text-customGray">Tax: </span>
                <span className="font-bold">₹0</span>
              </p>
              <p flex justify-between items-center>
                <span className="font-semibold text-customGray">
                  Shipping:{" "}
                </span>
                <span className="font-bold">₹0</span>
              </p>
            </div>
            <hr className="my-3 border-t-2 border-gray-300 dark:border-gray-600" />
            <p flex justify-between items-center px-3>
              <span className="font-bold ">Total: </span>
              <span className="font-bold">₹599</span>
            </p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="w-[90vw] sm:w-[20vw]"> </div>
        <Card className="p-4 shadow-md space-y-4">
          <h2 className="text-xl font-medium">Billing Information</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Rohit"
              className="w-full"
              value={user?.name}
            />
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="rohitgola1240@gmail.com"
              className="w-full"
              value={user?.email}
            />
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              rows="7"
              id="address"
              placeholder="123 Main st. City, State"
              className="w-full"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button onClick={handleCheckout} className="w-full">
            Place Order
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
