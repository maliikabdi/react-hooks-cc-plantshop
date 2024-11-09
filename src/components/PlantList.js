import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onUpdatePlant, onDelete }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <li key={plant.id}>
        <PlantCard plant={plant} onUpdatePlant={onUpdatePlant} onDelete={onDelete} />

        </li>
      ))}

      </ul>
  );
}

export default PlantList;
