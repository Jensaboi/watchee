export default function PersonCard({
  name,
  imgUrl,
  knownFor = null,
  character = null,
}) {
  return (
    <article className="flex overflow-hidden flex-col items-center justify-center">
      <img
        className="hover:scale-101 border-transparent border-2 hover:border-bg-400 object-center object-cover size-40 rounded-4xl"
        alt={`${name}`}
        src={imgUrl}
      />
      <div>
        <h3 className="truncate font-normal">{name}</h3>
        <p className="text-start text-sm text-text-300">
          {knownFor || character}
        </p>
      </div>
    </article>
  );
}
