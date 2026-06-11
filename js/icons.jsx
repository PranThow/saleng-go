// icons.jsx — small line-icon set, all 24×24 viewBox, stroke-based.

const __ico = (path, viewBox = '0 0 24 24') => function Icon({ size = 22, color = 'currentColor', strokeWidth = 1.8, style = {} }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none"
      stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}>
      {path}
    </svg>
  );
};

const IconPin = __ico(<>
  <path d="M12 21s7-6.2 7-11.5A7 7 0 1 0 5 9.5C5 14.8 12 21 12 21z" />
  <circle cx="12" cy="9.5" r="2.5" />
</>);
const IconRoute = __ico(<>
  <circle cx="6" cy="6" r="2" />
  <circle cx="18" cy="18" r="2" />
  <path d="M8 6h7a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h7" />
</>);
const IconRecycle = __ico(<>
  <path d="M7 19l-3-1.5L6 14" />
  <path d="M4.5 17.5L7 13l3 1.7" />
  <path d="M12 4l4 2-1 4" />
  <path d="M16 6l-3 5-3-1.7" />
  <path d="M20 17l-2 3.5-4-1" />
  <path d="M18 20.5L13 19.5l1-3.5" />
</>);
const IconTrash = __ico(<>
  <path d="M4 7h16" />
  <path d="M9 7V4h6v3" />
  <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
</>);
const IconBolt = __ico(<>
  <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" />
</>);
const IconClock = __ico(<>
  <circle cx="12" cy="12" r="9" />
  <path d="M12 7v5l3 2" />
</>);
const IconUser = __ico(<>
  <circle cx="12" cy="8" r="4" />
  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
</>);
const IconPhone = __ico(<>
  <path d="M5 4h3l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
</>);
const IconMessage = __ico(<>
  <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
</>);
const IconStar = __ico(<>
  <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
</>);
const IconChevR = __ico(<>
  <path d="M9 6l6 6-6 6" />
</>);
const IconChevL = __ico(<>
  <path d="M15 6l-6 6 6 6" />
</>);
const IconChevD = __ico(<>
  <path d="M6 9l6 6 6-6" />
</>);
const IconClose = __ico(<>
  <path d="M6 6l12 12M18 6L6 18" />
</>);
const IconPlus = __ico(<>
  <path d="M12 5v14M5 12h14" />
</>);
const IconCheck = __ico(<>
  <path d="M5 13l4 4L19 7" />
</>);
const IconCamera = __ico(<>
  <path d="M3 8h3l2-3h8l2 3h3v11H3z" />
  <circle cx="12" cy="13" r="4" />
</>);
const IconMenu = __ico(<>
  <path d="M4 7h16M4 12h16M4 17h16" />
</>);
const IconHome = __ico(<>
  <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />
</>);
const IconReceipt = __ico(<>
  <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
  <path d="M9 8h6M9 12h6M9 16h4" />
</>);
const IconWallet = __ico(<>
  <path d="M3 7a2 2 0 0 1 2-2h13l3 3v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  <path d="M16 13h2" />
</>);
const IconLeaf = __ico(<>
  <path d="M5 19c0-9 6-14 16-14 0 10-5 16-14 16-1 0-2-1-2-2z" />
  <path d="M5 19l8-8" />
</>);
const IconBox = __ico(<>
  <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
  <path d="M3 7l9 4 9-4M12 11v10" />
</>);
const IconWarn = __ico(<>
  <path d="M12 3l10 18H2L12 3z" />
  <path d="M12 10v5M12 18v.5" />
</>);
const IconNav = __ico(<>
  <path d="M3 11l18-7-7 18-3-7-8-4z" />
</>);
const IconLocate = __ico(<>
  <circle cx="12" cy="12" r="3" />
  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
</>);
const IconQR = __ico(<>
  <rect x="3" y="3" width="7" height="7" rx="1" />
  <rect x="14" y="3" width="7" height="7" rx="1" />
  <rect x="3" y="14" width="7" height="7" rx="1" />
  <path d="M14 14h3v3h-3zM18 18h3v3h-3z" />
</>);
const IconShield = __ico(<>
  <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
</>);
const IconBike = __ico(<>
  <circle cx="6" cy="17" r="3" />
  <circle cx="18" cy="17" r="3" />
  <path d="M6 17l4-9h5l3 9M10 8h-2" />
</>);
const IconTruck = __ico(<>
  <path d="M3 7h11v10H3z" />
  <path d="M14 10h4l3 3v4h-7" />
  <circle cx="7" cy="18" r="2" />
  <circle cx="17" cy="18" r="2" />
</>);
const IconLeafSmall = __ico(<>
  <path d="M6 18C6 11 11 6 18 6c0 7-5 12-12 12z" />
  <path d="M6 18l8-8" />
</>);
const IconSwitch = __ico(<>
  <path d="M4 8h13l-3-3M20 16H7l3 3" />
</>);
const IconLayers = __ico(<>
  <path d="M12 3l9 5-9 5-9-5 9-5z" />
  <path d="M3 13l9 5 9-5M3 17l9 5 9-5" />
</>);

Object.assign(window, {
  IconPin, IconRoute, IconRecycle, IconTrash, IconBolt, IconClock, IconUser,
  IconPhone, IconMessage, IconStar, IconChevR, IconChevL, IconChevD, IconClose,
  IconPlus, IconCheck, IconCamera, IconMenu, IconHome, IconReceipt, IconWallet,
  IconLeaf, IconBox, IconWarn, IconNav, IconLocate, IconQR, IconShield,
  IconBike, IconTruck, IconLeafSmall, IconSwitch, IconLayers,
});
