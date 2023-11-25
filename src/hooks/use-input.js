//1-practice use reducer
//first import it
import { useReducer } from "react";

//4- declare this obj to pass into useReducer second argument
const initialInputState = {
  value: "",
  isTouched: false,
};

//2-declare reducer function with return
//this function takes 2 arguments
//the preves satae snapshot
//return the new state snapshot
//10-declare declared dispatch func/type/if clauses
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }

  return initialInputState;
};

const useInput = (validateValue) => {
  //3- use useReducer and pass inputStateReducer
  //5- now useReducer returns array with 2  elements
  //first element is state manage by the reducer
  //second element is dipatch func that allows you
  //to dispatch actions against that reducer

  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  //6- now we can use inputState
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  //7-now we also can dispatch action
  const valueChangeHandler = (event) => {
    //it can also carry value: value:event.target.value this will be action.value
    dispatch({ type: "INPUT", value: event.target.value });
  };
  //8-change all our func with dispatch
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    dispatch({ type: "RESET" });
  };
  //9-correct the returns values
  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useInput;
