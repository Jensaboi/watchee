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
    <div className="w-full md:max-w-[300px] px-lg py-3xl bg-bg-300 rounded-md flex flex-col gap-xl shrink-0">
      <div>
        <h3 className="mb-1">Status</h3>
        <p className="font-light">{status}</p>
      </div>
      <div>
        <h3 className="mb-1">Release Date</h3>
        <p className="font-light">{releaseDate}</p>
      </div>
      {ended && (
        <div>
          <h3 className="mb-1">Ended</h3>
          <p className="font-light">{ended}</p>
        </div>
      )}
      <div>
        <h3 className="mb-1">Original language</h3>
        <p className="font-light">{OriginalLanguage}</p>
      </div>
      <div>
        <h3 className="mb-1">Spoken languages</h3>
        <ul className="flex flex-row gap-xs">
          {spokenLanguages.map((item, i) => (
            <li key={item.id} className="font-light">
              {item.english_name}
              {i < spokenLanguages.length - 1 ? "," : ""}
            </li>
          ))}
        </ul>
      </div>
      {budget && (
        <div>
          <h3 className="mb-1">Budget</h3>
          <p className="font-light">{budget}</p>
        </div>
      )}
      {revenue && (
        <div>
          <h3 className="mb-1">Revenue</h3>
          <p className="font-light">{revenue}</p>
        </div>
      )}
      <div>
        <h3 className="mb-1">{ageRating}</h3>
        <p>{ageRatingExplanation}</p>
      </div>
    </div>
  );
}
