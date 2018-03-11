import $ from "jquery";
import getParams from "./params";

export default class WebviewTest{
  constructor(raw){
    this.raw = raw;
    this.doc = $(raw);
    this.miContent = this.findMiContent(this.doc);
    this.allParams = this.reduceParams(this.miContent);
    this.updateImageSources = this.updateImageSources.bind(this);
  }

  updateImageSources(event){
    event.preventDefault();
    let qs = $("#params_adjuster").serialize();
    this.miContent.forEach((img,i)=>{
      let src = img.attr("src");
      img.attr("src",src.split("?")[0] + "?" + qs);
    });
  }

  findMiContent(doc){
    let miContent = [];
    const everyImage = $("img",doc);
    everyImage.each(function(i,elem){
      let img = $(this);
      let src = img.attr("src");
      let params = getParams(src);
      img.data({params});
      if(params.hasOwnProperty("mi_u") || src.indexOf("aejohg.com") > -1){
        miContent.push(img)
      }
    });
    return miContent;
  }

  reduceParams(images){
    let allParams = {};

    for(let i = 0; i< images.length; i++){
      let params = images[i].data("params");
      allParams = Object.assign(allParams,params);
    }

    return allParams;
  }
  //
  // makeInputs(params){
  //   let paramInputs = {};
  //   for(let p in params){
  //     this.appendInput(p,params[p]);
  //     paramInputs[p] = $(`#param-input-${p}`);
  //     paramInputs[p].val(params[p]);
  //   }
  //   this.paramInputs = paramInputs;
  // }
  //
  // appendInput(param,value){
  //   $("#params_adjuster").prepend(`<div><label for="${param}">${param}</label><input type="text" name=${param} id="param-input-${param}" value=${value}/></div>`);
  // }
}
