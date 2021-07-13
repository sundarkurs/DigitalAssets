export const getAvatarText = (text) => {
  var matches = text.match(/\b(\w)/g);
  var acronym = matches.join("");

  return acronym.toUpperCase().substring(0, 2);
};
