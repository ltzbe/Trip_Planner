export interface InputAutocomplete {
    type: "Feature";
    bbox?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
    geometry: {
        type: "Point";
        coordinates: [number, number]; // [lng, lat]
    };
    properties: {
        formatted: string;
        address_line1?: string;
        address_line2?: string;
        city?: string;
        state?: string;
        country?: string;
        country_code?: string;
        postcode?: string;
        street?: string;
        housenumber?: string;
        lat?: number;
        lon?: number;
        [key: string]: any;
    };
}
