export function getGenres(genreArr, genreIds) {
  return genreIds.map(id => genreArr.find(item => item?.id === id)) || null;
}

export function getYearStr(dateStr) {
  if (!dateStr) return "Unknown";
  const arr = dateStr?.split("-");
  return arr[0];
}

export function formatRunTime(runtimeMins) {
  if (!runtimeMins) return null;
  if (runtimeMins < 60) return `${runtimeMins}m`;
  const hr = Math.floor(runtimeMins / 60);
  const min = runtimeMins % 60;
  return `${hr}h ${min}m`;
}
