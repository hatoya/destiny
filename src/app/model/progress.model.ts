export class Progress {

  currentProgress: number = 0
  level: number = 0
  levelCap: number = 0
  nextLevelAt: number = 0
  progressToNextLevel: number = 0

  constructor(progress?: Progress) {
    Object.assign(this, progress)
  }

}