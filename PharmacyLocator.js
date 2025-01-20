import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

function PharmacyLocator() {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  // Predefined pharmacies data with real locations
  const predefinedPharmacies = [
    {
      id: "1",
      name: "CVS Pharmacy",
      lat: 40.758896, // Times Square, Manhattan
      lng: -73.985130,
      address: "1515 Broadway, New York, NY 10036"
    },
    {
      id: "2",
      name: "Rite Aid Pharmacy",
      lat: 40.712776, // Downtown Manhattan
      lng: -74.005974,
      address: "67 Wall St, New York, NY 10005"
    },
    {
      id: "3",
      name: "Walgreens",
      lat: 40.730610, // East Village, Manhattan
      lng: -73.935242,
      address: "230 E 14th St, New York, NY 10003"
    },
    {
      id: "4",
      name: "Pharmacy at Montefiore",
      lat: 40.869635, // The Bronx
      lng: -73.877186,
      address: "111 E 210th St, Bronx, NY 10467"
    },
    {
      id: "5",
      name: "Duane Reade",
      lat: 40.709158, // Brooklyn
      lng: -73.942226,
      address: "200 Livingston St, Brooklyn, NY 11201"
    },
    {
      id: "6",
      name: "CVS Pharmacy",
      lat: 40.930630, // Westchester
      lng: -73.794853,
      address: "3000 Westchester Ave, White Plains, NY 10601"
    }
  ];

  // Combine predefined pharmacies with fetched pharmacies
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        fetchNearbyPharmacies(location);
      }, (error) => {
        console.log("Error getting user location: ", error);
        setError("Unable to fetch your location.");
      });
    }
  }, []);

  // Fetch pharmacies near the user's current location
  const fetchNearbyPharmacies = async (location) => {
    const apiKey = "AIzaSyC009VqE8xaYDDTzGDQnND2JLxX3xyE6OM"; // Replace with your API Key
    const radius = 10000; // 10km
    const type = "pharmacy";

    
  };

  // Combine the predefined pharmacies with fetched pharmacies
  const allPharmacies = [...predefinedPharmacies, ...pharmacies];

  // Filter pharmacies based on the search query
  const filteredPharmacies = allPharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for a pharmacy"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '5px',  // Smaller padding
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '50%',    // Reduced width
          maxWidth: '300px', // Max width for responsiveness
          marginLeft: 'auto', // Center align the search bar
          marginRight: 'auto', // Center align the search bar
        }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <LoadScript googleMapsApiKey="AIzaSyC009VqE8xaYDDTzGDQnND2JLxX3xyE6OM">
        <GoogleMap 
          center={userLocation || { lat: 40.73061, lng: -73.935242 }} 
          zoom={12} 
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          {/* Markers for pharmacies */}
          {filteredPharmacies.map((pharmacy) => (
            <Marker
              key={pharmacy.id}
              position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
              onClick={() => setSelectedPharmacy(pharmacy)}
            />
          ))}

          {/* Info window for selected pharmacy */}
          {selectedPharmacy && (
            <InfoWindow
              position={{ lat: selectedPharmacy.lat, lng: selectedPharmacy.lng }}
              onCloseClick={() => setSelectedPharmacy(null)}
            >
              <div>
                <h2>{selectedPharmacy.name}</h2>
                <p>{selectedPharmacy.address}</p>
              </div>
            </InfoWindow>
          )}

          {/* Marker for user's current location */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
                scaledSize: { width: 30, height: 30 },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default PharmacyLocator;








