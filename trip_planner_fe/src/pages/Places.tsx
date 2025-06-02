import Sidebar from "../components/sidebar.tsx";
import PlacesInput from "../components/placesInput.tsx";
import {useState} from "react";
import {InputAutocomplete} from "../types/inputComplete.ts";

import "../css/places.css"

export default function Places() {
    const [input, setInput] = useState<InputAutocomplete|null>(null)

    return(
        <>
        <Sidebar />
        <div className="places-wrapper">
            <h1>Erhalte Vorschläge für deinen nächsten Reiseort</h1>
            <PlacesInput setInput={setInput} input={input}/>
        </div>
        </>

    )
}