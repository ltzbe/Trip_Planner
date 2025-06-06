export default function YNPopup ({text, setStateToClear, funcToExec}) {

  return(
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{text}</h2>
        <div className="popup-buttons">
          <button onClick={() => setStateToClear(null)}>Nein</button>
          <button onClick={() => {
            funcToExec()
            setStateToClear(null)
            }
          }>
            Ja
          </button>
        </div>
      </div>
    </div>
  )
}