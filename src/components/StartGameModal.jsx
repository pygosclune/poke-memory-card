import '../styles/StartGameModal.css'

export default function StartGameModal({gamemode, setGamemode, handleStartGame}) {
    return (
        <div className="startGame">
            <form onSubmit={handleStartGame} className="difficultyForm">
                <div>
                    <input type="radio" id="easyMode" value="easy" name="mode" defaultChecked={gamemode === 6} onChange={() => setGamemode(6)}/>
                    <label htmlFor="easyMode">Easy</label>
                </div>
                
                <div>
                    <input type="radio" id="mediumMode" value="medium" name="mode" defaultChecked={gamemode === 12} onChange={() => setGamemode(12)}/>
                    <label htmlFor="mediumMode">Medium</label>
                </div>             

                <div>
                    <input type="radio" id="hardMode" value="hard" name="mode" defaultChecked={gamemode === 18} onChange={() => setGamemode(18)}/>
                    <label htmlFor="hardMode">Hard</label>
                </div>

                <button type="submit">Start game</button>
            </form>
        </div>
    )
}