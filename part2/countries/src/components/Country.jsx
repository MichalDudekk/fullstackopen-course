// src/components/Country.jsx

const Country = ({ data }) => {
    return (
        <>
            <h1>{data.name.common}</h1>
            Capital {data.capital}
            <br />
            Area {data.area}
            <br />
            <h2>Languages</h2>
            <ul>
                {Object.values(data.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={data.flags.png} />
        </>
    );
};

export default Country;
