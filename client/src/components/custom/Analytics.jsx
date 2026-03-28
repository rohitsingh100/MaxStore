import React, { useEffect, useState } from "react";
import { SidebarInset } from "../ui/sidebar";
import { Activity, CreditCard, DollarSign, User } from "lucide-react";
import Chart1 from "./Chart1";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axios from "axios";
import useErrorLogout from "@/hooks/use-error-logout";

const Analytics = () => {
  const [metrics, setMetrics] = useState({});
  const { handleErrorLogout } = useErrorLogout();

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/order/get-metrics",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const { data } = res.data;
        setMetrics(data);
      } catch (error) {
        handleErrorLogout(error);
      }
    };

    getMetrics();
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      <SidebarInset>
        <div className="p-4 md:p-6 lg:p-8 space-y-6">

          {/* ===== Metrics Cards ===== */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="bg-muted/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-600">Total Sales</h3>
                <DollarSign size={18} />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-2xl font-bold">
                  ₹{metrics?.totalSales?.count}
                </p>
                <p className="text-xs text-gray-400">
                  +{metrics?.totalSales?.growth}% from last month
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-600">Users</h3>
                <User size={18} />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-2xl font-bold">
                  {metrics?.users?.count}
                </p>
                <p className="text-xs text-gray-400">
                  +{metrics?.users?.growth}% from last month
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-600">Sales</h3>
                <CreditCard size={18} />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-2xl font-bold">
                  ₹{metrics?.sales?.count}
                </p>
                <p className="text-xs text-gray-400">
                  +{metrics?.sales?.growth}% from last month
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-600">Active Now</h3>
                <Activity size={18} />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-2xl font-bold">
                  {metrics?.activeNow?.count}
                </p>
                <p className="text-xs text-gray-400">
                  +{metrics?.activeNow?.growth}% from last month
                </p>
              </div>
            </div>

          </div>

          {/* ===== Chart + Recent Sales ===== */}
          <div className="grid gap-6 lg:grid-cols-3">

            <div className="lg:col-span-2 bg-muted/50 rounded-2xl p-6 shadow-sm">
              <Chart1 />
            </div>

            <div className="bg-muted/50 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-1">Recent Sales</h3>
              <p className="text-sm text-gray-400 mb-4">
                You made 40 sales this month.
              </p>

              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {metrics?.recentSales?.users?.map((user) => (
                  <div
                    key={user?._id}
                    className="flex justify-between items-center border-b pb-3 last:border-none"
                  >
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                          {user?.userId?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold capitalize">
                          {user?.userId?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user?.userId?.email}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-sm">
                      ₹{user?.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default Analytics;

