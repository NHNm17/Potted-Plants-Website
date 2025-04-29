function LoyaltyPoints() {
  const points = 1250;
  const tier = "Gold";

  return (
    <div>
      <h2>Loyalty Points</h2>
      <div className="points-container">
        <div className="points-card">
          <h1>⭐</h1>
          <h2>{points}</h2>
          <p>Available Points</p>
        </div>
        <div className="points-card">
          <h2>{tier} Member</h2>
          <p>250 points until next tier</p>
        </div>
      </div>
    </div>
  );
}

export default LoyaltyPoints;