var period = 2,
    width = 200,
    height = 150;

var formula = [];
var compositions = [
  'source-over',
  'source-atop',
  'source-in',
  'source-out',
  'lighter',
  'darker',
  'xor',
  /*'copy',*/
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
  /*'copy': 'copy',*/
  'destination-over': 'remove-circle',
  'destination-atop': 'remove-sign',
  'destination-in': 'arrow-left',
  'destination-out': 'arrow-right'
};
var default_op = 0; /* source-over */

var __image;
var examples = [
  function(ctx, t) {
    ctx.fillStyle = '#00f';
    ctx.fillRect(50, 50, 60, 60);
  },
  function(ctx, t) {
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.arc(110, 110, 30, 0, 2 * Math.PI, false);
    ctx.fill();
    //ctx.fillStyle = '#f00';
    //ctx.fillRect(75, 100, 75, 100);
  },
  function(ctx, t) {
    ctx.fillStyle = '#090';
    ctx.fillRect(t/period*width, 0, 50, 200);
  },
  function(ctx, t) {
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.arc(20, t/period*height, 30, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#0f0';
    ctx.arc(70, height-(t/period*height), 10, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#00f';
    ctx.arc(140, t/period*height, 20, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#ff0';
    ctx.arc(175, height-(t/period*height), 40, 0, 2 * Math.PI, false);
    ctx.fill();
  },
  function(ctx, t) {
    // image from: http://www.techrepublic.com/blog/geekend/build-a-real-bender-robot-that-brews-beer-talks/1022
    if (!__image) {
      __image = new Image();

      __image.onload = function() {
        ctx.drawImage(__image, 0, 0);
      };
      __image.src = "./bender_done.jpg";
    }
    ctx.drawImage(__image, 0, 0, width, height);
  },
  function(ctx, t) {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.arc(t/(period/2)*width, 80, 50, 0, 2 * Math.PI, false);
    ctx.fill();
  },
  function(ctx, t) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.arc(t/(period/2)*width, 80, 50, 0, 2 * Math.PI, false);
    ctx.fill();
  },
  function(ctx, t) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,width,height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.arc(t/(period/2)*width, 80, 50, 0, 2 * Math.PI, false);
    ctx.fill();
  },
  function(ctx, t) {
    // from: http://www.html5canvastutorials.com/advanced/html5-canvas-clipping-region-tutorial/

    var x = width / 2;
    var y = height / 2;
    var radius = 70;
    var offset = 45;

    /*
     * save() allows us to save the canvas context before
     * defining the clipping region so that we can return
     * to the default state later on
     */
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.clip();

    // draw blue circle inside clipping region
    ctx.beginPath();
    ctx.arc(x - offset, y - offset, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "blue";
    ctx.fill();

    // draw yellow circle inside clipping region
    ctx.beginPath();
    ctx.arc(x + offset, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // draw red circle inside clipping region
    ctx.beginPath();
    ctx.arc(x, y + offset, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();

    /*
     * restore() restores the canvas context to its original state
     * before we defined the clipping region
     */
    ctx.restore();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle= "black";
    ctx.stroke();
  },
  function(ctx, t) {
    ctx.beginPath();
    ctx.arc(100, 75, 70, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle= "black";
    ctx.stroke();
  },
  function(ctx, t) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(100, 75, 70, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle= "#fff";
    ctx.stroke();
  },
  function(ctx, t) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(100, 75, 70, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.fillStyle= "#fff";
    ctx.fill();
  },
  function(ctx, t) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(100, 75, 70, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.fillStyle= "#000";
    ctx.fill();
  },
  function(ctx, t) {
    ctx.fillStyle = 'rgba(1,1,1,0)';
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(100, 75, 70, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(1,1,1,.5)';
    ctx.fill();
  },
  function(ctx, t) {
    ctx.fillStyle = 'rgba(1,1,1,.3)';
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(100, 75, 70, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(1,1,1,.6)';
    ctx.fill();
  },
  function(ctx, t) {
    var grad = ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(t/period, '#fff');
    grad.addColorStop(1, '#000');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);
  },
  function(ctx, t) {
    var grad = ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(0, '#000');
    grad.addColorStop(1-(t/period), 'rgba(0,0,0,0)');
    grad.addColorStop(1, '#000');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,width,height);
    ctx.font = '8pt sans-serif';
    ctx.fillStyle = '000';
    ctx.fillText("White is transparent!", 10, 20);
  },
  function(ctx, t) {
    // from: https://developer.mozilla.org/en-US/docs/Canvas_tutorial/Compositing

    var w = width, h = height,
        wh = w/2, hh = h/2;

    function drawStar(ctx,r){
      ctx.save();
      ctx.beginPath()
      ctx.moveTo(r,0);
      for (var i=0;i<9;i++){
        ctx.rotate(Math.PI/5);
        if(i%2 == 0) {
          ctx.lineTo((r/0.525731)*0.200811,0);
        } else {
          ctx.lineTo(r,0);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.fillRect(0,0,w,h);
    ctx.translate(wh,hh);

    // Create a circular clipping path
    ctx.beginPath();
    ctx.arc(0,0,65,0,Math.PI*2,true);
    ctx.clip();

    // draw background
    var lingrad = ctx.createLinearGradient(0,-wh,0,hh);
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#143778');

    ctx.fillStyle = lingrad;
    ctx.fillRect(-wh,-hh,w,h);

    // draw stars
    for (var j=1;j<50;j++){
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.translate(wh-Math.floor(Math.random()*w),
                    hh-Math.floor(Math.random()*h));
      drawStar(ctx,Math.floor(Math.random()*4)+2);
      ctx.restore();
    }
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
  data.op = (id !== 0) ? default_op : -1;
  data.example = (id < examples.length) ? id : 0;
  var cvs =  document.createElement('canvas');
  cvs.width = width;
  cvs.height = height;
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
               /*data.cvs.*/width, /*data.cvs.*/height);
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

    resultCtx.save();

    resultCtx.clearRect(0, 0, /*resultCvs.*/width, /*resultCvs.*/height);

    resultCtx.globalCompositeOperation = compositions[default_op];

    for (var i = 0, fl = formula.length; i < fl; i++) {
      var data = formula[i],
          exampleCvs = data.cvs,
          exampleCtx = data.ctx;
      exampleCtx.save();
      exampleCtx.clearRect(0, 0, /*data.cvs.*/width, /*data.cvs.*/height);
      examples[data.example](exampleCtx, Math.min(period, t));
      exampleCtx.restore();
      if (data.op >= 0) {
        resultCtx.globalCompositeOperation = compositions[data.op];
      }
      resultCtx.drawImage(exampleCvs, 0, 0);
    }

    resultCtx.restore();

  }

  __nextFrame(compute);
}

function start() {
  workspace = document.getElementById('workspace');
  resultCvs = document.getElementById('result');
  resultCtx = _contextOf(resultCvs);

  resultCvs.width = width;
  resultCvs.height = height;

  addCanvas();
  addCanvas();

  document.getElementById('add-canvas').onclick = addCanvas;
  document.getElementById('delete-canvas').onclick = deleteCanvas;

  __nextFrame(compute);
}