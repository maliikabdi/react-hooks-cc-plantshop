import React from "react";

function Header() {
  return (
    <header>
      <h1>
        Plantsy
        <span className="logo" role="img">
          🌱
        </span>
      </h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/new-plant">Add New Plant</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
