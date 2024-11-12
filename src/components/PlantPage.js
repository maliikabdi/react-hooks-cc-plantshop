import React, { useState, useEffect } from "react";
import Header from "./Header";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import PlantList from "./PlantList";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://react-hooks-cc-plantshop-7-hfln.onrender.com/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  function handleDelete(plantId) {
    // Send DELETE request to the server
    fetch(`https://react-hooks-cc-plantshop-7-hfln.onrender.com/plants/${plantId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update the state by filtering out the deleted plant
        setPlants(plants.filter((plant) => plant.id !== plantId));
      });
  }




  function addPlant(newPlant) {
    fetch("https://react-hooks-cc-plantshop-7-hfln.onrender.com/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((addedPlant) => setPlants([...plants, addedPlant]));
  }


  function updatePlant(updatedPlant) {
    // Update the backend to mark the plant as "sold out"
    fetch(`https://react-hooks-cc-plantshop-7-hfln.onrender.com/plants/${updatedPlant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ soldout: updatedPlant.soldout }),
    })
      .then((response) => response.json())
      .then((data) =>
        setPlants(
          plants.map((plant) =>
            plant.id === data.id ? { ...plant, soldout: data.soldout } : plant
          )
        )
      );
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="plant-page">
      <Header />
      <NewPlantForm addPlant={addPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onUpdatePlant={updatePlant}  onDelete={handleDelete} />
    </div>
  );
}

export default PlantPage;
