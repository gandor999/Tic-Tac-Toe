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
  return false;
};

const isValidMove = (ctx, event) => {
  return ctx.board[event.value] === null;
};

const updateBoard = assign({
  board: (context, event) => {
    const updatedBoard = [...context.board];
    updatedBoard[event.value] = context.whosPlaying;
    return updatedBoard;
  },
  whosPlaying: context => (context.whosPlaying === "x" ? "o" : "x"),
  lastWinner: context =>  context.whosPlaying
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
        "": [
          { target: "win", cond: "evaluateWin" },
          { target: "draw", cond: "evaluateDraw" }
        ],
        ONCLICK: [
          {
            target: 'onGame',
            cond: "isValidMove",
            actions: "updateBoard"
          }
        ]
      },
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
    },
    isValidMove
  },
  actions: {
    updateScore: (context, event) => {
      const { winner } = event;

      if(winner === "o") {
        context.score.o++;
      }else{
        context.score.x++;
      }
    },
    resetBoard: (context, event) => {
      // Clean all the context varaibles in order to start a new game board
      context.score.o = 0;
      context.score.x = 0;
      context.board = Array(9).fill(null);
    },
    updateBoard
  }
});



export { ticTacToeMachine };