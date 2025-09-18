export default function ReviewCard({
  profileAvatar,
  author,
  body,
  date,
  ...rest
}) {
  return (
    <article {...rest}>
      <div className="rounded-full size-16 aspect-square overflow-hidden float-left">
        <img
          className="w-full h-full object-center object-cover"
          src={profileAvatar}
        />
      </div>
      <div>
        <h3>{author}</h3>

        <p>{body}</p>
        <span>{date}</span>
      </div>
    </article>
  );
}
