import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getData();
  }, [countries]);

  const getData = async () => {
    try {
      const response = await axios.get(
        'https://ih-countries-api.herokuapp.com/countries'
      );
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      {countries === null ? (
        <h1>Se vienen paises :)</h1>
      ) : (
        <div>
          <div>
            <Navbar />
          </div>

          <div className="countries">
            <CountriesList countries={countries} />
            <Routes>
              <Route
                path="/:id"
                element={
                  <CountryDetails
                    countries={countries}
                    setCountries={setCountries}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
