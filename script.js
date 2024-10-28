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
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2; 
        const y = rect.top + rect.height / 2;  

        createConfetti(x, y);
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
  const confettiCount = 100; // Number of confetti pieces
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti');

  for (let i = 0; i < confettiCount; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');

    // Set random properties for each confetti piece
    const size = Math.random() * 10 + 5; // Random size between 5px and 15px
    confettiPiece.style.width = `${size}px`;
    confettiPiece.style.height = `${size}px`;
    confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color

    // Set position based on click coordinates
    confettiPiece.style.position = 'absolute';
    confettiPiece.style.left = `${x}px`;
    confettiPiece.style.top = `${y}px`;

    // Randomize movement direction and distance
    const angle = Math.random() * 360; // Random angle for rotation
    const distance = Math.random() * 100 + 50; // Random distance for explosion
    const duration = Math.random() * 2 + 3; // Random duration between 3s and 5s

    // Set movement using transform
    confettiPiece.style.transform = `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${angle}deg)`;

    // Apply animations for falling and drifting
    confettiPiece.style.animation = `fall ${duration}s ease-in forwards, drift ${duration}s ease-in-out infinite`;

    confettiContainer.appendChild(confettiPiece);
  }

  document.body.appendChild(confettiContainer);

  // Remove the confetti container after some time
  setTimeout(() => {
    confettiContainer.remove();
  }, 5000); // Keep confetti on screen for 5 seconds
}