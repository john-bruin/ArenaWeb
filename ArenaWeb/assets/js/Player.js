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

    var _playing = false;
    var _isHit = false;
    var _energy = 0;

    this.Init = function () {
        _energy = 100;
        $("#energyPlayer" + id.toString()).html("ENERGY P" + id.toString() + ":" + _energy.toString() + "%");
        _playing = true;
    };

    this.IsHit = function (strength) {
        if (!_playing) {
            return;
        }

        HitCounter = 5;
        _isHit = true;
        _energy = _energy - strength;        
        if (_energy <= 0) {
            _energy = 0;            
            _playing = false;
            GameOver(id);
        }
        $("#energyPlayer" + id.toString()).html("ENERGY P" + id.toString() + ":" + _energy.toString() + "%");
    };

    this.Stop = function () {
        _playing = false;
    }

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