// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";

import Country from "./components/Country";

const App = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState(null);

    useEffect(() => {
        if (search === "") {
            return;
        }

        const baseURL = "https://studies.cs.helsinki.fi/restcountries/";
        axios
            .get(`${baseURL}api/all`)
            .then((res) => res.data)
            .then((data) =>
                setCountries(
                    data.filter((country) => {
                        const commonName = country.name.common;
                        return commonName
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase());
                    }),
                ),
            );
    }, [search]);

    return (
        <>
            <form>
                <label htmlFor="search">find countries </label>
                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </form>
            <div>
                {countries === null || search === "" ? null : countries.length >
                  10 ? (
                    "To many matches"
                ) : countries.length > 1 ? (
                    countries.map((country) => (
                        <div key={country.ccn3}>
                            {country.name.common}{" "}
                            <button
                                onClick={() => setSearch(country.name.common)}
                            >
                                Show
                            </button>{" "}
                            <br />
                        </div>
                    ))
                ) : countries.length === 0 ? (
                    "Nothing found"
                ) : (
                    <Country data={countries[0]} />
                )}
            </div>
        </>
    );
};

export default App;
