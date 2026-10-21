export default function PaperFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="deckle" x="-3%" y="-3%" width="106%" height="106%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
