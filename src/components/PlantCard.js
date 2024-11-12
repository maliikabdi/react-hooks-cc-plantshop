import React from "react";

function PlantCard({ plant, onUpdatePlant, onDelete }) {
  const { name, image, price, soldout } = plant;

  const handleSoldOutClick = () => {
    onUpdatePlant({ ...plant, soldout: !soldout }); // Toggle soldout status
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>
      {soldout ? (
        <button onClick={handleSoldOutClick}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleSoldOutClick}>In Stock</button>
      )}
      <button onClick={() => onDelete(plant.id)}>Delete</button>
    </li>
  );
}

export default PlantCard;
