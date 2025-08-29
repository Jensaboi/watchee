export function getGenres(genreArr, genreIds) {
  return genreIds.map(id => genreArr.find(item => item?.id === id)) || null;
}

export function getYearStr(dateStr) {
  if (!dateStr) return null;
  const arr = dateStr?.split("-");
  return arr[0];
}

export function getAgeRating(mediaType, ratingsArr, countryCode = "US") {
  if (mediaType === "movie") {
    const countryArr = ratingsArr?.find(
      item => item?.iso_3166_1 === countryCode
    );

    return (
      countryArr?.release_dates?.filter(item => item?.type === 3)?.[0]
        ?.certification || null
    );
  }
  if (mediaType === "tv") {
    const countryArr = ratingsArr?.find(
      item => item?.iso_3166_1 === countryCode
    );

    return countryArr?.rating || null;
  }
  return null;
}

export function formatRunTimeStr(runtimeMins) {
  if (!runtimeMins) return null;
  if (runtimeMins < 60) return `${runtimeMins}m`;
  const hr = Math.floor(runtimeMins / 60);
  const min = runtimeMins % 60;
  return `${hr}h ${min}m`;
}

export function getLanguageName(langArr, lang) {
  const langObj = langArr?.find(
    item => item?.iso_639_1?.toLowerCase() === lang?.toLowerCase()
  );
  return langObj?.english_name || null;
}

export function getAgeRatingExplanation(rating, countryCode = "US", obj) {
  const explanationsArr = obj[countryCode];
  const certObj = explanationsArr?.find(
    item => item.certification.toLowerCase() === rating?.toLowerCase()
  );

  return {
    short: certObj?.meaning?.split(". ")?.[0] || null,
    long: certObj?.meaning || null,
  };
}
