import './App.css';

function App() {
  const bookSlot = () => {
    alert("Redirecting to booking page...");
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="header">
        <h1 className="app-name">Bowl-Me</h1>
      </header>

      {/* Welcome Message */}
      <div className="welcome-message">
        <h2>Welcome to Bowl-Me!</h2>
        <p>
          Your one-stop platform to easily book bowling slots and enjoy the game, hassle-free. 🎳 
          Let's get rolling!
        </p>
      </div>

      {/* Book a Slot Button */}
      <div className="footer">
        <button className="book-button" onClick={bookSlot}>Book a Slot</button>
      </div>
    </div>
  );
}

export default App;
