export default function MediaOverview({ overview }) {
  return (
    <div>
      <p className="line-clamp-3 tracking-wide leading-relaxed">{overview}</p>
    </div>
  );
}
