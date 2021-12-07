import { createMachine } from 'xstate';

const ticTactToeMachine = createMachine({
  id: 'ticTactToe',
  initial: 'onGame',
  context: {
    score: {
      x: 0,
      o: 0
    },
    whosPlaying: 'x', // Values X or O
    lastWinner: null,
    board: Array(9).fill(null)
  },
  states: {
    onGame: {
      on: {
        ONCLICK: [
          {
            cond: 'evaluateWin',
            target: 'win'
          },
          {
            cond: 'evaluateDraw',
            target: 'draw'
          },
          {
            target: 'onGame'
          }
        ]
      },
      exit: 'updateBoard',
      meta: {
        message: 'hola wey'
      }
    },
    win: {
      on: {
        anotherRound: {
          target: 'onGame'
        }
      },
      exit: ['updateScore', 'resetBoard']
    },
    draw: {
      on: {
        anotherRound: {
          target: 'onGame'
        }
      },
      exit: ['resetBoard']
    }
  }
},
{
  guards: {
    evaluateWin: (context) => {
      return false;
    },
    evaluateDraw: (context) => {
      return false;
    }
  },
  actions: {
    updateScore: (context, event) => {
      // score update must be here :P
    },
    resetBoard: (context, event) => {
      // Clean all the context varaibles in order to start a new game board
    },
    updateBoard: (context, event) => {
      // who played and what was the play?
    }
  }
});

export { ticTactToeMachine };