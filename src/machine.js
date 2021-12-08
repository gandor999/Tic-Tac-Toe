import { createMachine, assign } from 'xstate';

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
      return board[index] === 'x';
    });

    if (xWon) {
      return true;
    }

    const oWon = line.every(index => {
      return board[index] === 'o';
    });

    if (oWon) {
      return true;
    }
  }
  return false;
};

const isValidMove = (ctx, event) => {
  return ctx.board[event.value] === null;
};

const evaluateDraw = (ctx) => !ctx.board.includes(null);

const updateBoard = assign({
  board: (context, event) => {
    const updatedBoard = [...context.board];
    updatedBoard[event.value] = context.whosPlaying;

    return updatedBoard;
  },
  whosPlaying: context => (context.whosPlaying === 'x' ? 'o' : 'x')
});

const setWinner = assign({
  lastWinner: context => (context.whosPlaying === 'x' ? 'o' : 'x')
});

const updateScore = assign({
  score: (context) => {
    const { lastWinner } = context;

    if(lastWinner === 'o') {
      return {
        ...context.score,
        o: ++context.score.o
      }
    } else {
      return {
        ...context.score,
        x: ++context.score.x
      }
    }
  }
});

const resetBoard = assign({
  board: () => Array(9).fill(null),
  lastWinner: () => null
});

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
        '': [
          { target: 'win', cond: 'evaluateWin', actions: 'setWinner' },
          { target: 'draw', cond: 'evaluateDraw' }
        ],
        ON_CLICK: [
          {
            target: 'onGame',
            cond: 'isValidMove',
            actions: 'updateBoard'
          }
        ]
      }
    },
    win: {
      on: {
        ANOTHER_ROUND: {
          target: 'onGame'
        }
      },
      exit: ['updateScore', 'resetBoard']
    },
    draw: {
      on: {
        ANOTHER_ROUND: {
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
    evaluateDraw,
    isValidMove
  },
  actions: {
    updateScore,
    resetBoard,
    updateBoard,
    setWinner
  }
});



export { ticTacToeMachine };