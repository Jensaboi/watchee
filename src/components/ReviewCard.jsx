export default function ReviewCard({
  profileAvatar,
  name,
  body,
  date,
  ...rest
}) {
  return (
    <article {...rest}>
      <img src={profileAvatar} />
    </article>
  );
}
