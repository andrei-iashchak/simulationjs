import { NeuralNetwork } from 'brain'

export const ACT = {
  zombie: 0,
  sleep: 0.25,
  activity: 0.5,
  feel: 1
}
export default class {
  name = 'empty'
  hair = 'black'
  birthDate = undefined
  powers = 0
  set action (value) {
    if (this.actions[this.actions.length - 1] === value) {
      this.loopTime += 1
    } else {
      this.loopTime = 0
    }
    this.actions.push(value)
    this[this.action]()
  }
  get action () {
    return this.actions[this.actions.length - 1]
  }
  actions = []
  loopTime = 0
  brain = new NeuralNetwork({
    errorThresh: 0.00005,
    hiddenLayers: [3, 8, 2],
    logPeriod: 10,
    log: true
  })
  trainValue = [
    {
      input: {
        powers: 0,
        action: ACT.zombie,
        loopTime: 1
      },
      output: {
        sleep: 1
      }
    },
    {
      input: {
        powers: 0.1,
        action: ACT.zombie,
        loopTime: 0
      },
      output: {
        sleep: 1
      }
    },
    {
      input: {
        powers: 1,
        action: ACT.sleep
      },
      output: {
        activity: 1
      }
    },
    {
      input: {
        powers: 0,
        action: ACT.feel
      },
      output: {
        sleep: 1
      }
    },
    {
      input: {
        powers: 0.5,
        action: ACT.activity
      },
      output: {
        feel: 1
      }
    },
    {
      input: {
        powers: 1,
        action: ACT.activity
      },
      output: {
        feel: 1
      }
    },
    {
      input: {
        powers: 0.25,
        action: ACT.activity
      },
      output: {
        sleep: 1
      }
    }
  ]

  constructor ({name, currentTime}) {
    this.birthDate = currentTime
    this.name = name
    this.brain.train(this.trainValue)
  }
  sleep () {
    if (this.powers < 100) {
      this.powers += 10
    }
  }
  activity () {
    if (this.powers > 0) {
      this.powers -= 10
    }
  }
  feel () {
    this.powers += (Math.round(Math.random()) * 2 - 1) * 10
  }
  learn () {
    this.powers -= 5
  }
  zombie () {
    this.powers += (Math.round(Math.random()) * 2 - 1.25) * 5
  }
  tick () {
    const params = {
      powers: this.powers / 100,
      action: ACT[this.action],
      loopTime: this.loopTime / 10
    }
    const newRes = this.brain.run(params)
    const vals = Object.values(newRes)
    const keys = Object.keys(newRes)
    const action = keys[vals.indexOf(Math.max.apply(Math, vals))]
    this.action = action
  }
}
