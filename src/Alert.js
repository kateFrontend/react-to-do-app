import React, { useEffect } from "react";

function Alert({type,msg}) {
  return <p className={`alert alert-${type}`}>{msg}</p>; // depending on the type it will be alert with the options danger or success
}

export default Alert;
