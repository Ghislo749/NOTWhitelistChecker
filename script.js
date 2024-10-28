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
              wlSpots = `You have ${entry.spots} whitelist spot(s).`;
              createConfetti(); // Trigger confetti animation
              break;
          }
      }

      result.textContent = wlSpots;
  } catch (error) {
      result.textContent = "Error checking whitelist. Please try again.";
      console.error(error);
  }
}

function createConfetti() {
  const confettiCount = 100;
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti');

  for (let i = 0; i < confettiCount; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.classList.add('confetti-piece');
      confettiPiece.style.width = `${Math.random() * 10 + 5}px`;
      confettiPiece.style.height = `${Math.random() * 10 + 5}px`;
      confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confettiPiece.style.position = 'absolute';
      confettiPiece.style.left = `${Math.random() * 100}%`;
      confettiPiece.style.top = `${Math.random() * 100}%`;
      confettiPiece.style.opacity = '0.8';
      confettiContainer.appendChild(confettiPiece);
  }

  document.body.appendChild(confettiContainer);

  setTimeout(() => {
      confettiContainer.remove();
  }, 1000);
}

document.getElementById("checkButton").addEventListener("click", checkWhitelist);
