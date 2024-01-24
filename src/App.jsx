
import { useState, useEffect, useRef, useCallback } from 'react'


function App() {
    const [length, setLength] = useState(10);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(true);

    const [numbers, setNumbers] = useState(false);
    const [specialChars, setSpecialChars] = useState(false);

    const [password, setPassword] = useState("");

    // useRef Hook
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "";

        if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (lowercase) str += "abcdefghijklmnopqrstuvwxyz"

        if (numbers) str += "0123456789";
        if (specialChars) str += "!@#$%^&*_";

        for (let i = 1; i <= length; i++) {
            let randomIndex = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(randomIndex);
        }

        console.log(pass)
        setPassword(pass);
    }, [length, uppercase, lowercase, numbers, specialChars]);

    useEffect(() => {
        if (!(uppercase || lowercase || numbers || specialChars)) {
            setLowercase(true);
        }
        
        passwordGenerator();
    }, [length, uppercase, lowercase, numbers, specialChars])


    const copyPasswordToClipBoard = () => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
        console.log(password, "copied!")
    }

    return (
        <div className='bg-black text-white w-full h-screen flex flex-row justify-center'>

            <div className="bg-slate-800 w-full max-w-xl text-center">
                <h1 className='text-2xl font-medium'>Password Generator</h1>


                <div className="bg-slate-700">
                    <input
                        className='text-black border-none outline-none py-1 px-2'
                        type="text"
                        placeholder='Password'
                        value={password}
                        readOnly
                        ref={passwordRef}
                    />

                    <button
                        className="text"
                        onClick={copyPasswordToClipBoard}
                    >Copy</button>
                </div>

                <div className="">
                    <div className="">
                        <label className=""> {length} </label>
                        <input
                            type="range"
                            min={4}
                            max={24}
                            value={length}
                            className='cursor-pointer'
                            onChange={(e) => setLength(e.target.value)}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="uppercaseInput">Uppercase</label>
                        <input
                            type="checkbox"
                            checked={uppercase}
                            id="uppercaseInput"
                            onChange={() => setUppercase((prev) => !prev)}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="lowercaseInput">Lowercase</label>
                        <input
                            type="checkbox"
                            checked={lowercase}
                            id="lowercaseInput"
                            onChange={() => setLowercase((prev) => !prev)}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="numbersInput">Numbers</label>
                        <input
                            type="checkbox"
                            checked={numbers}
                            id="numbersInput"
                            onChange={() => setNumbers((prev) => !prev)}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="specialCharsInput">!@#$%^&*_</label>
                        <input
                            type="checkbox"
                            checked={specialChars}
                            id="specialCharsInput"
                            onChange={() => setSpecialChars((prev) => !prev)}
                        />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default App
