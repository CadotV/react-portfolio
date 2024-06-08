import GradientBG from "./GradientBG";

export default function WideScreenBorders() {
  return (
    <GradientBG>
      <div className="fixed inset-0 -z-10 hidden xl:block"></div>
    </GradientBG>
  );
}
