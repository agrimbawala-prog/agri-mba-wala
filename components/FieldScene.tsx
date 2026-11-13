export function FieldScene() {
  return (
    <svg className="field-scene" role="img" aria-label="Illustration of a connected farm community" viewBox="0 0 700 590" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="350" y1="0" x2="350" y2="400" gradientUnits="userSpaceOnUse"><stop stopColor="#E7F4E6"/><stop offset="1" stopColor="#BFDDBB"/></linearGradient>
        <linearGradient id="field" x1="350" y1="320" x2="350" y2="590" gradientUnits="userSpaceOnUse"><stop stopColor="#72B567"/><stop offset="1" stopColor="#2E7D52"/></linearGradient>
      </defs>
      <path d="M42 417C94 300 160 225 280 224c115-1 182 96 264 76 58-14 82-79 127-162v279H42Z" fill="url(#sky)"/>
      <circle cx="557" cy="108" r="48" fill="#F6AE32" opacity=".9"/>
      <path d="M42 417C157 353 243 380 332 427c97 52 209 23 339-42v205H42V417Z" fill="url(#field)"/>
      <path d="M44 477c115-65 212-45 306 6 100 54 202 34 321-37M44 537c112-61 206-40 295 8 108 58 225 25 332-44" stroke="#D4EAAA" strokeWidth="11" opacity=".75"/>
      <path d="M122 373c17-66 45-104 84-114-14 48-36 81-66 99M129 360c25-47 41-88 54-125" stroke="#174D34" strokeWidth="8" strokeLinecap="round"/>
      <path d="M580 334c-14-56-39-91-74-103 11 42 31 72 59 89M571 322c-22-43-37-80-48-113" stroke="#174D34" strokeWidth="8" strokeLinecap="round"/>
      <g className="scene-card scene-card-one"><rect x="94" y="91" width="183" height="113" rx="18" fill="white"/><rect x="115" y="115" width="57" height="57" rx="15" fill="#EDF6EE"/><path d="M143 158c2-15 8-25 18-30-1 10-5 18-13 24" stroke="#2E7D52" strokeWidth="4" strokeLinecap="round"/><rect x="188" y="119" width="64" height="11" rx="5.5" fill="#174D34"/><rect x="188" y="143" width="46" height="9" rx="4.5" fill="#B1C9B6"/></g>
      <g className="scene-card scene-card-two"><rect x="418" y="266" width="191" height="118" rx="18" fill="white"/><circle cx="450" cy="299" r="17" fill="#F6AE32"/><path d="M443 301l5 5 10-12" stroke="#174D34" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><rect x="480" y="288" width="96" height="11" rx="5.5" fill="#174D34"/><rect x="480" y="313" width="70" height="9" rx="4.5" fill="#B1C9B6"/></g>
      <g className="scene-person"><circle cx="303" cy="338" r="27" fill="#6C4626"/><path d="M268 421c5-54 27-83 65-83s60 29 65 83" fill="#F6AE32"/><path d="M284 337c3-33 50-47 65-3-15 12-49 11-65 3Z" fill="#183326"/><path d="M263 422h143" stroke="#174D34" strokeWidth="13" strokeLinecap="round"/></g>
      <g className="scene-phone"><rect x="270" y="198" width="130" height="210" rx="22" fill="#174D34"/><rect x="280" y="217" width="110" height="166" rx="11" fill="#FFFDF7"/><rect x="298" y="242" width="75" height="13" rx="6.5" fill="#2E7D52"/><rect x="298" y="274" width="52" height="9" rx="4.5" fill="#B1C9B6"/><rect x="298" y="292" width="64" height="9" rx="4.5" fill="#B1C9B6"/><circle cx="335" cy="341" r="20" fill="#F6AE32"/><path d="m326 341 6 6 13-15" stroke="#174D34" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></g>
    </svg>
  );
}
