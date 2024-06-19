
import React, { useState} from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEODB_API_URL, GeoDB_Api_options } from './GeoDB_Api';
import "./Search.css";


function Search({onSearchCityChange}) {

   const [search, setSearch] = useState(null);

   const handleOnChange = (searchCityData) => {
      setSearch(searchCityData);
      onSearchCityChange(searchCityData);
   }

   const loadOptions = (input) => {
    return fetch(
        `${GEODB_API_URL}/cities?minPopulation=1000000&namePrefix=${input}`,
        GeoDB_Api_options
      )
        .then((response) => response.json())
        .then((response) => {
          return {
            options: response.data.map((city) => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
              };
            }),
          };
        });
    };

    return (
      <div className="search-input-div">
        <AsyncPaginate
          placeholder="Search city"
        //   debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          className="search-input"
        />
      </div>
    );
}

export default Search;