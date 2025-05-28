// export interface RouteFeatureProperties {
//     distance: number; // meters
//     time: number;     // seconds
//     [key: string]: any; // optionally allow other dynamic keys
// }
//
// export interface RouteFeature {
//     type: string;
//     geometry: {
//         type: string;
//         coordinates: number[][];
//     };
//     properties: RouteFeatureProperties;
// }
//
// export interface RouteDetails {
//     type: "FeatureCollection";
//     features: RouteFeature[];
// }

import { Feature, FeatureCollection, LineString } from "geojson";

export interface RouteFeatureProperties {
    distance: number; // in meters
    time: number;     // in seconds
    [key: string]: any;
}

export type RouteFeature = Feature<LineString, RouteFeatureProperties>;

export interface RouteDetails extends FeatureCollection<LineString, RouteFeatureProperties> {
    features: RouteFeature[];
}