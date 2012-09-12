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
  'source-over': '',
  'source-in': '',
  'source-out': '',
  'source-atop': '',
  'lighter': '',
  'xor': '',
  'destination-over': '',
  'destination-in': '',
  'destination-out': '',
  'destination-atop': '',
  'darker': ''
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
    opElm.innerHTML = data.op;
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