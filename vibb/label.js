class Label extends ComponentBase {
    constructor(x, y, text) {
        super(true, true, false, false);
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = 0;
        this.text = "<click to edit>";
        this.textSize = 20;
        this._setWidthAndHeight();

        this.input = null;
    }

    _setWidthAndHeight() {
        textSize(this.textSize);
        this.w = textWidth(this.text);
        this.h = this.textSize;
    }

    _renderLabel() {
        GetScheme().White.applyFill();
        noStroke();
        textAlign(LEFT, TOP);
        textSize(this.textSize);
        text(this.text, this.x, this.y);
    }

    _updatePosition() {
        const position = BrowserUtils.getDistanceFromScreenEdges(this.x, this.y);
        this.input.position(position.x - 1, position.y - 1);
    }

    _createInput() {
        this.input = createInput(this.text);
        this._updatePosition();
        this.input.size(this.w + 5, this.h * 1.11);
        this.input.style('font-size', this.textSize + 'px');
        this.input.elt.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {
                this.text = this.input.value();
                this.input.remove();
                this.input = null;
                this._setWidthAndHeight();
            }
        });
        this.input.elt.focus();
        this.input.elt.select();
    }

    render() {
        if (this.input) {
            this._updatePosition();
        }

        if (this.mouseIsOver()) {
            GetScheme().White.applyStroke();
            noFill();
            rect(this.x, this.y, this.w, this.h);
        }
        this._renderLabel();
    }

    mouseIsOver() {
        return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    }

    onClick() {
        if (this.input === null) {
            this._createInput();
        }
    }
}