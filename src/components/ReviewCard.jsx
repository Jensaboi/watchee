import Overview from "./Overview";

export default function ReviewCard({
  profileAvatar,
  author,
  body,
  date,
  ...rest
}) {
  return (
    <article className="min-w-100 bg-bg-300 p-md rounded-md" {...rest}>
      <div className="rounded-full size-16 aspect-square overflow-hidden mr-md float-left">
        <img
          className="w-full h-full object-center object-cover"
          src={profileAvatar}
        />
      </div>
      <div>
        <h3>{author}</h3>

        <Overview overview={body} />
        <span>{date}</span>
      </div>
    </article>
  );
}
