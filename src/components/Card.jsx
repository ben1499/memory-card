function Card({ data, onClick }) {
    return (
        <div className="card" onClick={() => onClick(data)}>
            <img style={{width: "300px"}} src={data.image_url} alt="" />
            <h3>{data.name}</h3>
        </div>
    )
}

export default Card;