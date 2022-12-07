import React, { useEffect, useState } from "react";
import './Calculator.css';
import Container from '@mui/material/Container';
import { Box } from "@mui/system";
import { NumericFormat } from "react-number-format";

function Calculator() {
    const [preState, setPreState] = useState("");
    const [curState, setCurState] = useState("");
    const [input, setInput] = useState("0");
    const [operator, setOperator] = useState(null);
    const [total, setTotal] = useState(false);

    const inputNum = (e) => {
        if (curState.includes(".") && e.target.innerText === ".") return;

        if (total) {
            setPreState("");
        }

        curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText);
        setTotal(false);
    };

    useEffect(() => {
        setInput(curState);
    }, [curState]);

    useEffect(() => {
        setInput("0");
    }, []);

    const operatorType = (e) => {
        setTotal(false);
        setOperator(e.target.innerText);

        if (curState === "") return;
        if (preState !== "") {
            equals();
        } else {
            setPreState(curState);
            setCurState("");
        }
    };

    const equals = (e) => {
        if (e?.target.innerText === "=") {
            setTotal(true);
        }

        let calculate;
        switch (operator) {
            case "/":
                calculate = String(parseFloat(preState) / parseFloat(curState));
                break;
            case "X":
                calculate = String(parseFloat(preState) * parseFloat(curState));
                break;
            case "-":
                calculate = String(parseFloat(preState) - parseFloat(curState));
                break;
            case "+":
                calculate = String(parseFloat(preState) + parseFloat(curState));
                break;
            default:
                return;
        }

        setInput("");
        setPreState(calculate);
        setCurState("");
    };

    const minusPlus = () => {
        setCurState(curState * -1);
    };

    const percent = () => {
        setCurState(curState / 100);
    };

    const reset = () => {
        setPreState("");
        setCurState("");
        setInput("0");
    };

    return (
        <div>
            <Box m={5} />
            <Container maxWidth="xs">
                <div className="wrapper">
                    <div className="screen">
                        {input !== "" || input === "0" ? (
                            <NumericFormat
                                value={input}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                        ) : (
                            <NumericFormat
                                value={preState}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                        )}
                    </div>
                    <button className="lightGray" onClick={reset}>AC</button>
                    <button className="lightGray" onClick={minusPlus}>+/-</button>
                    <button className="lightGray" onClick={percent}>%</button>
                    <button className="orange" onClick={operatorType}>/</button>
                    <button className="gray" onClick={inputNum}>7</button>
                    <button className="gray" onClick={inputNum}>8</button>
                    <button className="gray" onClick={inputNum}>9</button>
                    <button className="orange" onClick={operatorType}>X</button>
                    <button className="gray" onClick={inputNum}>4</button>
                    <button className="gray" onClick={inputNum}>5</button>
                    <button className="gray" onClick={inputNum}>6</button>
                    <button className="orange" onClick={operatorType}>-</button>
                    <button className="gray" onClick={inputNum}>1</button>
                    <button className="gray" onClick={inputNum}>2</button>
                    <button className="gray" onClick={inputNum}>3</button>
                    <button className="orange" onClick={operatorType}>+</button>
                    <button className="gray" id="btnZero" onClick={inputNum}>0</button>
                    <button className="gray" onClick={inputNum}>.</button>
                    <button className="orange" onClick={equals}>=</button>
                </div>
            </Container>
        </div>
    );
}

export default Calculator;