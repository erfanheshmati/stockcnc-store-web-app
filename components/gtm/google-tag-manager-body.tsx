"use client";

export const GoogleTagManagerBody = () => {
  const GTM_ID = "GTM-MKFB7ZDC";

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
};
