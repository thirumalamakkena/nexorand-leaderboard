import { Component } from "react";
import Header from "../Header";
import DashboardPointsItem from "../DashboardPointsItem";
import POPUP from "../POPUP";
import { MdOutlinePersonOutline } from "react-icons/md";

import HistoryModal from "../HistoryModal";

import "./index.css";
import Button from "../Button";

const btnData = [
  "Daily", "Weekly", "Monthly"
];

class Home extends Component {
  state = {
    dashboardData: [],
    message: "",
    showNotification: false,
    isModalVisible: false,
    history: [],
    currentReport: "daily",
  };

  sortedData = (data) => {
    return data.sort((a, b) => b.points - a.points);
  };

  getHistory = async (username) => {
    const url = "http://localhost:7000/api/user/v1/your-history";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    this.setState({ history: data.data });
  };

  openModal = async (usr) => {
    await this.getHistory(usr);
    this.setState({ isModalVisible: true });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  componentDidMount() {
    this.handleDashboardData();
  }

  onClaimingPoints = async (username) => {
    const url = "http://localhost:7000/api/user/v1/claim-points";
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.success) {
      this.handleDashboardData();
      this.setState({ message: result.message, showNotification: true });
      setTimeout(() => {
        this.setState({ showNotification: false });
      }, 3000);
    }

    this.openModal(username);
  };

  handleDashboardData = async () => {
    const url = "http://localhost:7000/api/user/v1/get-users";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const topTen = this.sortedData(data.data).slice(0, 10);

    const updatedData = topTen.map((item) => {
      const { username, Points } = item;
      return {
        username,
        points: Points,
        price: Points,
      };
    });

    this.setState({ dashboardData: updatedData });
  };

  getDWMHistory = async (report) => {
    console.log(report);
    const url = `http://localhost:7000/api/user/v1/your-${report}-history`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();

    const reportData = data.data.map((item) => {
      const { _id, totalPointsAwarded } = item;
      return {
        username: _id,
        points: totalPointsAwarded,
        price: totalPointsAwarded,
      };
    });
    this.setState({ dashboardData: this.sortedData(reportData) });
  };

  onChangeReport = (e) => {
    this.setState({ currentReport: e.target.innerText.toLowerCase() });
    this.getDWMHistory(e.target.innerText.toLowerCase());
  };

  render() {
    const {
      dashboardData,
      message,
      showNotification,
      isModalVisible,
      history,
      currentReport,
    } = this.state;

    return (
      <>
        <Header />
        <div className="app-container">
          <div className="dashboard-container">
            <div className="dashboard-header-container">
              <p className="dashboard-header-heading">Welcome, User</p>
              <div className="container">
                <p className="leaderboard-heading">Leaderboard</p>
                <MdOutlinePersonOutline className="person-icon" />
              </div>
            </div>
            <div className="w-m-d-reports-btn-container">
                {btnData.map((item) => (
                  <Button key={item} data={item} currentReport={currentReport} onChangeReport={this.onChangeReport} />
                ))}
            </div>
            <div className="dashboard-toppers-container">
              <ul className="dashboard-toppers">
                {dashboardData.slice(0, 3).map((data, index) => (
                  <li key={data.username} className="topper-container">
                    <p>{data.username}</p>
                    <p>{data.points}</p>
                    <p className="topper-price">Price: ₹{data.points}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dashboard-points-container">
              <ul className="dashboard-points">
                {dashboardData.map((data, index) => (
                  <DashboardPointsItem
                    key={data.firstName}
                    data={data}
                    index={index}
                    onClaimingPoints={this.onClaimingPoints}
                  />
                ))}
              </ul>
            </div>
          </div>
          {isModalVisible && (
            <HistoryModal history={history} onClose={this.closeModal} />
          )}
          {showNotification && <POPUP message={message} />}
        </div>
      </>
    );
  }
}

export default Home;
