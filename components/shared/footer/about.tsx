import React from "react";
import Logo1 from "../logo-1";

export default function About() {
  return (
    <div className="hidden lg:flex flex-col w-1/3 z-10">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-[15px]">
          درباره سی ان سی استوک
        </h2>
        <Logo1 className="w-[130px]" />
      </div>
      <p className="text-white/75 font-light text-[13px] leading-9 mt-4 text-justify line-clamp-4">
        لورم ایپسوم متنی ساختگی ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
        استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون
        و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
        درصد گذشته، حال و آینده شناخت فراوان ...
      </p>
    </div>
  );
}
