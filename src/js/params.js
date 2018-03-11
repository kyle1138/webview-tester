export default function params(url){

  if(!url) url = "";
  const _searchString  = url.split("?")[1] || "";
  const _urlParams = {};
  const search = /([^&=]+)=?([^&]*)/g;

  let match = search.exec(_searchString);
  while (match) {
    _urlParams[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    match = search.exec(_searchString);
  }
  return _urlParams;

}
