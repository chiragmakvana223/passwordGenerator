import { useState, useRef, useCallback  } from "react"

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [spacialCharAllowed,setSpacialCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  let inputRef = useRef(null);

  const passwordGenerator = useCallback(() =>{
    let pass=""
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    

    if(numberAllowed) alphabet += numbers;
    if(spacialCharAllowed) alphabet += specialChars;

    for(let i = 1; i <= length; i++){
      const char= Math.floor(Math.random() * alphabet.length ) ;
      pass += alphabet.charAt(char);
    }
      setPassword(pass);
  },[length,numberAllowed,spacialCharAllowed,setPassword]);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, password.length); // For mobile compatibility
      navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
      });
    }
  };

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96">
    <h1 className="text-xl font-semibold text-center mb-4">Password Generator</h1>

    <div className="flex items-center mb-4">
          <input
            ref={inputRef}
            type="text"
            value={password}
            readOnly
            className="flex-1 p-2 rounded bg-gray-700 text-orange-400"
          />
          <button
           onClick={copyToClipboard}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Copy
          </button>
        </div>
        <div className="mb-4">
          <label className="text-sm">Length: {length}</label>
          <input
            type="range"
            min="8"
            max="99"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full mt-1"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="numbers"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label htmlFor="numbers" className="ml-2 text-sm">
            Numbers
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="specialChars"
            checked={spacialCharAllowed}
            onChange={(e) => setSpacialCharAllowed(e.target.checked)}
          />
          <label htmlFor="specialChars" className="ml-2 text-sm">
            Special Characters
          </label>
        </div>
        <button
          onClick={passwordGenerator}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Generate Password
        </button>
    </div>
    </div>
    </>
  )
}

export default App
