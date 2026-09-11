const eyes = {
  happy: (
    <>
      <circle cx="35" cy="45" r="5" fill="#171717" />
      <circle cx="65" cy="45" r="5" fill="#171717" />
    </>
  ),
  dot: (
    <>
      <circle cx="35" cy="45" r="3" fill="#171717" />
      <circle cx="65" cy="45" r="3" fill="#171717" />
    </>
  ),
  wink: (
    <>
      <circle cx="35" cy="45" r="5" fill="#171717" />
      <path
        d="M 60 45 Q 65 40 70 45"
        stroke="#171717"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  angry: (
    <>
      <path
        d="M 28 38 L 42 45"
        stroke="#171717"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 72 38 L 58 45"
        stroke="#171717"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="35" cy="48" r="4" fill="#171717" />
      <circle cx="65" cy="48" r="4" fill="#171717" />
    </>
  ),
};

const mouths = {
  smile: (
    <path
      d="M 35 65 Q 50 78 65 65"
      stroke="#171717"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  ),
  flat: (
    <path
      d="M 38 68 L 62 68"
      stroke="#171717"
      strokeWidth="4"
      strokeLinecap="round"
    />
  ),
  open: <ellipse cx="50" cy="68" rx="10" ry="8" fill="#171717" />,
  smirk: (
    <path
      d="M 38 65 Q 50 70 62 60"
      stroke="#171717"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  ),
};

const accessories = {
  none: null,
  cap: <path d="M 20 30 Q 50 5 80 30 L 80 32 L 20 32 Z" fill="#171717" />,
  glasses: (
    <>
      <circle
        cx="35"
        cy="45"
        r="10"
        fill="none"
        stroke="#171717"
        strokeWidth="3"
      />
      <circle
        cx="65"
        cy="45"
        r="10"
        fill="none"
        stroke="#171717"
        strokeWidth="3"
      />
      <path d="M 45 45 L 55 45" stroke="#171717" strokeWidth="3" />
    </>
  ),
  headband: <rect x="15" y="25" width="70" height="8" rx="4" fill="#F05A5A" />,
};

export default function Avatar({ config, size = 80 }) {
  const safeConfig = config || {
    bg: "FFD93D",
    eyes: "happy",
    mouth: "smile",
    accessory: "none",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="rounded-full"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={safeConfig.bg}
        stroke="#171717"
        strokeWidth="3"
      />
      {eyes[safeConfig.eyes] || eyes.happy}
      {mouths[safeConfig.mouth] || mouths.smile}
      {accessories[safeConfig.accessories]}
    </svg>
  );
}
