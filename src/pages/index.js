import { useEffect, useState } from "react";

const defaultTotalTime = 3600;

function Alarm ({resetAlarm}){
  return(
    <div className="timesUp1">
      <h1>TIME IS UP!</h1>
      <input type="button" value="OK" className="button" onClick={() => resetAlarm()} />
    </div>
  );
}


export default function Home() {
  const [start, setStart] = useState(false);
  const [edit, setEdit] = useState(false);
  const [totalTime, setTotalTime] = useState(defaultTotalTime);
  const [timesUp, setTimesUp] = useState(false);
  const [editedMinutes, setEditedMinutes] = useState(0);
  const [editedSeconds, setEditedSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (start) {
      timer = setTimeout(() => {
        setTotalTime((prevTotalTime) => prevTotalTime - 1);
      }, 1000);
      if (totalTime === 0){
        setStart(false)
        console.log('alarm')
        setTimesUp(true)
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    };
  }, [start, totalTime]);

  const seconds = totalTime % 60;
  const minutes = Math.floor(totalTime / 60);


  const customizedTime = () => {
    if (edit){
      setTotalTime(Number(editedMinutes * 60) + Number(editedSeconds))
      setEditedMinutes(0)
      setEditedSeconds(0)
    }
    setStart(false)
    setEdit(!edit); 
    setTimesUp(false)
  }

  const resetAlarm = () => {
    console.log('click'); 
    setTimesUp(false);
    setTotalTime(defaultTotalTime)
  }

  return (
    <div>
      <div id="timer">
        {
        edit?
        <div className="flexbox timebox">
          <div className="flexbox colflex">
            <input type="number" name="newMinutes" className="timeInput" min={0} max={60} onChange={(e) => setEditedMinutes(e.target.value)} />
            <p>Minutes</p>
          </div>
          <div id="colon">
            <h1>:</h1>
          </div>
          <div className="flexbox colflex">
            <input type="number" name="newSeconds" className="timeInput" min={0} max={60} onChange={(e) => setEditedSeconds(e.target.value)} />
            <p>Seconds</p>
          </div>
        </div>
        :
        <div id="timeText" className="timebox">{minutes}:{seconds < 10? `0${seconds}`: seconds}</div>
        }
        <div>
          <input className="button" type="button" value={start? 'PAUSE' : 'START'} onClick={() => setStart(!start)} />
          <input className="button" type="button" value={edit? 'OK' : 'EDIT'} onClick={() => {customizedTime()}} />
          <input className="button" type="button" value='RESET' onClick={() => {
            setStart(false);
            setTotalTime(defaultTotalTime);
            setTimesUp(false)
          }} />
        </div>
      </div>
      <div className="timesUp">
        {
        timesUp && <Alarm resetAlarm={resetAlarm} />
        }
      </div>
    </div>
  );
};
