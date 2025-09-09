import { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"]; // load the Places library

const LocationInput = ({ value, onChange }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const inputRef = useRef();

    const onLoad = (autoC) => {
        setAutocomplete(autoC);
    };

    const place = autocomplete.getPlace();
    if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onChange({
            address: place.formatted_address,
            lat,
            lng
        });
    }


    return (
        <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
        >
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search Safe Location"
                    value={value}
                    onChange={(e) => onChange(e.target.value)} // still update while typing
                    className="form-input"
                />
            </Autocomplete>
        </LoadScript>
    );
};

export default LocationInput;
