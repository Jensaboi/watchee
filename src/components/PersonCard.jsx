export default function PersonCard({
  name,
  imgUrl,
  knownFor = null,
  character = null,
}) {
  return (
    <article className="w-42 flex overflow-hidden flex-col items-center justify-center">
      <img
        className="hover:scale-101 border-transparent border-2 hover:border-bg-400 object-center object-cover rounded-full h-40 w-40"
        alt={`${name}`}
        src={imgUrl}
      />
      <h3 className="truncate font-normal">{name}</h3>
      <p className="text-sm text-text-300">{knownFor || character}</p>
    </article>
  );
}
