import React, { useEffect } from "react";

function Alert({type, msg, removeAlert}) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    },3000) // after 3 seconds invoke removeAlert and then hide alert
    return () => clearTimeout(timeout)
  },[])
  return <p className={`alert alert-${type}`}>{msg}</p>; // depending on the type it will be alert with the options danger or success
}

export default Alert;
