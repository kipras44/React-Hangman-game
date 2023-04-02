import "./Footer.css"
import { useState } from "react";

function Footer() {
  const [showHelp, setShowHelp] = useState(false);

  function handleHelp() {
    setShowHelp(true)
  }

  return (
    <div className="footer">
      <button className="Help" onClick={handleHelp}>
        Click here for help
      </button>
      {showHelp && (
        <div>
          <h3>
            Click on the letters to guess what word it is to prevent the man from
            being hanged. Good luck!
          </h3>
        </div>
      )}
    </div>
  );
}

export default Footer