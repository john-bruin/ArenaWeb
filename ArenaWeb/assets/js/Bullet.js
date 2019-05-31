function Bullet(id) {

    var canvas = document.createElement("canvas");
    canvas.width = contentWidth;
    canvas.height = contentHeight;
    var context = canvas.getContext('2d');

    var image;
    image = new Image();
    //image.src = "assets/images/bullet" + id.toString() + ".png";
    image.src = "assets/images/bullet1.png";

    var _x;
    var _y;
    var _playing = false;

    this.Init = function (x, y) {
        _x = x;
        _y = y;
        _playing = true;
    };

    this.IsPlaying = function () {
        return _playing;
    };
    
    this.Draw = function () {
        var step = 15;
        if (_playing) {
            context.beginPath();
            context.clearRect(0, 0, canvas.width, canvas.height);            
            if (id === 1) {
                if (_x > contentWidth - 55 - 30) {
                    _playing = false;
                }
                else {
                    _x = _x + step;
                }
                context.drawImage(image, _x, _y);
                if (IsPlayer2Hit()) {
                    player2Animation.IsHit(4);
                    _playing = false;
                }
            }
            else if (id === 2) {
                if (_x < 55) {
                    _playing = false;
                }
                else {
                    _x = _x - step;
                }
                context.drawImage(image, _x, _y);
                if (IsPlayer1Hit()) {
                    player1Animation.IsHit(4);
                    _playing = false;
                }
            }            
        }
        return canvas;
    };

    function IsPlayer1Hit() {
        if (_x > p1_x && _x < p1_x + 38 && _y > p1_y && _y < p1_y + 74) {
            return true;
        }
    }

    function IsPlayer2Hit() {
        if (_x > p2_x && _x < p2_x + 38 && _y > p2_y && _y < p2_y + 74) {
            return true;
        }
    }

}