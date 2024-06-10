import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const PasswordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+/*-+[]{}";
    for (let i = 1; i <length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword]);

const copyPassword = useCallback(()=>{
  PasswordRef.current?.select()
  window.navigator.clipboard.writeText(password)
  // select range 
  // PasswordRef.current?.setSelectionRange(0,3)
  
},[password])
  
  useEffect(()=>{
    PasswordGenerator()
    
  },[length, numAllowed, charAllowed, PasswordGenerator])
  
  return (
    <>
      <div className="items-center justify-center w-full max-w-md px-4 my-8 ml-10 text-center text-orange-800 bg-gray-800 rounded-lg shadow-md">
        <h1 className="my-3 text-center text-white ">Password generator</h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow">
          <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none"
            placeholder="Password"
            ref={PasswordRef}
            readOnly
          />
          <button
          onClick={copyPassword}
           className="px-3 text-white bg-blue-500 outline-none py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
          <input 
          type="range" 
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=> {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                setNumAllowed((prev)=> !prev)
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=>{
                setCharAllowed((prev)=> !prev)
              }}
            />
            <label>Character</label>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default App;
