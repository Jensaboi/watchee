export default function MediaCard({ title, imgUrl, genreStr }) {
  return (
    <article>
      <img src={imgUrl} alt={`${title ? `${title} poster` : ""}`} />
      <h3>{title}</h3>
      <p>{genreStr}</p>
    </article>
  );
}
