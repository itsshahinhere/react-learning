import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, areaName } =
    resData?.info;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="food pic"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
