export default function MediaDetailsSidebar({
  status,
  OriginalLanguage,
  spokenLanguages = [],
  budget,
  revenue,
  ageRating,
  releaseDate,
  ended,
  ageRatingExplanation,
}) {
  return (
    <div>
      <div>
        <h3>Status</h3>
        <p>{status}</p>
      </div>
      <div>
        <h3>Release Date</h3>
        <p>{releaseDate}</p>
      </div>
      {ended && (
        <div>
          <h3>Ended</h3>
          <p>{ended}</p>
        </div>
      )}
      <div>
        <h3>Original language</h3>
        <p>{OriginalLanguage}</p>
      </div>
      <div>
        <h3>Spoken languages</h3>
        <ul className="flex flex-row gap-xs">
          {spokenLanguages.map((item, i) => (
            <li>
              {item.english_name}
              {i < spokenLanguages.length - 1 ? "," : ""}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Budget</h3>
        <p>{budget}</p>
      </div>
      <div>
        <h3>Revenue</h3>
        <p>{revenue}</p>
      </div>
      <div>
        <h3>{ageRating}</h3>
        <p>{ageRatingExplanation}</p>
      </div>
    </div>
  );
}
