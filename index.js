var self = require('sdk/self');

var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
  label: "Generuj kód pro furry.cz",
  image: 'http://www.furry.cz/furrycz.ico',
  context: contextMenu.SelectorContext("img"),
  contentScript: 'self.on("click", function (node) {' +
                 '  self.postMessage(node.clientWidth +"|"+ node.clientHeight+"|"+node.src+"|"+node.ownerDocument.location);' +
                 '});',
  onMessage: function (args) { 
	
	var maxW = 600;
	var maxH = 500;
	     	
	var s = args.split("|");

	var src = (s[2]);
	var pg  = (s[3]);
	var w   = parseFloat(s[0]);
	var h   = parseFloat(s[1]);

	//console.log(src + '  ' + w + 'x' + h + ' -- ' + pg);
	
	var sizeLim = "";
	
	if((maxW/w) > (maxH/h))
	{
		if(maxW<w)
		{
			sizeLim=" width="+maxW;
		} 
	}
	else
	{
		if(maxH<h)
		{
			sizeLim=" height="+maxH;
		}
	}
	
	var code = '<a href='+pg+'><img src='+src+sizeLim+'><br>'+pg+'</a>'
	
	var clipboard = require("sdk/clipboard");
	clipboard.set(code, "text");
  }
});

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
