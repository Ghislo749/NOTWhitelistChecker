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

// Function to create confetti
function createConfetti(x, y) {
  const confettiCount = 100; 
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti');

  for (let i = 0; i < confettiCount; i++) {
      const confettiPiece = document.createElement('div');
      confettiPiece.classList.add('confetti-piece');

      // Set random properties for each confetti piece
      const size = Math.random() * 10 + 5; 
      confettiPiece.style.width = `${size}px`;
      confettiPiece.style.height = `${size}px`;
      confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; 

      // Set position based on click coordinates
      confettiPiece.style.position = 'absolute';
      confettiPiece.style.left = `${x}px`;
      confettiPiece.style.top = `${y}px`;

      // Randomize the animation properties
      const angle = Math.random() * 360; 
      const duration = Math.random() * 3 + 2; 

      // Apply animations for falling and drifting
      confettiPiece.style.animation = `explode ${duration}s forwards, fall ${duration}s ease-in forwards`;
      confettiPiece.style.transform = `rotate(${angle}deg)`;

      // Add random horizontal movement to simulate drifting
      confettiPiece.style.animation += `, drift ${duration}s ease-in-out infinite`;

      confettiContainer.appendChild(confettiPiece);
  }

  document.body.appendChild(confettiContainer);

  // Remove the confetti container after some time
  setTimeout(() => {
      confettiContainer.remove();
  }, 5000); 
}

// Add click event listener to create confetti
document.addEventListener('click', (event) => {
  createConfetti(event.clientX, event.clientY);
});
