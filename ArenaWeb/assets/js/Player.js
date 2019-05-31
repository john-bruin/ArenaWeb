function Player(id) {

    var canvas = document.createElement("canvas");
    canvas.width = contentWidth;
    canvas.height = contentHeight;
    var context = canvas.getContext('2d');

    var image = new Image();
    image.src = "assets/images/player" + id.toString() + ".png";

    var imageHit = new Image();
    imageHit.src = "assets/images/player" + id.toString() + "Hit.png";

    var x;
    var y;
    var float = 2;
    var float_add = -.25;

    var _playing = true;
    var _isHit = false;
    var _energy;

    this.Init = function () {
        _energy = 100;
        $("#energyPlayer" + id.toString()).html(_energy.toString());
    };

    this.IsHit = function (strength) {
        HitCounter = 5;
        _isHit = true;
        _energy = _energy - strength;
        $("#energyPlayer" + id.toString()).html(_energy.toString());
        if (_energy <= 0) {
            $("#energyPlayer" + id.toString()).html(0);
            $("#message").html("PLAYER " + id.toString() + " DIED!");
            _playing = false;
        }
    };

    this.IsPlaying = function () {
        return _playing;
    };
    
    this.Draw = function (x, y) {
        if (_playing) {
            context.beginPath();
            context.clearRect(0, 0, canvas.width, canvas.height);

            if (_isHit) {
                context.drawImage(imageHit, x, y + float);
                HitCounter--;
                if (HitCounter < 0) {
                    _isHit = false;
                }
            }
            else {
                context.drawImage(image, x, y + float);
            }

            if (float < 0) {
                float_add = .25;
                float = 0;
            }
            else if (float > 2) {
                float = 2;
                float_add = -.25;
            }
            else {
                float = float + float_add;
            }
        }
        return canvas;
    };
}