import { useState, useEffect } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import wrongMark from './images/wrongMark.png';
import circle from './images/circle.png';
import white from './images/white.png';
import { ticTacToeMachine } from "./machine";
import { useMachine } from "@xstate/react";
import './App.css';

function range(length) {
  return Array(length)
    .fill(null)
    .map((_, i) => i);
}

function generateBoardBoxClassName(index){
  const classes = ["board-box"];

  if(index<3){
    classes.push('remove-top-border');
  }

  if( index>5){
    classes.push('remove-bottom-border');
  }

  if(index%3===0){
    classes.push('remove-left-border');
  }

  if(index%3===2){
    classes.push('remove-right-border');
  }

  return classes.join(' ');
}

const App = () => {
    const [current, send] = useMachine(ticTacToeMachine);
    const { 
      score,
      whosPlaying,
      lastWinner,
      board
    } = current.context;
    console.log("current", current.context);

    
    const [xTurn, setXTurn] = useState(true);
    const [oTurn, setOTurn] = useState(false);
    const [whoWin, setWhoWin] = useState('');
    const [xPoint, setXPoint] = useState(0);
    const [oPoint, setOPoint] = useState(0);
    const [timesClicked, setTimesClicked] = useState(0);
    const [playerx, setPlayerX] = useState('No player');
    const [playero, setPlayerO] = useState('No player');

    const [playernamex, setPlayerNameX] = useState('No player');
    const [playernameo, setPlayerNameO] = useState('No player');

    console.log(`X turn: ${xTurn}`)
    console.log(`O turn: ${oTurn}`)
    console.log(`xpoint: ${xPoint}`)
    console.log(`opoint: ${oPoint}`)
    console.log(`timesClicked: ${timesClicked}`)
    console.log(`whoWin: ${whoWin}`)
    console.log(`playerx: ${playerx}`)
    console.log(`playero: ${playero}`)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

      // X rows and Columns
    let [xr1c1, setXR1C1] = useState({status: false, isClicked: false});
    let [xr1c2, setXR1C2] = useState({status: false, isClicked: false});
    let [xr1c3, setXR1C3] = useState({status: false, isClicked: false});

    let [xr2c1, setXR2C1] = useState({status: false, isClicked: false});
    let [xr2c2, setXR2C2] = useState({status: false, isClicked: false});
    let [xr2c3, setXR2C3] = useState({status: false, isClicked: false});

    let [xr3c1, setXR3C1] = useState({status: false, isClicked: false});
    let [xr3c2, setXR3C2] = useState({status: false, isClicked: false});
    let [xr3c3, setXR3C3] = useState({status: false, isClicked: false});

      // O Rows and Columns
    let [or1c1, setOR1C1] = useState({status: false, isClicked: false});
    let [or1c2, setOR1C2] = useState({status: false, isClicked: false});
    let [or1c3, setOR1C3] = useState({status: false, isClicked: false});

    let [or2c1, setOR2C1] = useState({status: false, isClicked: false});
    let [or2c2, setOR2C2] = useState({status: false, isClicked: false});
    let [or2c3, setOR2C3] = useState({status: false, isClicked: false});

    let [or3c1, setOR3C1] = useState({status: false, isClicked: false});
    let [or3c2, setOR3C2] = useState({status: false, isClicked: false});
    let [or3c3, setOR3C3] = useState({status: false, isClicked: false});


    useEffect(() => {

        // When X wins
        if(
          (xr1c1.status && xr1c2.status && xr1c3.status) ||
          (xr2c1.status && xr2c2.status && xr2c3.status) ||
          (xr3c1.status && xr3c2.status && xr3c3.status)
        ){setWhoWin('x')}


        else if(
          (xr3c1.status && xr2c1.status && xr1c1.status) ||
          (xr3c2.status && xr2c2.status && xr1c2.status) ||
          (xr3c3.status && xr2c3.status && xr1c3.status)
        ){setWhoWin('x')}


        else if(
          (xr3c3.status && xr2c2.status && xr1c1.status) ||
          (xr3c1.status && xr2c2.status && xr1c3.status)
        ){setWhoWin('x')}


        // When O wins
        else if(
          (or1c1.status && or1c2.status && or1c3.status) ||
          (or2c1.status && or2c2.status && or2c3.status) ||
          (or3c1.status && or3c2.status && or3c3.status)
        ){setWhoWin('o')}


        else if(
          (or3c1.status && or2c1.status && or1c1.status) ||
          (or3c2.status && or2c2.status && or1c2.status) ||
          (or3c3.status && or2c3.status && or1c3.status)
        ){setWhoWin('o')}


        else if(
          (or3c3.status && or2c2.status && or1c1.status) ||
          (or3c1.status && or2c2.status && or1c3.status)
        ){setWhoWin('o')}

        else if(whoWin == ''&& timesClicked == 9){
          setWhoWin('draw');
        }

    }, [timesClicked])

    useEffect(() => {
      if(whoWin == 'x'){
        setXPoint(xPoint + 1);
        handleShow();
      }

      if(whoWin == 'o'){
        setOPoint(oPoint + 1);
        handleShow();
      }

      if(whoWin == 'draw'){
        handleShow();
      }

    }, [whoWin])

    function changeTurn(x, o, setX, setO){

      if(x.isClicked || o.isClicked){
        console.log("Already Clicked");
      } else{
        if(xTurn){
          setX({status: true, isClicked: true});
          setXTurn(false);
          setOTurn(true);
        };
        if(oTurn){
          setO({status: true, isClicked: true});
          setXTurn(true);
          setOTurn(false);
        }

        setTimesClicked(timesClicked + 1);      
      }
    }


    function playAgain(){
      handleClose();

      // Close all X
      setXR1C1({status: false, isClicked: false});
      setXR1C2({status: false, isClicked: false});
      setXR1C3({status: false, isClicked: false});

      setXR2C1({status: false, isClicked: false});
      setXR2C2({status: false, isClicked: false});
      setXR2C3({status: false, isClicked: false});

      setXR3C1({status: false, isClicked: false});
      setXR3C2({status: false, isClicked: false});
      setXR3C3({status: false, isClicked: false});


      // Close all O
      setOR1C1({status: false, isClicked: false});
      setOR1C2({status: false, isClicked: false});
      setOR1C3({status: false, isClicked: false});

      setOR2C1({status: false, isClicked: false});
      setOR2C2({status: false, isClicked: false});
      setOR2C3({status: false, isClicked: false});

      setOR3C1({status: false, isClicked: false});
      setOR3C2({status: false, isClicked: false});
      setOR3C3({status: false, isClicked: false});

      setTimesClicked(0);

      setWhoWin('');
    }


    function resetScore(){
      setOPoint(0);
      setXPoint(0);
    }

    function saveName(){
      setPlayerNameX(playerx);
      setPlayerNameO(playero);
      handleClose2();
    }

    function clearName(setName){
      setName('No player');
    }
  
  return (
      <div className="d-flex flex-column table-wrapper justify-content-center align-items-center p-2">
        <div className="p-5 mb-5">
          {
            (whosPlaying === 'x') ? 
              <h3>Turn <img className="xturn" src={wrongMark} /></h3>
            :
              <h3>Turn <img className="oturn" src={circle} /></h3>
          }
        </div>

        <div className="d-flex">
          <div className="pr-5 mr-5">
            <p className="text-center">{playernamex}</p>
            <h5 className="text-center"><img className="xturn pb-1" src={wrongMark} /> Score:</h5>
            <h5 className="text-center">{score.x}</h5>
          </div>

          <div className="mr-5 ml-5 mb-5">
          <Table borderless className="w-25">
            <div className="text-center table-board">
             
              {range(9).map((i) => {
                return (
                  <div
                    key={i}
                    className = {generateBoardBoxClassName(i)}
                    onClick={() => send({ type: "ON_CLICK", whosPlaying, value: i })}
                  >
                    {
                          (board[i] === 'x') ?
                            <img src={wrongMark} />
                          :
                            (board[i] === 'o') ?
                              <img src={circle} />
                            :
                              <img src={white} />
                        }
                  </div>
                );
              })}
            </div>
          </Table>
          </div>

          <div className="ml-5 pl-5">
            <p className="text-center">{playernameo}</p>
            <h5 className="text-center pb-1"><img className="oturn" src={circle} /> Score:</h5>
            <h5 className="text-center">{score.o}</h5>
          </div>
        </div>
        

        <div className="mt-4">
          <Button size="sm" variant="warning" className="mr-4" onClick={playAgain}>Reset Board</Button>
          <Button size="sm" variant="warning" className="mr-4" onClick={resetScore}>Reset Score</Button>
          <Button size="sm" variant="danger" onClick={handleShow2}>Edit / Remove Players</Button>
        </div>

        <Modal show={show || current.matches("win") || current.matches("draw")}>
          <Modal.Header className="text-center">
            {
              (whoWin == 'x' || current.context.lastWinner === 'x') ?
                <Modal.Title>X Wins!</Modal.Title>
              :
                (whoWin == 'o' || current.context.lastWinner === 'o') ?
                  <Modal.Title>O Wins!</Modal.Title>
                :
                  <Modal.Title>Draw</Modal.Title>
            }
          </Modal.Header>
          
          <Modal.Footer className="text-center">
            <Button variant="warning" onClick={() => send('ANOTHER_ROUND')}>
              Another Round
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header className="text-center">
            <Modal.Title>Player Roster</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <Form.Control 
                type="text" 
                placeholder="Player1"
                value={playerx} 
                onChange={e => setPlayerX(e.target.value)}
              /> <Button variant="danger" className="ml-2" onClick={() => clearName(setPlayerX)}>X</Button>
            </div>
            <div className="d-flex mt-4">
              <Form.Control 
                type="text" 
                placeholder="Player2"
                value={playero}
                onChange={e => setPlayerO(e.target.value)}
              /> <Button variant="danger" className="ml-2" onClick={() => clearName(setPlayerO)}>X</Button>
            </div>
          </Modal.Body>
          <Modal.Footer className="text-center">
            <Button variant="warning" type="submit" onClick={handleClose2 }>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={saveName}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
  )
}

export default App;
