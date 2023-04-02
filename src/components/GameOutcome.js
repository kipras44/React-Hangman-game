import "./GameOutcome.css"

function GameOutcome ({result, onPlayAgain}) {
    return(
        <div className="popup">
            <div className="popup-content">
                <h2>{result === true ? "Congratulations, you won!" : "Sorry, you lost!"}</h2>
                <button onClick={onPlayAgain} className="Play">Play again</button>
            </div>
        </div>
    )
}

export default GameOutcome;