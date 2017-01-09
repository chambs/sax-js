var parser = sax.parser(true);
var log = document.querySelector('#log');
var tagname;
var start = 0, end = 0;

parser.onerror = function (e) {
  console.error('Error: ', e);
};
parser.ontext = function (t) {
  console.log('text:', t);
  // got some text.  t is the string of text.
};
parser.onopentag = function (node) {
  // opened a tag.  node has "name" and "attributes"
  console.log('opentag:', node.name, node);
  tagname = node.name;
};
parser.onattribute = function (attr) {
  // an attribute.  attr has "name" and "value"
  console.log(tagname + '/attr:', attr);
};
parser.onend = function () {
  // parser stream is done, and ready to have more stuff written to it.
  log.innerHTML = 'end';
  end = Date.now();
  console.log( (end - start) / 1000 );
};

start = Date.now();
parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
