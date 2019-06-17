//  Sample refactored by David Rousset - Microsoft France - http://blogs.msdn.com/davrous 
//  Using Hand.js to support all platforms

//  Based on https://github.com/sebleedelisle/JSTouchController/blob/master/Touches.html 

//  Copyright (c)2010-2011, Seb Lee-Delisle, sebleedelisle.com. All rights reserved.

//  Redistribution and use in source and binary forms, with or without modification, are permitted provided 
//  that the following conditions are met:

//    * Redistributions of source code must retain the above copyright notice, 
//      this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright notice, 
//      this list of conditions and the following disclaimer in the documentation 
//      and/or other materials provided with the distribution.

//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
//  AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR 
//  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
//  OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY 
//  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas,
    c, // c is the canvas' context 2D
    container,
    halfWidth,
    halfHeight,
    leftPointerID = -1,
    leftPointerPos = new Vector2(0, 0),
    leftPointerStartPos = new Vector2(0, 0),
    leftVector = new Vector2(0, 0);

var touches; // collections of pointers
var timer = 0;

document.addEventListener("DOMContentLoaded", init);

window.onorientationchange = resetCanvas;
window.onresize = resetCanvas;

function init() {
    setupCanvas();
    touches = new Collection();
    
    canvas.addEventListener('pointerdown', onPointerDown, false);
    canvas.addEventListener('pointermove', onPointerMove, false);
    canvas.addEventListener('pointerup', onPointerUp, false);
    canvas.addEventListener('pointerout', onPointerUp, false);
    requestAnimFrame(draw);
}

function resetCanvas(e) {
    // resize the canvas - but remember - this clears the canvas too. 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    halfWidth = canvas.width / 2;
    halfHeight = canvas.height / 2;

    //make sure we scroll to the top left. 
    window.scrollTo(0, 0);
}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (timer > 300) {
        timer = 0;
        ws.send("H" + player);
    }
    timer++;

    touches.forEach(function (touch) {
        if (touch.identifier === leftPointerID) {
            c.beginPath();
            c.strokeStyle = "#867ADE";
            c.lineWidth = 6;
            c.arc(leftPointerStartPos.x, leftPointerStartPos.y, 40, 0, Math.PI * 2, true);
            c.stroke();
            c.beginPath();
            c.strokeStyle = "#867ADE";
            c.lineWidth = 2;
            c.arc(leftPointerStartPos.x, leftPointerStartPos.y, 60, 0, Math.PI * 2, true);
            c.stroke();
            c.beginPath();
            c.strokeStyle = "#867ADE";
            c.arc(leftPointerPos.x, leftPointerPos.y, 40, 0, Math.PI * 2, true);
            c.stroke();
        }
        else {
            c.beginPath();
            c.strokeStyle = "#924A40";
            c.lineWidth = "6";
            c.arc(touch.x, touch.y, 40, 0, Math.PI * 2, true);
            c.stroke();
        }
    });
    requestAnimFrame(draw);
}

function shoot() {
    ws.send("S" + player);
}

function move() {
    var threshold = 1;
    if (leftVector.x < -threshold) {
        ws.send("L" + player);
    }
    if (leftVector.x > threshold) {
        ws.send("R" + player);
    }
    if (leftVector.y < -threshold) {
        ws.send("U" + player);
    }
    if (leftVector.y > threshold) {
        ws.send("D" + player);
    }
}

function givePointerType(event) {
    switch (event.pointerType) {
        case event.POINTER_TYPE_MOUSE:
            return "MOUSE";
        case event.POINTER_TYPE_PEN:
            return "PEN";
        case event.POINTER_TYPE_TOUCH:
            return "TOUCH";
    }
}

function onPointerDown(e) {
    var newPointer = { identifier: e.pointerId, x: e.clientX, y: e.clientY, type: givePointerType(e) };
    if ((leftPointerID < 0) && (e.clientX < halfWidth)) {
        leftPointerID = e.pointerId;
        leftPointerStartPos.reset(e.clientX, e.clientY);
        leftPointerPos.copyFrom(leftPointerStartPos);
        leftVector.reset(0, 0);
    }
    else {
        shoot();
    }
    touches.add(e.pointerId, newPointer);
}

function onPointerMove(e) {
    if (leftPointerID === e.pointerId) {
        leftPointerPos.reset(e.clientX, e.clientY);
        leftVector.copyFrom(leftPointerPos);
        leftVector.minusEq(leftPointerStartPos);
    }
    else {
        if (touches.item(e.pointerId)) {
            touches.item(e.pointerId).x = e.clientX;
            touches.item(e.pointerId).y = e.clientY;
        }
    }
    move();
}

function onPointerUp(e) {
    if (leftPointerID === e.pointerId) {
        leftPointerID = -1;
        leftVector.reset(0, 0);
    }
    leftVector.reset(0, 0);
    touches.remove(e.pointerId);
}

function setupCanvas() {
    canvas = document.getElementById('canvasJoystick');
    c = canvas.getContext('2d');
    resetCanvas();
    c.strokeStyle = "#ffffff";
    c.lineWidth = 2;
}