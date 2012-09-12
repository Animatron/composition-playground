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
var examples = [
  function(ctx, t) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, 50, 100, 100);
  }
];

var workspace,
    resultCvs,
    resultCtx;

var __nextFrame = (function() {
   return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback){
            return window.setTimeout(callback, 1000 / 60);
          } })();

function _contextOf(cvs) {
  return cvs.getContext('2d');
}

function addCanvas() {
  var id = formula.length;
  var data = {};

  // initialize
  data.op = (id !== 0) ? 0 : -1;
  data.example = 0;
  var cvs =  document.createElement('canvas');
  cvs.id = 'elm-'+id;
  data.cvs = cvs;
  data.ctx = _contextOf(cvs);
  formula.push(data);

  // add to DOM: "before" elm
  // TODO

  // add to DOM: "operation" elm
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

    opElm.onclick = /*(function(data, iconElm, textElm) {
        return */function() {
            if (data.op < (compositions.length - 1)) {
               data.op++;
            } else {
               data.op = 0;
            }
            var opName = compositions[data.op];
            iconElm.className = 'icon-'+icons[opName];
            textElm.innerHTML = opName;
        };
    /*})(data, iconElm, textElm)*/;
  }
  workspace.appendChild(cvs);

  // add to DOM: "after" elm
  // TODO
}

function deleteLastCanvas() {
}

function compute() {
  resultCtx.clearRect(0, 0, resultCvs.width, resultCvs.width);

  for (var i = 0, fl = formula.length; i < fl; i++) {
    var data = formula[i];
    examples[data.example](data.ctx);
    resultCtx.drawImage(data.cvs, 0, 0);
  }

  __nextFrame(compute);
}

function start() {
  workspace = document.getElementById('workspace');
  resultCvs = document.getElementById('result');
  resultCtx = _contextOf(resultCvs);

  addCanvas();
  addCanvas();
  __nextFrame(compute);
}