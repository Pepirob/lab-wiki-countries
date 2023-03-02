import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CountryDetails(props) {
  const countryParam = useParams();
  const { id } = countryParam;
  const { countries } = props;

  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    // const selectedCountry = countries.filter((country) => {
    //   return country.alpha3Code === id && true;
    // });
    // setCountryDetails(selectedCountry);
    getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${id}`
      );
      setCountryDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(countryDetails);

  return (
    <div className="container">
      {countryDetails === null ? (
        <h1>Buscando info</h1>
      ) : (
        <div className="row">
          <div className="col-7">
            <img
              src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
              alt="country flag"
            />
            <h1> {countryDetails.name.common} </h1>
            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Capital</td>
                  <td>{countryDetails.capital}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                    {`${countryDetails.area} Km`}
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    <ul>
                      {countries
                        .filter((country) => {
                          return countryDetails.borders.includes(
                            country.alpha3Code
                          );
                        })
                        .map((country) => {
                          return (
                            <li className="borders" key={country.alpha3Code}>
                              <Link to={`/${country.alpha3Code}`}>
                                {country.name.common}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
