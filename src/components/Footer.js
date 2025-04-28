import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer text-white text-center " >
      <div
        className={`text-center p-3 w-100 position-${props.position} ` } style={{background:"#0D1321"}}
        
      >
        © 2024 Copyright:
        <a className="text-body " href="http://localhost:3000/">
          News-Top Headlines
        </a>
      </div>
    </footer>
  );
}
