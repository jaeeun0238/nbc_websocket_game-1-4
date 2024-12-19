import { sendEvent, gameAssetsData } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  stage = 0;
  itemID = 0;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.stageChange = true;
    const stageData = gameAssetsData.stages.data;
    this.score += deltaTime * 0.001 * stageData[this.stage].scorePerSecond; // deltaTime 프레임//0.001 = 1초 (1000/60 = 16.77)
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

    if (
      Math.floor(this.score) >= stageData[this.stage + 1].score &&
      this.stageChange
    ) {
      this.stageChange = false;
      // this.stageChange = false
      sendEvent(11, {
        currentStage: stageData[this.stage].id,
        targetStage: stageData[this.stage + 1].id,
      });
      this.stage++; // this.stage += 1;
    }
  }

  getItem(itemId) {
    // 아이템 획득시 점수 변화
    const itemData = gameAssetsData.items.data.find(
      (item) => item.id === itemId,
    );
    // if (itemId === itemData.id) {
    //   this.score += itemData.score;
    // }
    this.score += itemData.score;
  }

  reset() {
    this.score = 0;
    this.stage = 0;
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

    const stageX = 25 * this.scaleRatio;
    this.ctx.fillText(`STAGE ${this.stage + 1}`, stageX, y);

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
