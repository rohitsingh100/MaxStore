import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react"; // icon for 404

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-900 dark:to-black text-center">
      <div className="p-8 rounded-2xl shadow-lg bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md max-w-md mx-auto">
        <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-200"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
