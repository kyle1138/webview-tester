import $ from "jquery";
import "../css/style.scss";
import WebviewTest from "./webview-test";

window.$ = $;

$("#get_source").submit(function(event){
  event.preventDefault();
  getWebview($("#source_url").val());
});

$("#add_custom_param").submit(function(event){
    
  
  
  
        event.preventDefault();
  let input = inputTemplate($("#custom_param_name").val(),"");
  $("#params_adjuster .text_inputs").append(input);
    $(".param_input_container").fadeIn();
});

function getWebview(url) {

  const xhr = new XMLHttpRequest();
  xhr.open("GET", proxyUrl(url), true);
  xhr.onload = event => {
    handleWebview(xhr.responseText);
  };
  xhr.send();

}

function handleWebview(responseText){

  $("#webview_container").empty();
  $("#params_adjuster .param_input_container").remove();
  const webviewTest = new WebviewTest(responseText);
  $("#webview_container").append(webviewTest.doc);

  $("#params_adjuster").show();
  $("#add_custom_param").show();
  $(".form_container").show();
  
  for(let param in webviewTest.allParams){
    let input = inputTemplate(param,webviewTest.allParams[param]);
    $("#params_adjuster .text_inputs").append(input);
    $(".param_input_container").fadeIn();
  }

  $("#params_adjuster").submit(function(event){
    event.preventDefault();
    const queryString = $(this).serialize();
    webviewTest.updateImageSources(queryString);
  });
}

function proxyUrl(url) {

  const a = document.createElement('a');
  a.href = url;

  return [
    "https://cors-anywhere.herokuapp.com/",
    // "https://cors.movableink.com/",
    a.hostname,
    a.pathname,
    a.search,
    a.hash
  ].join("");

}

function inputTemplate(param,value){

  const inputContainer = $(`<div class="param_input_container"><span class="input_label" for="${param}">${param}</span><input type="text" name=${param} value="${value}"/><div class="kill"></div></div>`);
  $(".kill",inputContainer).click(function(x){
    inputContainer.remove();
  });
  return inputContainer;

}
