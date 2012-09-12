var formula = [];
var compositions = [
  'source-over',
  'source-in',
  'source-out',
  'source-atop',
  'lighter',
  'xor',
  'destination-over',
  'destination-in',
  'destination-out',
  'destination-atop',
  'darker'
];
var icons = {
  'source-over': 'envelope',
  'source-in': 'signin',
  'source-out': 'signout',
  'source-atop': 'envelope-alt',
  'lighter': 'volume-down',
  'darker': 'volume-off',
  'xor': 'random',
  'destination-over': 'copy',
  'destination-in': 'arrow-left',
  'destination-out': 'arrow-right',
  'destination-atop': 'paste'
};

var workspace,
    resultCvs;

function _contextOf(cvs) {
  return cvs.getContext('2d');
}

function addCanvas() {
  var id = formula.length;
  var data = {};

  // initialize
  if (id !== 0) data.op = 'source-over';
  var cvs =  document.createElement('canvas');
  cvs.id = 'elm-'+id;
  data.cvs = cvs;
  formula.push(data);

  // add to DOM
  if (data.op) {
    var opElm = document.createElement('span');
    opElm.className = 'comp-op';
    var iconElm = document.createElement('i');
    iconElm.className = 'icon-'+icons[data.op];
    var textElm = document.createElement('span');
    textElm.innerHTML = data.op;

    opElm.appendChild(iconElm);
    opElm.appendChild(textElm);
    workspace.appendChild(opElm);
  }
  workspace.appendChild(cvs);
}

function deleteLastCanvas() {
}

function compute() {
}

function start() {
  workspace = document.getElementById('workspace');
  resultCvs = document.getElementById('result');

  addCanvas();
  addCanvas();
  compute();
}