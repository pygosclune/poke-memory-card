import '../styles/Card.css'

export default function Card({ pokemonData, handler }) {
    return (
        <div className="pokemonCard" onClick={() => handler(pokemonData.name)}>
            <img className="pokemonImage" src={pokemonData.imageSrc}></img>
            <p className="pokemonName">{pokemonData.name}</p>
        </div>
    )
}