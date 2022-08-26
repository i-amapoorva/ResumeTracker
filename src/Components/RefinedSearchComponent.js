import React from "react";
import { Button, Input, Select } from "antd";

function RefinedSearchComponent() {
  return (
    <div className="searchbar-container">
      <Select className="search-search" placeholder="Location"></Select>
      <Select className="search-search" placeholder="Key Skills"></Select>
      <Select className="search-search" placeholder="Notice Period"></Select>

      <Input className="search-input" placeholder="Exp in Year's" />
      <Input className="search-input" placeholder="Exp in Month's" />

      <Input className="search-input" placeholder="Exp in Year's" />
      <Input className="search-input" placeholder="Exp in Month's" />

      <Button className="search-btn">Search</Button>
    </div>
  );
}

export default RefinedSearchComponent;
