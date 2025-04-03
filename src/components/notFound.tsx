import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="text-center py-16 bg-[#fcefef]">
        <h1 className="componentHeader text-[#b66c6d] text-4xl font-bold">
          404 - Page not found
        </h1>
        <p className="text-lg text-[#562f39] mt-4">
          Vi kunde inte hitta sidan du letade efter.
        </p>
      </div>
    );
  }
}

export default NotFound;
