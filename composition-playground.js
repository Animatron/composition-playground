var formula = [];
var compositions = [
  'source-over',
  'source-in',
  'source-out',
  'source-atop',
  'lighter',
  'darker',
  'xor',
  'destination-over',
  'destination-in',
  'destination-out',
  'destination-atop',
];
var icons = {
  'source-over': 'envelope',
  'source-in': 'signin',
  'source-out': 'signout',
  'source-atop': 'envelope-alt',
  'lighter': 'star-empty',
  'darker': 'star',
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
  data.op = (id !== 0) ? 0 : -1;
  var cvs =  document.createElement('canvas');
  cvs.id = 'elm-'+id;
  data.cvs = cvs;
  formula.push(data);

  // add to DOM
  if (data.op >= 0) {
    var opName = compositions[data.op];

    var opElm = document.createElement('span');
    opElm.className = 'comp-op';
    var iconElm = document.createElement('i');
    iconElm.className = 'icon-'+icons[opName];
    var textElm = document.createElement('span');
    textElm.innerHTML = opName;

    opElm.appendChild(iconElm);
    opElm.appendChild(textElm);
    workspace.appendChild(opElm);

    opElm.onclick = (function(data, iconElm, textElm) {
        return function() {
            if (data.op < (compositions.length - 1)) {
               data.op++;
            } else {
               data.op = 0;
            }
            var opName = compositions[data.op];
            iconElm.className = 'icon-'+icons[opName];
            textElm.innerHTML = opName;
        };
    })(data, iconElm, textElm);
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