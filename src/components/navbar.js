// import React from "react";

// const navbar = () => {
//   return (
//     <nav>
//       <div className="logo">F</div>
//       <ul>
//         <li>
//           <a href="#sayhello">Say Hello!</a> {/* Link to the landing section */}
//         </li>
//         <li>
//           <a href="#collections">My Collections</a>
//         </li>
//         <li>
//           <a href="#aboutme">About Me</a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">F</div>
      <ul>
        <li>
          <Link to="/portfolio">Say Hello!</Link>
        </li>
        <li>
          <Link to="/portfolio/collections">My Collections</Link>
        </li>
        <li>
          <Link to="/portfolio/about">About Me</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;