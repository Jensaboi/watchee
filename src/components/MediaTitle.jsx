import Badge from "./ui/Badge";
export default function MediaTitle({ title, year, runtime, ageRating }) {
  return (
    <div>
      <h1 className="text-center md:text-start">{title}</h1>
      <div className="flex-center md:justify-start gap-sm text-text-500">
        {ageRating && <Badge variant="ageRating">{ageRating}</Badge>}
        {year && (
          <Badge variant="underline">
            {ageRating && <Badge variant="dot" />}
            {year}
          </Badge>
        )}

        {runtime && (
          <Badge variant="underline">
            <Badge variant="dot" />
            {runtime}
          </Badge>
        )}
      </div>
    </div>
  );
}
