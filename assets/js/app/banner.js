function Banner() {
  this.bdiv = document.createElement("div");
  var dclass = document.createAttribute("class");
  dclass.value = "banner";
  this.bdiv.setAttributeNode(dclass);
  document.body.appendChild(this.bdiv);
  this.hideMessage();
}

Banner.prototype.showMessage = function(msg, delay) {
  this.bdiv.style = "";
  this.bdiv.innerText = msg;
  setTimeout(this.hideMessage.bind(this), delay !== undefined ? delay : 2000)
}

Banner.prototype.hideMessage = function() {
  this.bdiv.style = "display:none";
}


var BANNER = new Banner();
