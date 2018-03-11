import $ from "jquery";
import "../css/style.css";
import "../css/style2.scss";
import params from "./params";
import WebviewTest from "./webview-test";

$("#get_source").submit(function(event){
  event.preventDefault();
  getWebview($("#source_url").val());
});

function getWebview(url) {

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://cors.movableink.com/${url}`, true);
  xhr.onload = event => {

    window.webviewTest = new WebviewTest(xhr.responseText);
    $("#webview_container").append(webviewTest.doc);
    for(let param in webviewTest.allParams){
      $("#params_adjuster").prepend(`<div><label for="${param}">${param}</label><input type="text" name=${param} id="param-input-${param}" value=${webviewTest.allParams[param]}/></div>`);
    }
    $("#params_adjuster").submit(webviewTest.updateImageSources);

  };

  xhr.send();

}
