import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001; // deltaTime 프레임//0.001 = 1초 (1000/60 = 16.77)
    console.log('delta', deltaTime);

    // 0
    // 0 += 16.77 * 0.001 = 0.01677
    // 0.016 += 0.016
    // 0.032 += 0.016
    // 0.048 += 0.016
    // .....
    // 99.99 += 0.016
    // 100.015 += 0.016 this.stageChange = true
    // 100.031 += 0.016

    if (Math.floor(this.score) === 100 && this.stageChange) {
      this.stageChange = false;
      // this.stageChange = false
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
    }

    if (Math.floor(this.score) === 200 && this.stageChange) {
      this.stageChange = false;
      // this.stageChange = false
      sendEvent(11, { currentStage: 1001, targetStage: 1002 });
    }
    if (Math.floor(this.score) === 300 && this.stageChange) {
      this.stageChange = false;
      // this.stageChange = false
      sendEvent(11, { currentStage: 1002, targetStage: 1003 });
    }
    if (Math.floor(this.score) === 400 && this.stageChange) {
      this.stageChange = false;
      // this.stageChange = false
      sendEvent(11, { currentStage: 1003, targetStage: 1004 });
    }
    if (Math.floor(this.score) === 500 && this.stageChange) {
      this.stageChange = false;
      // this.stageChange = false
      sendEvent(11, { currentStage: 1004, targetStage: 1005 });
    }
  }

  getItem(itemId) {
    // 아이템 획득시 점수 변화
    this.score += 10;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
