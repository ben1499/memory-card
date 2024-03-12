function Scoreboard({ score, highScore }) {
    return (
        <div className="score-board">
            <h2>Score: {score}</h2>
            <h2>Best score: {highScore}</h2>
        </div>
    )
}

export default Scoreboard;