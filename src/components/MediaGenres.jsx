import Badge from "./ui/Badge";

export default function MediaGenres({ genres = [] }) {
  return (
    <div className="flex-center gap-sm">
      {genres.map(item => (
        <Badge variant="genre" key={item.id}>
          {item.name}
        </Badge>
      ))}
    </div>
  );
}
