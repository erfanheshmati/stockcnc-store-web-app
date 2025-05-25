"use client";

import { cn } from "@/lib/utils";
import { BiChevronDown } from "react-icons/bi";
import { useFiltersLogic } from "@/contexts/filter-logic-context";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, ChangeEvent, FormEvent, useState, useEffect } from "react";
import { StringFilter } from "@/lib/types";

// Copied from context (not exported)
type NumericFilter = { min: number; max: number };
type CheckboxFilter = { [option: string]: boolean };
type CheckedItems = {
  [key: string]: NumericFilter | CheckboxFilter;
};

export default function AdvancedFilter({ className }: { className: string }) {
  const { attributes, setCheckedItems, checkedItems } = useFiltersLogic();
  const router = useRouter();
  const pathname = usePathname();

  // Find the filter objects by their Persian titles
  const deviceTypeFilter = useMemo(
    () => attributes.find((f) => f.title === "نوع دستگاه"),
    [attributes]
  ) as StringFilter | undefined;
  const controlFilter = useMemo(
    () => attributes.find((f) => f.title === "کنترل"),
    [attributes]
  ) as StringFilter | undefined;
  const axisCountFilter = useMemo(
    () => attributes.find((f) => f.title === "تعداد محور"),
    [attributes]
  ) as StringFilter | undefined;

  // Local state for selected values
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedControl, setSelectedControl] = useState("");
  const [selectedAxisCount, setSelectedAxisCount] = useState("");

  // Track if screen is small (below 'sm')
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Get options from context (they will update as context state changes)
  const deviceTypeOptions =
    deviceTypeFilter?.type === "string" ? deviceTypeFilter.value : [];
  const controlOptions =
    controlFilter?.type === "string" ? controlFilter.value : [];
  const axisCountOptions =
    axisCountFilter?.type === "string" ? axisCountFilter.value : [];

  // Reset selectedControl if not in controlOptions
  useEffect(() => {
    if (
      selectedControl &&
      !controlOptions.some((opt) => opt.value === selectedControl)
    ) {
      setSelectedControl("");
      setSelectedAxisCount("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlOptions]);

  // Reset selectedAxisCount if not in axisCountOptions
  useEffect(() => {
    if (
      selectedAxisCount &&
      !axisCountOptions.some((opt) => opt.value === selectedAxisCount)
    ) {
      setSelectedAxisCount("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axisCountOptions]);

  // New: Set checkedItems for single-select filters
  const handleSelectFilterChange = (
    filterId: string,
    value: string,
    clearIds: string[] = []
  ) => {
    const newChecked: CheckedItems = { ...checkedItems };
    newChecked[filterId] = { [value]: true };
    clearIds.forEach((id) => {
      delete newChecked[id];
    });
    setCheckedItems(newChecked);
  };

  // On each select, update context and local state
  const handleDeviceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDeviceType(value);
    setSelectedControl("");
    setSelectedAxisCount("");
    if (deviceTypeFilter) {
      handleSelectFilterChange(
        deviceTypeFilter.id,
        value,
        [controlFilter?.id, axisCountFilter?.id].filter(Boolean) as string[]
      );
    }
  };
  const handleControlChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedControl(value);
    setSelectedAxisCount("");
    if (controlFilter) {
      handleSelectFilterChange(
        controlFilter.id,
        value,
        [axisCountFilter?.id].filter(Boolean) as string[]
      );
    }
  };
  const handleAxisCountChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAxisCount(value);
    if (axisCountFilter) {
      handleSelectFilterChange(axisCountFilter.id, value);
    }
  };

  // On submit, call applyFilters and redirect
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDeviceType && deviceTypeFilter)
      params.set(deviceTypeFilter.id, selectedDeviceType);
    if (selectedControl && controlFilter)
      params.set(controlFilter.id, selectedControl);
    if (selectedAxisCount && axisCountFilter)
      params.set(axisCountFilter.id, selectedAxisCount);
    router.push("/archiv?" + params.toString());
  };

  useEffect(() => {
    if (pathname === "/") {
      // Only keep reserved params (q, category, sort)
      const urlParams = new URLSearchParams(window.location.search);
      const reservedKeys = ["q", "category", "sort"];
      const newParams = new URLSearchParams();
      reservedKeys.forEach((key) => {
        if (urlParams.has(key)) {
          newParams.set(key, urlParams.get(key)!);
        }
      });
      const newUrl = `${window.location.pathname}${
        newParams.toString() ? "?" + newParams.toString() : ""
      }`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [pathname]);

  return (
    <div
      className={cn(
        "flex w-[90%] md:w-[740px] lg:w-[995px] h-[65px] sm:h-[75px] md:h-[92px] bg-white shadow-lg rounded-l-2xl rounded-br-2xl relative",
        className
      )}
    >
      {/* Sloped Label Background */}
      <div
        className="absolute -top-[40px] md:-top-[55px] right-2 sm:right-4 h-[40px] md:h-[60px] w-[180px] md:w-[300px] rounded-tr-2xl bg-[#D7DDE938]"
        style={{
          clipPath: "polygon(28% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      ></div>

      {/* Sloped Label */}
      <div
        className="absolute -top-[35px] md:-top-[50px] h-[40px] md:h-[60px] w-[180px] md:w-[280px] rounded-tr-2xl bg-white flex items-center px-4 md:px-10"
        style={{
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <span className="text-primary font-bold text-md md:text-[20px]">
          جستجوی پیشرفته
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-1 w-full px-2 sm:px-4 md:px-6 lg:px-10 overflow-hidden"
      >
        {/* Filter 1: نوع دستگاه */}
        <div className="relative">
          <select
            onChange={handleDeviceTypeChange}
            value={selectedDeviceType}
            className="flex px-2 sm:px-4 focus:outline-none text-[12px] md:text-[15px] min-w-[90px] sm:min-w-[140px] md:min-w-[190px] lg:min-w-[220px] h-[45px] md:h-[55px] rounded-2xl md:rounded-full bg-[#F0F3F8] text-[#52637C] font-semibold cursor-pointer appearance-none"
          >
            <option value="">نوع دستگاه</option>
            {deviceTypeOptions.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon */}
          {(!isSmallScreen || selectedDeviceType === "") && (
            <div className="flex items-center gap-2 absolute top-1/2 left-0 sm:left-2 md:left-4 transform -translate-y-1/2 pointer-events-none">
              <span className="hidden lg:block text-[#8C9EB9] text-[12px]">
                انتخاب کنید
              </span>
              <BiChevronDown className="fill-[#536683]" />
            </div>
          )}
        </div>
        {/* Filter 2: کنترل */}
        <div className="relative">
          <select
            onChange={handleControlChange}
            value={selectedControl}
            disabled={!selectedDeviceType}
            className="flex px-2 sm:px-4 focus:outline-none text-[12px] md:text-[15px] min-w-[90px] sm:min-w-[140px] md:min-w-[190px] lg:min-w-[220px] h-[45px] md:h-[55px] rounded-2xl md:rounded-full bg-[#F0F3F8] text-[#52637C] font-semibold cursor-pointer appearance-none disabled:bg-gray-200"
          >
            <option value="">کنترل</option>
            {controlOptions.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon */}
          {(!isSmallScreen || selectedControl === "") && (
            <div className="flex items-center gap-2 absolute top-1/2 left-0 sm:left-2 md:left-4 transform -translate-y-1/2 pointer-events-none">
              <span className="hidden lg:block text-[#8C9EB9] text-[12px]">
                انتخاب کنید
              </span>
              <BiChevronDown className="fill-[#536683]" />
            </div>
          )}
        </div>
        {/* Filter 3: تعداد محور */}
        <div className="relative">
          <select
            onChange={handleAxisCountChange}
            value={selectedAxisCount}
            disabled={!selectedControl}
            className="flex px-2 sm:px-4 focus:outline-none text-[12px] md:text-[15px] min-w-[90px] sm:min-w-[140px] md:min-w-[190px] lg:min-w-[220px] h-[45px] md:h-[55px] rounded-2xl md:rounded-full bg-[#F0F3F8] text-[#52637C] font-semibold cursor-pointer appearance-none disabled:bg-gray-200"
          >
            <option value="">تعداد محور</option>
            {axisCountOptions.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon */}
          {(!isSmallScreen || selectedAxisCount === "") && (
            <div className="flex items-center gap-2 absolute top-1/2 left-0 sm:left-2 md:left-4 transform -translate-y-1/2 pointer-events-none">
              <span className="hidden lg:block text-[#8C9EB9] text-[12px]">
                انتخاب کنید
              </span>
              <BiChevronDown className="fill-[#536683]" />
            </div>
          )}
        </div>
        <button
          className="disabled:opacity-50"
          type="submit"
          disabled={
            !selectedDeviceType || !selectedControl || !selectedAxisCount
          }
        >
          <svg
            width="62"
            height="17"
            viewBox="0 0 62 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] sm:w-[62px] h-auto group"
          >
            <path
              d="M3.68457 13C3.71973 13.1348 3.76953 13.2578 3.83398 13.3691C3.89844 13.4805 3.99219 13.5859 4.11523 13.6855C4.20312 13.75 4.2998 13.7969 4.40527 13.8262C4.5166 13.8613 4.62793 13.8848 4.73926 13.8965C4.85059 13.9141 4.96191 13.9229 5.07324 13.9229C5.18457 13.9287 5.29004 13.9316 5.38965 13.9316H6.84863C7.04199 13.9316 7.26172 13.9229 7.50781 13.9053C7.75977 13.8877 7.9707 13.8145 8.14062 13.6855C8.35156 13.5098 8.49805 13.2812 8.58008 13V3.48145H12.0869V10.5918H14.0996V3.46387H17.5977V10.5918H19.0918C19.1504 10.5918 19.2236 10.5771 19.3115 10.5479C19.4053 10.5127 19.4697 10.4717 19.5049 10.4248C19.5283 10.3779 19.5459 10.3105 19.5576 10.2227C19.5693 10.1289 19.5752 10.041 19.5752 9.95898V3.46387H23.0645V10.5918H24.541V13H12.0518C12.0166 13.3867 11.9434 13.7412 11.832 14.0635C11.7266 14.3916 11.5654 14.6963 11.3486 14.9775C10.9795 15.4346 10.5078 15.7598 9.93359 15.9531C9.35938 16.1465 8.70312 16.2432 7.96484 16.2432H4.29102C3.55273 16.2432 2.89648 16.1465 2.32227 15.9531C1.74805 15.7598 1.27637 15.4346 0.907227 14.9775C0.749023 14.7842 0.620117 14.5791 0.520508 14.3623C0.426758 14.1455 0.350586 13.9111 0.291992 13.6592C0.239258 13.4072 0.201172 13.1406 0.177734 12.8594C0.160156 12.5723 0.151367 12.2646 0.151367 11.9365V5.94238H3.68457V13ZM14.082 2.50586V0.396484H17.6152V2.50586H14.082ZM8.58008 2.50586V0.396484H12.1045V2.50586H8.58008ZM19.5049 2.50586V0.396484H23.0293V2.50586H19.5049ZM32.8379 9.00098C32.8379 9.22949 32.8262 9.47852 32.8027 9.74805C32.7852 10.0176 32.7383 10.293 32.6621 10.5742C32.5859 10.8555 32.4717 11.1309 32.3193 11.4004C32.1729 11.6641 31.9678 11.9043 31.7041 12.1211C31.4404 12.3379 31.1504 12.5049 30.834 12.6221C30.5234 12.7393 30.21 12.8271 29.8936 12.8857C29.5771 12.9385 29.2695 12.9707 28.9707 12.9824C28.6777 12.9941 28.4141 13 28.1797 13H24.3828V10.583H27.0635C27.2393 10.583 27.4092 10.5771 27.5732 10.5654C27.7432 10.5479 27.9014 10.5156 28.0479 10.4688C28.2002 10.416 28.3438 10.3457 28.4785 10.2578C28.6133 10.1699 28.7363 10.0527 28.8477 9.90625C28.9531 9.76562 29.0352 9.61914 29.0938 9.4668C29.1582 9.30859 29.2051 9.15039 29.2344 8.99219C29.2695 8.83398 29.29 8.67871 29.2959 8.52637C29.3076 8.37402 29.3135 8.22754 29.3135 8.08691V3.48145H32.8379V9.00098ZM29.3135 16.1729V14.0635H32.8643V16.1729H29.3135ZM25.0508 16.1729V14.0635H28.5752V16.1729H25.0508ZM34.4551 0.396484H37.9883V8.08691C37.9883 8.36816 38.0146 8.67285 38.0674 9.00098C38.1201 9.32324 38.249 9.625 38.4541 9.90625C38.5654 10.0586 38.6885 10.1787 38.8232 10.2666C38.9639 10.3545 39.1074 10.4248 39.2539 10.4775C39.4062 10.5244 39.5645 10.5566 39.7285 10.5742C39.8926 10.5859 40.0625 10.5918 40.2383 10.5918H40.4229V13H39.1221C38.8877 13 38.6211 12.9941 38.3223 12.9824C38.0234 12.9707 37.7158 12.9385 37.3994 12.8857C37.083 12.8271 36.7695 12.7393 36.459 12.6221C36.1484 12.5049 35.8613 12.3379 35.5977 12.1211C35.334 11.9102 35.126 11.6699 34.9736 11.4004C34.8213 11.1309 34.707 10.8555 34.6309 10.5742C34.5547 10.293 34.5049 10.0176 34.4814 9.74805C34.4639 9.47266 34.4551 9.22363 34.4551 9.00098V0.396484ZM48.1396 3.34961C48.5146 3.34961 48.8955 3.3584 49.2822 3.37598C49.6748 3.39355 50.0557 3.43457 50.4248 3.49902C50.7998 3.56348 51.1543 3.66016 51.4883 3.78906C51.8223 3.91797 52.1211 4.09668 52.3848 4.3252C52.6836 4.58887 52.915 4.89648 53.0791 5.24805C53.2432 5.59961 53.3662 5.95703 53.4482 6.32031C53.5303 6.68359 53.5801 7.03516 53.5977 7.375C53.6152 7.70898 53.624 7.99316 53.624 8.22754C53.624 8.37402 53.6211 8.53809 53.6152 8.71973C53.6094 8.90137 53.5977 9.09473 53.5801 9.2998C53.5625 9.50488 53.5332 9.71582 53.4922 9.93262C53.457 10.1494 53.4043 10.3662 53.334 10.583H54.5732V13H48.4385C47.5303 13 46.7363 12.9561 46.0566 12.8682C45.3828 12.7744 44.8291 12.6514 44.3955 12.499C44.1553 12.6279 43.9033 12.7275 43.6396 12.7979C43.3818 12.8623 43.124 12.9121 42.8662 12.9473C42.6084 12.9766 42.3594 12.9941 42.1191 13C41.8848 13 41.6709 13 41.4775 13H40.2207V10.583H40.3613C40.5371 10.583 40.707 10.5771 40.8711 10.5654C41.0352 10.5479 41.1934 10.5156 41.3457 10.4688C41.498 10.416 41.6387 10.3457 41.7676 10.2578C41.9023 10.1699 42.0283 10.0527 42.1455 9.90625C42.251 9.76562 42.333 9.61914 42.3916 9.4668C42.4561 9.30859 42.5029 9.14746 42.5322 8.9834C42.5674 8.81934 42.5908 8.6582 42.6025 8.5C42.6143 8.33594 42.623 8.1748 42.6289 8.0166C42.6289 7.75879 42.6406 7.47168 42.6641 7.15527C42.6875 6.83301 42.7402 6.50488 42.8223 6.1709C42.9102 5.83691 43.0361 5.51172 43.2002 5.19531C43.3643 4.87305 43.5869 4.58301 43.8682 4.3252C44.1318 4.09668 44.4307 3.91797 44.7646 3.78906C45.0986 3.6543 45.4502 3.55469 45.8193 3.49023C46.1885 3.42578 46.5693 3.3877 46.9619 3.37598C47.3604 3.3584 47.7529 3.34961 48.1396 3.34961ZM46.2061 8.22754C46.2061 8.49121 46.2178 8.71973 46.2412 8.91309C46.2646 9.10059 46.2939 9.26172 46.3291 9.39648C46.3643 9.52539 46.4023 9.63086 46.4434 9.71289C46.4844 9.78906 46.5195 9.85352 46.5488 9.90625C46.5605 9.93555 46.6016 9.98535 46.6719 10.0557C46.7422 10.126 46.8418 10.1992 46.9707 10.2754C47.0996 10.3457 47.2607 10.4102 47.4541 10.4688C47.6475 10.5273 47.876 10.5566 48.1396 10.5566C48.374 10.5566 48.5762 10.5332 48.7461 10.4863C48.916 10.4395 49.0625 10.3838 49.1855 10.3193C49.3086 10.249 49.4082 10.1787 49.4844 10.1084C49.5664 10.0322 49.6338 9.96484 49.6865 9.90625C49.8213 9.70117 49.9121 9.45801 49.959 9.17676C50.0117 8.89551 50.0381 8.5791 50.0381 8.22754C50.0381 7.97559 50.0293 7.75879 50.0117 7.57715C49.9941 7.39551 49.9707 7.2373 49.9414 7.10254C49.9121 6.96777 49.877 6.85645 49.8359 6.76855C49.7949 6.6748 49.751 6.59277 49.7041 6.52246C49.6514 6.46387 49.584 6.39941 49.502 6.3291C49.4199 6.25293 49.3174 6.18555 49.1943 6.12695C49.0713 6.0625 48.9219 6.00977 48.7461 5.96875C48.5762 5.92773 48.374 5.90723 48.1396 5.90723C47.8936 5.90723 47.6797 5.92773 47.498 5.96875C47.3223 6.00977 47.1729 6.0625 47.0498 6.12695C46.9268 6.18555 46.8242 6.25293 46.7422 6.3291C46.666 6.39941 46.6016 6.46387 46.5488 6.52246C46.5195 6.56934 46.4844 6.63379 46.4434 6.71582C46.4023 6.79199 46.3643 6.89453 46.3291 7.02344C46.2939 7.15234 46.2646 7.31641 46.2412 7.51562C46.2178 7.70898 46.2061 7.94629 46.2061 8.22754ZM61.4375 9.00098C61.4375 9.22949 61.4258 9.47852 61.4023 9.74805C61.3848 10.0176 61.3379 10.293 61.2617 10.5742C61.1855 10.8555 61.0713 11.1309 60.9189 11.4004C60.7725 11.6641 60.5674 11.9043 60.3037 12.1211C60.04 12.3379 59.75 12.5049 59.4336 12.6221C59.123 12.7393 58.8096 12.8271 58.4932 12.8857C58.1768 12.9385 57.8691 12.9707 57.5703 12.9824C57.2773 12.9941 57.0137 13 56.7793 13H54.4414V10.583H55.6631C55.8389 10.583 56.0088 10.5771 56.1729 10.5654C56.3428 10.5479 56.501 10.5156 56.6475 10.4688C56.7998 10.416 56.9434 10.3457 57.0781 10.2578C57.2129 10.1699 57.3359 10.0527 57.4473 9.90625C57.5527 9.76562 57.6348 9.61914 57.6934 9.4668C57.7578 9.30859 57.8047 9.15039 57.834 8.99219C57.8691 8.83398 57.8896 8.67871 57.8955 8.52637C57.9072 8.37402 57.9131 8.22754 57.9131 8.08691V3.48145H61.4375V9.00098ZM57.9131 2.50586V0.396484H61.4375V2.50586H57.9131Z"
              fill="#8898af"
              className={`transition-all duration-300 ease-in-out ${
                !selectedDeviceType || !selectedControl || !selectedAxisCount
                  ? ""
                  : "group-hover:fill-primary"
              }`}
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
