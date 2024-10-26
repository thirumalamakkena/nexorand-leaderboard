import './index.css';

const POPUP = (props) => {
  const {message} = props;  
  return (
    <div>
        <div className="notification">
          <img src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png" alt="success" className='success-image'/>
          <span>{message}</span>
          <div className="progress-bar"></div>
        </div>
    </div>
  );
};

export default POPUP;
