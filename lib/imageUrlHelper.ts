export const imageUrlHelper = (url: string | null | undefined) => {
  if (url) {
    return `https://image.tmdb.org/t/p/original${url}`;
  } else {
    return "/img/placeholder.png";
  }
};
