class Arrow {
    constructor(x, y, value) {
        this.value = value;
        this.circleDiameter = CIRCLE_DIAMETER * 0.95;
        this.cX = x + CIRCLE_DIAMETER / 2;
        this.cY = y + CIRCLE_DIAMETER / 2;

        //Animation
        this.isRotating = false;
        this.rotationAngleDelta = TWO_PI / 30;
        this.rotateFromAngle = 0;
        this.rotateToAngle = 0;
    }

    draw() {
        push();
        this._draw();
        pop();
    }

    updateValue() {
        this.value = this.getNextValue();
    }

    getNextValue() {
        return (this.value + 1) % 4;
    }

    rotateAnimated() {
        this.isRotating = true;
        this.rotateAngle = this._getRotationAngle();
    }

    isPointInCircle(x, y) {
        return dist(this.cX, this.cY, x, y) < this.circleDiameter / 2;
    }

    _draw() {
        translate(this.cX, this.cY);

        this._handleRotation();
        this._drawCircle();

        if (NUMBER_MODE)
            this._drawNumber();
        else
            this._drawArrow();
    }

    _handleRotation() {
        if (this.isRotating) {
            if (!NUMBER_MODE) rotate(this.rotateAngle);

            this.rotateAngle += this.rotationAngleDelta;
            fill(this._getInAnimationColor());

            if (this.rotateAngle >= this._getRotationAngle() + PI / 2) {
                this.isRotating = false;
                this.updateValue();
            }
        }
        else {
            if (!NUMBER_MODE) rotate(this._getRotationAngle());
            fill(this._getCircleColor());
        }
    }

    _getInAnimationColor() {
        const colorFrom = COLOR_SCHEME[this.value];
        const colorTo = COLOR_SCHEME[this.getNextValue()];
        return map(this.rotateAngle, this._getRotationAngle(), this._getRotationAngle() + PI / 2, colorFrom, colorTo);
    }

    _drawArrow() {
        const yOffset = this.circleDiameter * 0.15;
        const xOffset = yOffset * 2.2;
        const yOffsetFix = yOffset * 0.25;

        strokeWeight(7);
        stroke(255);
        line(0, -yOffset - yOffsetFix, xOffset, yOffset - yOffsetFix);
        line(0, -yOffset - yOffsetFix, -xOffset, yOffset - yOffsetFix);
    }

    _drawCircle() {
        stroke(50);
        strokeWeight(2);
        circle(0, 0, this.circleDiameter);
    }

    _drawNumber() {
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(this.circleDiameter / 2.5);
        text(this.value, 0, 0);
    }

    _getRotationAngle() {
        return PI / 2 * this.value;
    }

    _getCircleColor() {
        return COLOR_SCHEME[this.value];
    }
}