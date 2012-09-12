var period = 2;

var formula = [];
var compositions = [
  'source-over',
  'source-atop',
  'source-in',
  'source-out',
  'lighter',
  'darker',
  'xor',
  'destination-over',
  'destination-atop',
  'destination-in',
  'destination-out'
];
var icons = {
  'source-over': 'envelope',
  'source-atop': 'envelope-alt',
  'source-in': 'signin',
  'source-out': 'signout',
  'lighter': 'star-empty',
  'darker': 'star',
  'xor': 'random',
  'destination-over': 'remove-circle',
  'destination-atop': 'remove-sign',
  'destination-in': 'arrow-left',
  'destination-out': 'arrow-right'
};
var examples = [
  function(ctx, t) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(50, 50, 100, 100);
  },
  function(ctx, t) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(100, 100, 100, 100);
  },
  function(ctx, t) {
    ctx.fillStyle = '#00f';
    ctx.fillRect(t/period*250, 0, 50, 200);
  }
];

var workspace,
    resultCvs,
    resultCtx;

var __lock = false;

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
  __lock = true;

  var id = formula.length;
  var data = {};

  // initialize
  data.op = (id !== 0) ? 0 : -1;
  data.example = (id < examples.length) ? id : 0;
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
    opElm.className = 'operation';
    var iconElm = document.createElement('i');
    iconElm.className = 'icon-'+icons[opName];
    var textElm = document.createElement('span');
    textElm.innerHTML = opName;

    opElm.appendChild(iconElm);
    opElm.appendChild(textElm);
    workspace.appendChild(opElm);

    opElm.onclick = /*(function(data, iconElm, textElm) {
        return */function() {
            __lock = true;
            if (data.op < (compositions.length - 1)) {
               data.op++;
            } else {
               data.op = 0;
            }
            var opName = compositions[data.op];
            iconElm.className = 'icon-'+icons[opName];
            textElm.innerHTML = opName;
            __lock = false;
        };
    /*})(data, iconElm, textElm);*/

    data.opElm = opElm;
  };
  workspace.appendChild(cvs);

  cvs.onclick = /*(function(data) {
      return */function() {
          __lock = true;
          data.ctx.clearRect(0, 0,
               data.cvs.width, data.cvs.height);
          if (data.example < (examples.length - 1)) {
              data.example++;
          } else {
              data.example = 0;
          }
          __lock = false;
      /*})(data, iconElm, textElm)*/;
  };

  // add to DOM: "after" elm
  // TODO

  __lock = false;
}

function deleteCanvas() {
  __lock = true;
  var data = formula.pop();
  if (data.opElm) workspace.removeChild(data.opElm);
  workspace.removeChild(data.cvs);
  __lock = false;
}

var startT = -1,
    t = -1;

function compute() {
  if (!__lock) {

    if (t > period) startT = -1;
    if (startT === -1) startT = new Date();
    t = ((new Date()) - startT) / 1000;

    resultCtx.clearRect(0, 0, resultCvs.width, resultCvs.width);

    for (var i = 0, fl = formula.length; i < fl; i++) {
      var data = formula[i];
      data.ctx.clearRect(0, 0, data.cvs.width, data.cvs.height);
      examples[data.example](data.ctx, t);
      resultCtx.globalCompositeOperation = compositions[data.op];
      resultCtx.drawImage(data.cvs, 0, 0);
    }

  }

  __nextFrame(compute);
}

function start() {
  workspace = document.getElementById('workspace');
  resultCvs = document.getElementById('result');
  resultCtx = _contextOf(resultCvs);

  addCanvas();
  addCanvas();

  document.getElementById('add-canvas').onclick = addCanvas;
  document.getElementById('delete-canvas').onclick = deleteCanvas;

  __nextFrame(compute);
}