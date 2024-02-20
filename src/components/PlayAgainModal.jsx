import '../styles/PlayAgainModal.css'

export default function PlayAgainModal({ setGameState, handlePlayAgain, isWin }) {

    return (
        <div className="playAgain">
            {isWin ? (<p className='resultText'>You win</p>) : (<p className='resultText'>You lost</p>)}
            <button onClick={() => handlePlayAgain()}>Play again</button>
            <button onClick={() => setGameState('start')}>Change difficulty</button>
        </div>
    )
}