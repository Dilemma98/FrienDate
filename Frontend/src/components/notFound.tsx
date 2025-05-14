import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center py-16 max-w-5xl mx-auto px-6">
          <h1 className="componentHeader text-[#562f39] text-5xl font-bold  drop-shadow-sm">
            404 - Page not found
          </h1>
          <p className="text-lg text-[#562f39] mt-4">
            Vi kunde inte hitta sidan du letade efter.
          </p>
        </div>
      </div>
    );
  }
}

export default NotFound;
