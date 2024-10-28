async function checkWhitelist() {
  const address = document.getElementById("addressInput").value.trim();
  const result = document.getElementById("result");

  if (!address) {
      result.textContent = "Please enter an address.";
      return;
  }

  try {
      const response = await fetch("whitelist.json");
      const data = await response.json();

      let wlSpots = "no wl for this address";

      for (let entry of data) {
          if (entry.address === address) {
              wlSpots = `You have ${entry.count} whitelist spot(s).`;              
              break;
          }
      }

      result.textContent = wlSpots;
  } catch (error) {
      result.textContent = "Error checking whitelist. Please try again.";
      console.error(error);
  }
}
