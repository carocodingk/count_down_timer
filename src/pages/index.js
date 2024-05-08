import { useEffect, useState } from "react";


export default function Home() {
  const pomodoroTime = 20 * 10;
  const [start, setStart] = useState(false);
  const [resetVal, setResetVal] = useState(false);
  const [seconds, setSeconds] = useState(pomodoroTime);

  const secondsConvert = (totalTime) => {
    const minutes = Math.floor(totalTime / 60)
    const seconds = totalTime % 60
    console.log(minutes, seconds)
    return[minutes, seconds]
  }

  

  console.log(secondsConvert(pomodoroTime))

  useEffect(() => {
    setTimeout(() => {
      if (start ){
        setSeconds((seconds) => seconds - 1)
        if (seconds === 0){
          setStart(false)
          console.log('ALARM')
          setSeconds(pomodoroTime)
        }
      }
      else if (!start && resetVal){
        setSeconds(pomodoroTime)
        setResetVal(false)
      }
      }, 1000)
  }, [start, resetVal, seconds]);
 
  return (
    <div>
      <div>{seconds}</div>
      <div>
        <input type="button" value='START' onClick={() => setStart(!start)} />
        <input type="button" value='RESET' onClick={() => {setStart(false); setResetVal(true)}} />
      </div>
    </div>
  );
}
