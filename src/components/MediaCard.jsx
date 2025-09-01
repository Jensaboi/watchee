export default function MediaCard({ title, imgUrl, genreStr }) {
  return (
    <article className="h-full w-full">
      <img
        className="object-center object-cover rounded-md w-full h-full"
        src={imgUrl}
        alt={`${title ? `${title} poster` : ""}`}
      />

      <h3 className="text-normal">{title}</h3>
      <p>{genreStr}</p>
    </article>
  );
}
