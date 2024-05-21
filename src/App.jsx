import { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const passwordRef = useRef();

  const passwordCopy = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 5000);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()";
    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, number, char]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, length, number, char]);

  return (
    <div className="w-full max-w-md mx-auto h-full max-h-screen py-10 px-5">
      <div className="mb-10">
        <img
        className="w-20 h-20 sm:w-40 sm:h-40 rounded-full mx-auto "
          src="https://avatars.githubusercontent.com/u/89912059?v=4"
          alt="Naresh Dhamu"
        />
        <div className="text-center text-xl sm:text-2xl my-2">Naresh Dhamu</div>
        <div className="text-center text-xl sm:text-2xl my-2">By creacted!</div>
      </div>
      <div>
        <h1 className=" text-xl sm:text-3xl font-bold text-center">
          Password Generator
        </h1>
        <div className="w-full my-8">
          <div className="flex">
            <input
              type="text"
              value={password}
              className="w-full px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-l-md text-black outline-none"
              ref={passwordRef}
              readOnly
            />
            <button
              onClick={passwordCopy}
              className=" w-24 py-1 sm:py-2 bg-blue-500 text-white rounded-r-md"
            >
              {copyButtonText}
            </button>
          </div>
          <div className="flex sm:flex-row gap-3 flex-col justify-center items-center">
            <div className="flex gap-3 items-center mt-4">
              <input
                type="range"
                min={8}
                max={20}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
              <label className="w-full">Length: {length}</label>
            </div>
            <div className="flex gap-3 items-center mt-4">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={number}
                  onChange={() => setNumber((prev) => !prev)}
                  className="w-4 h-4   rounded"
                />
                <label>Number</label>
              </div>
              <div className="flex gap-2 items-center ">
                <input
                  type="checkbox"
                  checked={char}
                  onChange={() => setChar((prev) => !prev)}
                  className="w-4 h-4   rounded "
                />
                <label>Character</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
