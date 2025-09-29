# Police Station Dropdown Implementation

## Overview

This implementation adds a dynamic police station dropdown to the navbar that fetches data from the backend API and provides individual station pages.

## Features Implemented

### 1. Backend API Routes

-   **GET `/api/stations-dropdown`** - Fetches police stations for dropdown with basic info
-   **GET `/api/station-detail?id={stationId}`** - Fetches detailed information for a specific station

### 2. Frontend Components

-   **PoliceStationDropdown** - Dropdown component in navbar
-   **Dynamic Route** - `/police-station/[id]` for individual station pages
-   **usePoliceStations Hook** - Custom hook for fetching station data

### 3. Backend Changes

-   Added `getStationsForDropdown` controller method
-   Updated `getStationbyId` method to return proper format
-   Updated CORS configuration to allow production domain

## Files Modified/Created

### Backend Files

-   `csn-city-backend/controllers/police-station-controllers.js` - Added dropdown endpoint
-   `csn-city-backend/routes/police-station-routes.js` - Added new route
-   `csn-city-backend/app.js` - Updated CORS configuration

### Frontend Files

-   `csn-city-frontend/src/hooks/usePoliceStations.ts` - New hook for API calls
-   `csn-city-frontend/src/components/PoliceStationDropdown.tsx` - New dropdown component
-   `csn-city-frontend/src/app/police-station/[id]/page.tsx` - New dynamic route
-   `csn-city-frontend/src/components/navbar.tsx` - Added dropdown to navbar

## Testing

### 1. Backend API Test

Run the test script to verify API endpoints:

```bash
node test-police-stations.js
```

### 2. Browser Test

Open `test-api.html` in a browser to test the API endpoints visually.

### 3. Frontend Test

1. Start the frontend development server
2. Navigate to the website
3. Check if the "Police Stations" dropdown appears in the navbar
4. Click on the dropdown to see the list of stations
5. Click on any station to navigate to its detail page

## API Endpoints

### Get Stations for Dropdown

```
GET https://csn.dreamcaredevelopers.com/api/stations-dropdown
```

Response:

```json
{
	"success": true,
	"stations": [
		{
			"_id": "68d8eee47dcb656e26498ec4",
			"name": "City Chowk Police Station",
			"name_in_marathi": "शहर चौक पोलिस स्टेशन",
			"address": "city chowk bus stop, post office road, Sambhajinagar. 431001",
			"address_in_marathi": "सिटी चौक बस स्टॉप, पोस्ट ऑफिस रोड, संभाजीनगर – ४३१००१",
			"contact_no": "9226514024",
			"email": "ps.citychowk.abad@mahapolice.gov.in",
			"zone": {
				"name": "Zone Name",
				"name_in_marathi": "झोन नाव"
			},
			"division": {
				"name": "Division Name",
				"name_in_marathi": "विभाग नाव"
			}
		}
	]
}
```

### Get Station Details

```
GET https://csn.dreamcaredevelopers.com/api/station-detail?id={stationId}
```

Response:

```json
{
  "success": true,
  "station": {
    "_id": "68d8eee47dcb656e26498ec4",
    "name": "City Chowk Police Station",
    "name_in_marathi": "शहर चौक पोलिस स्टेशन",
    "address": "city chowk bus stop, post office road, Sambhajinagar. 431001",
    "address_in_marathi": "सिटी चौक बस स्टॉप, पोस्ट ऑफिस रोड, संभाजीनगर – ४३१००१",
    "contact_no": "9226514024",
    "email": "ps.citychowk.abad@mahapolice.gov.in",
    "zone": { ... },
    "division": { ... },
    "region": { ... }
  },
  "officers": [ ... ]
}
```

## Environment Variables

Set the following environment variable in your frontend:

```
NEXT_PUBLIC_BACKEND_URL=https://csn.dreamcaredevelopers.com
```

## Troubleshooting

### Common Issues

1. **CORS Error**: Make sure the backend CORS configuration includes your domain
2. **API Not Found**: Verify the backend is running and routes are properly configured
3. **No Data**: Check if the database has police station records
4. **Network Error**: Verify the backend URL is correct and accessible

### Debug Steps

1. Check browser console for errors
2. Test API endpoints directly using curl or Postman
3. Verify database connection and data
4. Check network tab in browser dev tools

## Future Enhancements

1. Add search functionality to the dropdown
2. Add filters by zone/division
3. Add station photos to the dropdown
4. Add map integration for station locations
5. Add officer information to station detail pages
