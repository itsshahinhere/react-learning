import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setrestaurantList] = useState([]);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0843007&lng=80.2704622&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    //used optional chaining - recommended:
    setrestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (restaurantList.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
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
      <div className="res-container">
        {restaurantList.map((data) => {
          return <RestaurantCard key={data.info.id} resData={data} />;
        })}
      </div>
    </div>
  );
};

export default Body;
