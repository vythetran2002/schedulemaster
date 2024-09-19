import React from "react";
import { Calendar } from "lucide-react";

export default function EmptyPlaceholder() {
  return (
    <div
      className={`w-full h-100 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-6 dark:bg-zinc-500`}
    >
      <div
        className="text-gray-400 mb-2 dark:text-gray-100
      "
      >
        <Calendar className="w-[45px] h-[45px]" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1 dark:text-gray-100">
        No Events
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm dark:text-gray-100">
        There are no events scheduled at this time.
      </p>
    </div>
  );
}
