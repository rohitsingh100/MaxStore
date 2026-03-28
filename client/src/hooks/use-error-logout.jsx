import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";
import { setUserLogout } from "@/redux/slices/authSlice";

const useErrorLogout = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleErrorLogout = (error, otherTitle = "Error occured") => {

    if (error.response.status === 400) {
      dispatch(setUserLogout());
      toast({
        title: "Please login again to continue",
        variant: "destructive",
      });
    } else {
      toast({
        title: otherTitle,
        descirption: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return { handleErrorLogout };
};

export default useErrorLogout;
