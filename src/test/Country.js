

const Country = ({ isArmenia, toggleChangeCountry }) => {
    // const handleToggleChangeCountry = () => {
    //     toggleChangeCountry();
    // }

    return (
        <div className={`country ${isArmenia ? 'armenia' : ''}`}>
            <p>Country : {isArmenia ? 'Armenia' : 'USA'}</p>
            <button onClick={toggleChangeCountry}>
                Change Country
        </button>
        </div>
    )
}

export default Country;