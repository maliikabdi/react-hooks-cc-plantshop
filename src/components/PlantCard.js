import React from "react";

function PlantCard({ plant, onUpdatePlant, onDelete}) {
  // Destructuring plant object to access its properties
  const { name, image, price, soldout } = plant;

  const handleSoldOutClick = () => {
    onUpdatePlant({ ...plant, soldout: !soldout });
  }

  return (
    <li className="card" data-testid="plant-item">
      {/* Use dynamic values for image and text */}
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
