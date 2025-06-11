let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Assign initial z-index based on HTML order
    paper.style.zIndex = highestZ++;
    
    const updateTransform = () => {
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    };

    // Touch events
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;

      paper.style.zIndex = highestZ++;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.rotating) {
        this.moveX = e.touches[0].clientX;
        this.moveY = e.touches[0].clientY;

        this.velX = this.moveX - this.prevX;
        this.velY = this.moveY - this.prevY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevX = this.moveX;
        this.prevY = this.moveY;
        updateTransform();
      }
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Mouse events
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      this.startX = e.clientX;
      this.startY = e.clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;

      paper.style.zIndex = highestZ++;

      if (e.button === 2) this.rotating = true;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.rotating) {
        this.moveX = e.clientX;
        this.moveY = e.clientY;

        this.velX = this.moveX - this.prevX;
        this.velY = this.moveY - this.prevY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevX = this.moveX;
        this.prevY = this.moveY;
        updateTransform();
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Optional gesture support (for browsers that support it)
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });

    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper, index) => {
const img = paper.querySelector('img');
if (img) {
  const match = img.src.match(/(\d+)\.(jpg|png)/);
  if (match) {
    paper.style.zIndex = parseInt(match[1]); // e.g. 1.jpg => zIndex = 1
  }
}
  const p = new Paper();
  p.init(paper);
});
