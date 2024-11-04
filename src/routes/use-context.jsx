import { useState, createContext, useContext } from "react";
// import PropTypes from "prop-types";

// Create a context for the prop value
const PropValueContext = createContext();

// Top Component
export default function ToUseContext() {
  const [propValue, setPropValue] = useState("Use Context");

  const handlePropChange = (newValue) => {
    setPropValue(newValue);
  };

  return (
    <PropValueContext.Provider value={{ propValue, handlePropChange }}>
      <div>
        <p>Top Component: {propValue}</p>
        <p> &nbsp;</p>
        <div>
          <button onClick={() => setPropValue("Use Context")}>
            setPropValue on Top Component
          </button>
        </div>
        <p> &nbsp;</p>
        <Component2 />
      </div>
    </PropValueContext.Provider>
  );
}

// Component 2
function Component2() {
  return <Component3 />;
}

// Component 3
function Component3() {
  return <Component4 />;
}

// Component 4
function Component4() {
  return <Component5 />;
}

// Component 5
function Component5() {
  const { handlePropChange } = useContext(PropValueContext);

  const handleClick = () => {
    handlePropChange("New Value from Component5");
  };

  return (
    <div>
      <button onClick={handleClick}>
        Update Top Component from Component5 with useContext
      </button>
    </div>
  );
}
