import $ from "jquery";

export default class WebviewTest {

  constructor(raw) {

    this.raw = raw;
    this.doc = $(raw);
    this.miContent = this.findMiContent(this.doc);
    this.allParams = this.collectParams(this.miContent);
    this.updateImageSources = this.updateImageSources.bind(this);
    
  }

  updateImageSources(queryString) {

    this.miContent.forEach((img, i) => {
      let src = img.attr("src");
      img.attr("src", src.split("?")[0] + "?" + queryString);
    });

  }


  findMiContent(doc) {

    let miContent = [];
    const everyImage = $("img", doc);
    everyImage.each(function (i, elem) {
      let img = $(this);
      let src = img.attr("src");
      if (src.indexOf("mi_u=") > -1 || src.indexOf("aejohg.com") > -1) {
        miContent.push(img)
      }
    });
    return miContent;

  }

  collectParams(images) {

    let allParams = {};

    for (let i = 0; i < images.length; i++) {
      let params = this.paramsFromUrl(images[i].attr("src"));
      allParams = Object.assign(allParams, params);
    }

    return allParams;

  }

  paramsFromUrl(url) {

    if (!url) url = "";
    const _searchString = url.split("?")[1] || "";
    const _urlParams = {};
    const search = /([^&=]+)=?([^&]*)/g;

    let match = search.exec(_searchString);
    while (match) {
      _urlParams[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
      match = search.exec(_searchString);
    }
    return _urlParams;

  }
}