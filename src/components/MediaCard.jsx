export default function MediaCard({ title, imgUrl, genreStr }) {
  return (
    <article className="h-full flex flex-col gap-xs cursor-pointer transition-transform duration-300 ease-out hover:scale-102 active:scale-99 active:border border-bg-500/30 hover:shadow-lg rounded-md overflow-hidden">
      <div className="aspect-[7/10] w-full overflow-hidden rounded-md">
        <img
          className="object-center object-cover w-full h-full"
          src={imgUrl}
          alt={`${title ? `${title} poster` : ""}`}
        />
      </div>

      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-sm text-text-400">{genreStr}</p>
    </article>
  );
}
