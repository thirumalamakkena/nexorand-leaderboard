import { MdOutlinePersonOutline } from "react-icons/md";
import "./index.css";

const DashboardPointsItem = (props) => {
  const { data, index, onClaimingPoints } = props;
  const { username, points } = data;
  const onClickName = () => {
    onClaimingPoints(data.username);
  };

  return (
    <li className="points-container">
      <div className="point-container-rank">
        <MdOutlinePersonOutline className="person-icon" />
        <div>
          <button className="claim-points-btn" onClick={onClickName}>
            {username}
          </button>
          <p> Rank: {index + 1}</p>
        </div>
      </div>

      <p className="price">Price: ₹{points}</p>
      <p className="points"> {points} </p>
    </li>
  );
};

export default DashboardPointsItem;
