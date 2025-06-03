const apiKey = import.meta.env.VITE_GEO_API_KEY_2

export function createFuelMarker(): HTMLElement {
  const icon = document.createElement("div");
  icon.className = "fuel-marker";
  icon.style.width = "40px";
  icon.style.height = "40px";
  icon.style.backgroundImage = `url(https://api.geoapify.com/v2/icon/?type=material&color=%232b9dff&size=35&icon=gas-pump&iconType=awesome&contentSize=15&scaleFactor=2&apiKey=${apiKey})`;
  icon.style.backgroundSize = "contain";
  icon.style.backgroundRepeat = "no-repeat";
  icon.style.backgroundPosition = "center";

  return icon;
}

export function createHotelMarker(){
  const icon = document.createElement("div");
  icon.className = "fuel-marker";
  icon.style.width = "40px";
  icon.style.height = "40px";
  icon.style.backgroundImage = `url(https://api.geoapify.com/v2/icon/?type=material&color=%2329ac0b&size=42&icon=bed&iconType=awesome&contentSize=15&scaleFactor=2&apiKey=${apiKey})`;
  icon.style.backgroundSize = "contain";
  icon.style.backgroundRepeat = "no-repeat";
  icon.style.backgroundPosition = "center";

  return icon;
}
