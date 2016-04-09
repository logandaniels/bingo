// Tesseract.recognize(img, function(err, res) {
//     console.log("Tesseract");
//     console.log(res["text"]);
// });

function handleFiles(files) {
    var file = files[0];
    var imageType = /^image\//;
    if (!imageType.test(file.type)) {
      return;
    }

    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;

    var imgcontainer = document.getElementById("div-img");
    imgcontainer.innerHTML = "";
    imgcontainer.appendChild(img);

    var reader = new FileReader();
    reader.onload = (function(aImg) {
        return function(e) {
            aImg.src = e.target.result; 
            aImg.setAttribute("id", "upload");
            $('#upload').cropper({
              crop: function(e) {
                // Output the result data for cropping image.
                // console.log("MEEP");
                // console.log(e.x);
                // console.log(e.y);
                // console.log(e.width);
                // console.log(e.height);
                // console.log(e.rotate);
                // console.log(e.scaleX);
                // console.log(e.scaleY);
              }});
        };
    })(img);
    reader.readAsDataURL(file);
}

var B = [];
var I = [];
var N = [];
var G = [];
var O = [];


var marks = [[false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, true, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ];


function processBoardImage(img) {
    var string = OCRAD(img);
    console.log("OCRAD");
    console.log(string);    

    // Remove everything that's not a digit or a newline, then split by newlines
    string = string.replace(/[^\d\n]+/g, "").replace(/ /g, "");
    var lines = string.split("\n");
    console.log(lines);

    B = [];
    I = [];
    N = [];
    G = [];
    O = [];

    for (var i = 0; i < 5; i++) {
        var s = lines[i];
        if (i == 2) {
            // Special third row with free space
            if (s.length == 8) {
                // Double-digit B column
                B.push(s.slice(0,2));
                I.push(s.slice(2,4));
                G.push(s.slice(4,6));
                O.push(s.slice(6,8));
            } else {
                // Single-digit B column
                B.push(s.slice(0,1));
                I.push(s.slice(1,3));
                G.push(s.slice(3,5));
                O.push(s.slice(5,7));
            }
        } else {
            if (s.length == 10) {
                // Double-digit B column
                B.push(s.slice(0,2));
                I.push(s.slice(2,4));
                N.push(s.slice(4,6));
                G.push(s.slice(6,8));
                O.push(s.slice(8,10));
            } else {
                // Single-digit B column
                B.push(s.slice(0,1));
                I.push(s.slice(1,3));
                N.push(s.slice(3,5));
                G.push(s.slice(5,7));
                O.push(s.slice(7,9));
            }
        }
    }
    console.log(B);
    console.log(I);
    console.log(N);
    console.log(G);
    console.log(O);

    updateBoard();

    window.setTimeout(function() {
        $("#bingo").addClass("processed");
    }, 500);
}

function updateBoard() {
    marks = [[false, false, false, false, false],
                    [false, false, false, false, false],
                    [false, false, true, false, false],
                    [false, false, false, false, false],
                    [false, false, false, false, false]
                ];
    var rows = $("#board tr");
    for (var i = 0; i < B.length; i++) {
        var tr = rows[i+1];
        var td = tr.children[0];
        td.innerHTML = B[i];
    };
    for (var i = 0; i < I.length; i++) {
        var tr = rows[i+1];
        var td = tr.children[1];
        td.innerHTML = I[i];
    };
    for (var i = 0; i < N.length; i++) {
        var tr = rows[i+1 + (i > 1 ? 1 : 0)];
        var td = tr.children[2];
        td.innerHTML = N[i];
    };
    rows[3].children[2].innerHTML = "★";
    for (var i = 0; i < G.length; i++) {
        var tr = rows[i+1];
        var td = tr.children[3];
        td.innerHTML = G[i];
    };
    for (var i = 0; i < O.length; i++) {
        var tr = rows[i+1];
        var td = tr.children[4];
        td.innerHTML = O[i];
    };
}


function handleB(num) {
    console.log("B" + num);
    var i = B.indexOf(num);
    if (i == -1) {
        return;
    }
    console.log("That's a mark!");
    B.splice(i,1);
    var rows = $("#board tr");
    $(rows[i+1].children[0]).addClass("marked");
    marks[i,0] = true;
}
function handleI(num) {
    console.log("I" + num);
    var i = I.indexOf(num);
    if (i == -1) {
        return;
    }
    console.log("That's a mark!");
    I.splice(i,1);
    var rows = $("#board tr");
    $(rows[i+1].children[1]).addClass("marked");
    marks[i,1] = true;
}
function handleN(num) {
    console.log("N" + num);
    var i = N.indexOf(num);
    if (i == -1) {
        return;
    }
    console.log("That's a mark!");
    N.splice(i,1);
    var rows = $("#board tr");
    $(rows[i + 1 + (i > 1 ? 1 : 0)].children[2]).addClass("marked");
    marks[i + (i > 1 ? 1 : 0),2] = true;
}
function handleG(num) {
    console.log("G" + num);
    var i = G.indexOf(num);
    if (i == -1) {
        return;
    }
    console.log("That's a mark!");
    G.splice(i,1);
    var rows = $("#board tr");
    $(rows[i+1].children[3]).addClass("marked");
    marks[i,3] = true;
}
function handleO(num) {
    console.log("O" + num);
    var i = O.indexOf(num);
    if (i == -1) {
        return;
    }
    console.log("That's a mark!");
    O.splice(i,1);
    var rows = $("#board tr");
    $(rows[i+1].children[4]).addClass("marked");
    marks[i,4] = true;
}


if (annyang) {
    annyang.debug();

  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'Be *num': handleB,
    'B *num': handleB,
    'B*num': handleB,
    'B-*num': handleB,
    'Eye *num': handleI,
    'I *num': handleI,
    'I*num': handleI,
    'I-*num': handleI,
    'En *num': handleN,
    'n *num': handleN,
    'n*num': handleN,
    'n-*num': handleN,
    'Gee *num': handleG,
    'G *num': handleG,
    'G*num': handleG,
    'G-*num': handleG,
    'Oh *num': handleO,
    'O *num': handleO,
    'O*num': handleO,
    'O-*num': handleO,
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  // annyang.start();

  // Tell KITT to use annyang
  SpeechKITT.annyang();

  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();
}

function acceptCrop() {
    console.log("Accepting crop");

    var canvas = $("#upload").cropper('getCroppedCanvas');
    var dataURL = canvas.toDataURL();
    var croppedImg = document.createElement("img");
    croppedImg.src = dataURL;
    croppedImg.classList.add("transitions");
    croppedImg.setAttribute("id", "bingo");

    var cropContainer = document.getElementById("cropped-image");
    cropContainer.innerHTML = "";
    cropContainer.appendChild(croppedImg);

    processBoardImage(croppedImg);
}

// var img = document.getElementById("bingo");
// processBoardImage(img);


$('#upload').cropper({
  upload: function(e) {
    // Output the result data for cropping image.
    // console.log("MEEP");
    // console.log(e.x);
    // console.log(e.y);
    // console.log(e.width);
    // console.log(e.height);
    // console.log(e.rotate);
    // console.log(e.scaleX);
    // console.log(e.scaleY);
  }
});
