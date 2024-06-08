export default function HeaderImg({ imgSrc, imgAlt }) {
  return (
    <div className="relative w-1/2 rounded-lg overflow-hidden ">
      <img
        src={imgSrc}
        alt={imgAlt}
        className="rounded-lg w-full object h-full object-cover"
      />
    </div>
  );
}
