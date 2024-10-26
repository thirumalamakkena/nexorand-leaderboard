import './index.css';
const HistoryModal = ({ history, onClose }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>History</h2>
          </div>
          <div className="history-container">
            <ul className="history">
              {history.map((data, index) => (
                <li key={index} className="history-item">
                  <p>Date: {data.date}</p>
                  <p>Points Awarded: {data.pointsAwarded}</p>
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
};

export default HistoryModal;
