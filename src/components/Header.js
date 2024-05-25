//Header Component
const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={require("../../image/logo.png")} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Cart</li>
          <li>About us</li>
          <li>Contact us</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
