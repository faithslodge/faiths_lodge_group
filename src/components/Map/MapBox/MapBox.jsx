import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapBox = ({ orgList }) => {
  // Set the initial position and zoom level of the map
  const position = ["44.985", "-93.25"]; // Coordinates for London
  const zoom = 4;

  console.log(orgList);

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={position}>
        <Popup>
          Organization Name <br /> Link to Org Details
        </Popup>
      </Marker> */}
      {orgList.map((org) => (
        <Marker key={org.id} position={[org?.latitude, org?.longitude]}>
          <Popup>
            {org.name} <br /> Link to Org Details
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapBox;
