import React from "react";
import { helpsData } from "@/lib/data";
import HelpCard from "./help-card";

export default function Helps() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-col items-center w-full bg-[#618FB61A]/10">
        <div className="flex items-center justify-start gap-1 mt-6">
          <span className="text-primary font-bold text-[22px]">
            راهنمای خرید
          </span>
          <span className="text-primary font-semibold text-[15px]">
            دستگاه های سی ان سی
          </span>
        </div>
        <div
          className="wrapper my-6 h-[300px] overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {helpsData.map((data, index) => (
            <React.Fragment key={data.id}>
              <HelpCard data={data} />
              <hr
                className={`${
                  index === helpsData.length - 1 ? "hidden" : ""
                } flex items-center justify-end mr-20`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ********************************************************************************************************************* */}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col max-w-md">
        <div className="flex items-center justify-start gap-1">
          <span className="text-primary font-bold text-[24px]">
            راهنمای خرید
          </span>
          <span className="text-primary font-semibold text-[17px]">
            دستگاه های سی ان سی
          </span>
        </div>
        <hr className="mt-6" />
        <div className="flex flex-col gap-4 mt-6 pr-1 pl-6 h-[400px] overflow-auto custom-scroll">
          {helpsData.map((data, index) => (
            <React.Fragment key={data.id}>
              <HelpCard data={data} />
              <hr
                className={`${
                  index === helpsData.length - 1 ? "hidden" : ""
                } flex items-center justify-end mr-20`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
