import React, {useContext, createContext} from "react";
import maplibregl from "maplibre-gl";

type MapContextType = {
    map: maplibregl.Map | null;
    setMap: (map: maplibregl.Map) => void;
};

const MapContext = createContext<MapContextType | undefined> (undefined);


export const useMap = (): MapContextType => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
};

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [map, setMap] = React.useState<maplibregl.Map | null>(null);

    return (
        <MapContext.Provider value={{ map, setMap }}>
            {children}
        </MapContext.Provider>
    );
};