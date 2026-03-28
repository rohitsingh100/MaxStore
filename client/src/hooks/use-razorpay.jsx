import axios from "axios";
import { toast, useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";
// import { title } from "process";
// import { handler } from "tailwindcss-animate";

const useRazorpay = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const generatePayment = async (amount) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/payment/generate-payment",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.data;
      return data.data;
    } catch (error) {
      return toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (options, productArray, address) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      return toast({
        title: "Failed to load Razorpay",
        variant: "destructive",
      });
    }

    const paymentObject = new window.Razorpay({
      // key: import.meta.env.RAZORPAY_KEY_ID,
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      order_id: options.id,
      image:
        "https://images.pexels.com/photos/8294617/pexels-photo-8294617.jpeg",
      handler: async (response) => {
        try {
    
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/api/payment/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: options.amount,
              address,
              productArray,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

      

          // const { data } = await res.data;
          const data = await res.data;
          toast({ title: data.message });
          navigate("/success");
        } catch (error) {
          toast({
            title: error.response.data.message,
            variant: "destructive",
          });

          return false; // ✅ IMPORTANT
        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    });

    paymentObject.open();
  };

  return { generatePayment, verifyPayment };
};

export default useRazorpay;
