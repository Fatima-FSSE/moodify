
const geoDb_api_key = process.env.REACT_APP_GEO_DB_API;
export const GEODB_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const GeoDB_Api_options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': `${geoDb_api_key}`,
		'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};