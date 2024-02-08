
import { useState, useEffect, useRef, useCallback } from 'react'


function App() {
    const [length, setLength] = useState(10);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(true);

    const [numbers, setNumbers] = useState(false);
    const [special, setSpecial] = useState(false);

    const [password, setPassword] = useState("");
    const [isCopied, setIsCopied] = useState(false);


    // useRef Hook
    const passwordRef = useRef(null);

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*_";

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "";

        if (uppercase) str += uppercaseChars;
        if (lowercase) str += lowercaseChars

        if (numbers) str += numberChars;
        if (special) str += specialChars;

        for (let i = 1; i <= length; i++) {
            let randomIndex = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(randomIndex);
        }

        console.log(pass)
        setPassword(pass);
    }, [length, uppercase, lowercase, numbers, special]);

    useEffect(() => {
        setIsCopied(false)
        if (!(uppercase || lowercase || numbers || special)) {
            setLowercase(true);
        }

        passwordGenerator();
    }, [length, uppercase, lowercase, numbers, special])


    const copyPasswordToClipBoard = () => {
        // passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);

        setIsCopied(true)
        console.log(password, "copied!")
    }

    return (
        <div className='bg-[#151823] text-white w-full h-screen flex flex-row justify-center'>

            <div className="w-full max-w-xl text-center">
                <h1 className='text-2xl font-medium'>Password Generator</h1>


                <div className="mt-6 flex flex-row px-4">
                    <input
                        id="password"
                        className='text-white bg-[#090c16] border-none outline-none py-2 px-4 w-full rounded-l-lg'
                        type="text"
                        placeholder='Password'
                        value={password}
                        readOnly
                        ref={passwordRef}
                    />

                    <button
                        className="bg-[#2d59a0] w-20 rounded-r-lg"
                        onClick={copyPasswordToClipBoard}
                    >{isCopied ? "Copied!" : "Copy"}</button>
                </div>

                <div className="mt-2">
                    <div className="flex flex-row items-center justify-between py-4 px-4 border-b-2 border-[#3d4b65]">
                        <div>Length</div>
                        <label htmlFor="uppercaseInput" className="flex flex-row items-center">
                            <span className="pr-2 text-sm text-gray-400"> {length} </span>
                            <input
                                id="rangeInput"
                                type="range"
                                min={4}
                                max={50}
                                value={length}
                                className='cursor-pointer'
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="flex flex-row items-center justify-between py-4 px-4 border-b-2 border-[#3d4b65]">
                        <div>A-Z</div>
                        <label htmlFor="uppercaseInput" className="flex flex-row items-center">
                            <span className="pr-2 text-sm text-gray-400">Uppercase (A to Z)</span>
                            <div className="toggleSwitch">
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    checked={uppercase}
                                    id="uppercaseInput"
                                    onChange={() => setUppercase((prev) => !prev)}
                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-row items-center justify-between py-4 px-4 border-b-2 border-[#3d4b65]">
                        <div>a-z</div>
                        <label htmlFor="lowercaseInput" className="flex flex-row items-center">
                            <span className="pr-2 text-sm text-gray-400">Lowercase (a to z)</span>
                            <div className="toggleSwitch">
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    checked={lowercase}
                                    id="lowercaseInput"
                                    onChange={() => setLowercase((prev) => !prev)}
                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                    </div>


                    <div className="flex flex-row items-center justify-between py-4 px-4 border-b-2 border-[#3d4b65]">
                        <div>0-9</div>
                        <label htmlFor="numbersInput" className="flex flex-row items-center">
                            <span className="pr-2 text-sm text-gray-400">Numbers (1 to 9)</span>
                            <div className="toggleSwitch">
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    checked={numbers}
                                    id="numbersInput"
                                    onChange={() => setNumbers((prev) => !prev)}

                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                    </div>


                    <div className="flex flex-row items-center justify-between py-4 px-4 border-b-2 border-[#3d4b65]">
                        <div>{specialChars}</div>
                        <label htmlFor="specialInput" className="flex flex-row items-center">
                            <span className="pr-2 text-sm text-gray-400">Special characters</span>
                            <div className="toggleSwitch">
                                <input
                                    className="checkboxInput"
                                    type="checkbox"
                                    checked={special}
                                    id="specialInput"
                                    onChange={() => setSpecial((prev) => !prev)}
                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default App
