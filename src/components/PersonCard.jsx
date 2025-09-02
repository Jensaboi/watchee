export default function PersonCard({
  name,
  imgUrl,
  knownFor = null,
  character = null,
}) {
  return (
    <article className="relative gap-xs cursor-pointer transition-transform duration-300 ease-out hover:scale-102 hover:shadow-lg rounded-xl overflow-hidden">
      <div className="aspect-square h-full w-full overflow-hidden rounded-full">
        <img
          className="object-cover object-center h-full w-full transition-transform duration-500 hover:scale-102"
          alt={name}
          src={imgUrl}
        />
      </div>

      <h3 className="text-base font-medium">{name}</h3>
      <p className="text-sm text-text-400">{knownFor || character}</p>
    </article>
  );
}
