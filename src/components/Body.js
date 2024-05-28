import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setrestaurantList] = useState([]); //dont modify but can be used to loop when modifying
  const [filteredRestaurant, setFilteredRestaurant] = useState([]); //to modify and use in search results

  const [searchText, setsearchText] = useState(""); //for search keywords

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0843007&lng=80.2704622&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    //used optional chaining - recommended:
    setrestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(restaurantList);
  if (restaurantList.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="buttons">
        <div className="search-func">
          <input
            type="text"
            className="search-box"
            placeholder="Enter the text here"
            value={searchText}
            onChange={(e) => setsearchText(e.target.value)}
          />
          <button
            className="search"
            onClick={() => {
              const filterSearch = restaurantList.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filterSearch);
            }}
          >
            Search
          </button>
        </div>
        <div className="filter-btn">
          <button
            className="filter"
            onClick={() => {
              const filtereddata = restaurantList.filter(
                (res) => res.info.avgRating > 3.9
              );
              setrestaurantList(filtereddata);
            }}
          >
            4+ ⭐ Hotels
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((data) => {
          return <RestaurantCard key={data.info.id} resData={data} />;
        })}
      </div>
    </div>
  );
};

export default Body;
