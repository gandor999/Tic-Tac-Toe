import { Fragment, useState, useEffect } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import checkMark from './images/checkMark.png';
import wrongMark from './images/wrongMark.png';
import circle from './images/circle.png';
import white from './images/white.png';
import './App.css';
import Swal from 'sweetalert2';




function App() {
    
    const [xTurn, setXTurn] = useState(true);
    const [oTurn, setOTurn] = useState(false);
    const [whoWin, setWhoWin] = useState('');
    const [xPoint, setXPoint] = useState(0);
    const [oPoint, setOPoint] = useState(0);
    const [timesClicked, setTimesClicked] = useState(0);

    console.log(`X turn: ${xTurn}`)
    console.log(`O turn: ${oTurn}`)
    console.log(`xpoint: ${xPoint}`)
    console.log(`opoint: ${oPoint}`)
    console.log(`timesClicked: ${timesClicked}`)
    console.log(`whoWin: ${whoWin}`)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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



    function checkingDraw(){

      // When X wins
      if(
        (xr1c1.status && xr1c2.status && xr1c3.status) ||
        (xr2c1.status && xr2c2.status && xr2c3.status) ||
        (xr3c1.status && xr3c2.status && xr3c3.status)
      ){setWhoWin('x')}


      if(
        (xr3c1.status && xr2c1.status && xr1c1.status) ||
        (xr3c2.status && xr2c2.status && xr1c2.status) ||
        (xr3c3.status && xr2c3.status && xr1c3.status)
      ){setWhoWin('x')}


      if(
        (xr3c3.status && xr2c2.status && xr1c1.status) ||
        (xr3c1.status && xr2c2.status && xr1c3.status)
      ){setWhoWin('x')}


      // When O wins
      if(
        (or1c1.status && or1c2.status && or1c3.status) ||
        (or2c1.status && or2c2.status && or2c3.status) ||
        (or3c1.status && or3c2.status && or3c3.status)
      ){setWhoWin('o')}


      if(
        (or3c1.status && or2c1.status && or1c1.status) ||
        (or3c2.status && or2c2.status && or1c2.status) ||
        (or3c3.status && or2c3.status && or1c3.status)
      ){setWhoWin('o')}


      if(
        (or3c3.status && or2c2.status && or1c1.status) ||
        (or3c1.status && or2c2.status && or1c3.status)
      ){setWhoWin('o')}

      
    }



    useEffect(async () => {

      await checkingDraw();

      if(timesClicked == 9 && whoWin == ''){
        setWhoWin('draw');
        handleShow();
      }

    }, [xTurn, oTurn])


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

    console.log(whoWin);



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
  

  return (
      <div className="d-flex flex-column table-wrapper justify-content-center align-items-center p-5">
        <div className="p-5 mb-4">
          {
            (xTurn) ? 
              <h3>Turn <img id="xturn" src={wrongMark} /></h3>
            :
              <h3>Turn <img id="oturn" src={circle} /></h3>
          }
        </div>

        <div className="d-flex">
          <div className="pr-5 mr-5">
            <h5 className="">X Score:</h5>
            <h5 className="text-center">{xPoint}</h5>
          </div>

          <div className="mr-5 ml-5 mb-5">
            <Table borderless className="w-25">
              <tbody className="text-center">
                <tr className="border-bottom">
                  <td className="border-right" onClick={() => changeTurn(xr1c1, or1c1, setXR1C1, setOR1C1)}>
                    {
                      (xr1c1.status) ?
                        <img src={wrongMark} />
                      :
                        (or1c1.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  <td className="border-right" onClick={() => changeTurn(xr1c2, or1c2, setXR1C2, setOR1C2)}>
                    {
                      (xr1c2.status) ?
                        <img src={wrongMark} />
                      :
                        (or1c2.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  <td onClick={() => changeTurn(xr1c3, or1c3, setXR1C3, setOR1C3)}>
                    {
                      (xr1c3.status) ?
                        <img src={wrongMark} />
                      :
                        (or1c3.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                </tr>
                <tr className="border-bottom">
                  <td className="border-right" onClick={() => changeTurn(xr2c1, or2c1, setXR2C1, setOR2C1)}>
                    {
                      (xr2c1.status) ?
                        <img src={wrongMark} />
                      :
                        (or2c1.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  <td className="border-right" onClick={() => changeTurn(xr2c2, or2c2, setXR2C2, setOR2C2)}>
                    {
                      (xr2c2.status) ?
                        <img src={wrongMark} />
                      :
                        (or2c2.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  <td onClick={() => changeTurn(xr2c3, or2c3, setXR2C3, setOR2C3)}>
                    {
                      (xr2c3.status) ?
                        <img src={wrongMark} />
                      :
                        (or2c3.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  
                </tr>
                <tr>
                  <td className="border-right" onClick={() => changeTurn(xr3c1, or3c1, setXR3C1, setOR3C1)}>
                    {
                      (xr3c1.status) ?
                        <img src={wrongMark} />
                      :
                        (or3c1.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  <td className="border-right" onClick={() => changeTurn(xr3c2, or3c2, setXR3C2, setOR3C2)}>
                    {
                      (xr3c2.status) ?
                        <img src={wrongMark} />
                      :
                        (or3c2.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  <td onClick={() => changeTurn(xr3c3, or3c3, setXR3C3, setOR3C3)}>
                    {
                      (xr3c3.status) ?
                        <img src={wrongMark} />
                      :
                        (or3c3.status) ?
                          <img src={circle} />
                        :
                          <img src={white} />
                    }
                  </td>
                  
                </tr>
                
              </tbody>
            </Table>
          </div>

          <div className="ml-5 pl-5">
            <h5>O Score:</h5>
            <h5 className="text-center">{oPoint}</h5>
          </div>
        </div>

      

        

        <div className="mt-4">
          <Button className="mr-4" onClick={playAgain}>Reset Board</Button>
          <Button onClick={resetScore}>Reset Score</Button>
        </div>

        


        <Modal show={show}>
          <Modal.Header className="text-center">
            {
              (whoWin == 'x') ?
                <Modal.Title>X Wins!</Modal.Title>
              :
                (whoWin == 'o') ?
                  <Modal.Title>O Wins!</Modal.Title>
                :
                  <Modal.Title>Draw</Modal.Title>
            }
          </Modal.Header>
          
          <Modal.Footer className="text-center">
            <Button variant="warning" onClick={playAgain}>
              Another Round
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      
  )
}

export default App;
