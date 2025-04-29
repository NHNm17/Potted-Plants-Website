import { useState } from 'react';

function PaymentOptions() {
  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: '**** **** **** 1234',
      cardHolder: 'John Doe',
      expiryDate: '12/25'
    }
  ]);

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div>
      <h2>Payment Options</h2>
      <button className="btn">Add New Card</button>
      
      <div style={{ marginTop: '2rem' }}>
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h3>💳 {card.cardNumber}</h3>
            <p>{card.cardHolder}</p>
            <p>Expires: {card.expiryDate}</p>
            <button className="btn" onClick={() => handleDelete(card.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentOptions;