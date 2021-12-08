import { createMachine } from 'xstate';

const evaluateWin = (ctx) => {
  const { board } = ctx;
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let line of winningLines) {
    const xWon = line.every(index => {
      return board[index] === "x";
    });

    if (xWon) {
      return true;
    }

    const oWon = line.every(index => {
      return board[index] === "o";
    });

    if (oWon) {
      return true;
    }
  }
};

const ticTacToeMachine = createMachine({
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
    evaluateWin,
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

export { ticTacToeMachine };