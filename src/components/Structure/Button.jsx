import GlassmorphismContainer from "./GlassmorphismContainer";

export default function Button({
  children,
  onClick,
  onPointerOver,
  onPointerOut,
  className = "",
}) {
  return (
    <GlassmorphismContainer className={className}>
      <button
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        className="rounded-md flex align-center p-4"
      >
        {children}
      </button>
    </GlassmorphismContainer>
  );
}
