class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixelWidth = 10;
    this.pixelHeight = 10;

    // Internal grid structure, a 2D matrix
    this.grid = [];
    this._createGrid();
  }

  draw() {
    this._gridEach((x, y) => this.grid[y][x].draw());
  }

  onMouseClicked(mX, mY) {
    let didMove = false;
    this._gridEach((x, y) => {
      if (this.grid[y][x].isPointInCircle(mX, mY)) {
        this._getNeighbors(x, y).forEach((arrow) => arrow.rotateAnimated());
        didMove = true;
      }
    });
    return didMove;
  }

  checkIsCompleted() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x].value !== 0) return false;
      }
    }

    return true;
  }

  checkIsAnimating() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x].isRotating) return true;
      }
    }

    return false;
  }

  scramble() {
    let numScambles = 0;
    for (let i = 0; i < 17; i++) {
      const x = floor(random(this.width));
      const y = floor(random(this.height));
      const n = floor(random(1, 4));
      for (let j = 0; j < n; j++) {
        this._getNeighbors(x, y).forEach((arrow) => arrow.updateValue());
        numScambles++;
      }
    }
    console.log("Scrambled in " + numScambles + " moves");
  }

  _getNeighbors(x, y) {
    const result = [];

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        let maybeArrow = this._getArrowSafe(j, i);
        if (maybeArrow) result.push(maybeArrow);
      }
    }

    return result;
  }

  _createGrid() {
    const createArrow = (x, y) => new Arrow(x * CIRCLE_DIAMETER, y * CIRCLE_DIAMETER, 0);
    this._gridEach(
      (x, y) => (this.grid[y][x] = createArrow(x, y)),
      (y) => (this.grid[y] = [])
    );
  }

  _getArrowSafe(x, y) {
    if (this.grid[y] && this.grid[y][x]) return this.grid[y][x];
    return null;
  }

  _gridEach(funcXY, funcY) {
    for (let y = 0; y < this.height; y++) {
      if (funcY) {
        funcY(y);
      }
      for (let x = 0; x < this.width; x++) {
        funcXY(x, y);
      }
    }
  }
}
