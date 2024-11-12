import React, { useState, useEffect } from "react";
import Header from "./Header";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import PlantList from "./PlantList";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://react-hooks-cc-plantshop-10-db3r.onrender.com/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => {

        setPlants([]); // Set plants to an empty array if fetch fails
      });
  }, []);
  console.log(plants);

  function handleDelete(plantId) {
    fetch(`https://react-hooks-cc-plantshop-10-db3r.onrender.com/plants`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== plantId));
        } else {
          console.error("Error deleting plant");
        }
      })
      .catch((error) => console.error("Error deleting plant:", error));
  }

  function addPlant(newPlant) {
    fetch("https://react-hooks-cc-plantshop-10-db3r.onrender.com/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((addedPlant) => setPlants((prevPlants) => [...prevPlants, addedPlant]))
      .catch((error) => console.error("Error adding new plant:", error));
  }

  function updatePlant(updatedPlant) {
    fetch(`https://react-hooks-cc-plantshop-10-db3r.onrender.com/plants/${updatedPlant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ soldOut: updatedPlant.soldOut }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === data.id ? { ...plant, soldOut: data.soldOut } : plant
          )
        );
      })
      .catch((error) => console.error("Error updating plant:", error));
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
      <PlantList plants={filteredPlants} onUpdatePlant={updatePlant} onDelete={handleDelete} />
    </div>
  );
}

export default PlantPage;
