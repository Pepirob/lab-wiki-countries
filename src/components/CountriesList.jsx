import { Link } from 'react-router-dom';

function CountriesList({ countries }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <div className="list-group">
            {countries.map((country) => {
              return (
                <Link
                  key={country.alpha3Code}
                  className="list-group-item list-group-item-action"
                  to={`/${country.alpha3Code}`}
                >
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt="flag"
                  />
                  <h4>{country.name.common} </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountriesList;
