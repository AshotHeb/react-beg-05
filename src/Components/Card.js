
export default function Card({ img, text, imgAlt, active }) {

    return (
        <div className={`card ${active ? 'active' : ''}`}>
            <img src={img} alt={imgAlt} className="img" />
            <p>{text}</p>
        </div>
    )
}