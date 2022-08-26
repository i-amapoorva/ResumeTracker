import React from "react";
import { Button, Input, Select } from "antd";
const { Option } = Select;

function RefinedSearch() {
  return (
    <div>
      <div className="searchbar-container">
        <Select className="search-select" placeholder="Location" style={{margin:"4px"}}>
          <Option value="banglore">Banglore</Option>
          <Option value="pune">Pune</Option>
          <Option value="hydrabad">Hydrabad</Option>
          <Option value="mumbai">Mumbai</Option>
          <Option value="kolkata">Kolkata</Option>
        </Select>
        <Select
          mode="multiple"
          className="search-select search-boxsize"
          placeholder="key Skills..."
          style={{margin:"5px"}}
        >
          <Option value="java">Java</Option>
          <Option value="php">PHP</Option>
          <Option value="node js">Node Js</Option>
          <Option value="react js">React Js</Option>
        </Select>
        <Select className="search-select" placeholder="Notice period" style={{margin:"4px"}}>
          <Option value="less than 30days">Less than 30days</Option>
          <Option value="less than 45days">Less than 45days</Option>
          <Option value="less than 60days">Less than 60days</Option>
        </Select>
        <Select
          className="search-select search-boxsize"
          placeholder="CTC(Min-Max)"
          style={{margin:"4px"}}
        >
          <Option value="0 - 3 lakhs">Less than 3 lakhs</Option>
          <Option value="3 - 4 lakhs">3 - 4 lakhs</Option>
          <Option value="4 - 5 lakhs">4 - 5 lakhs</Option>
          <Option value="5 - 6 lakhs">5 - 6 lakhs</Option>
          <Option value="6 - 7 lakhs">6 - 7 lakhs</Option>
        </Select>
        <Select
          className="search-select search-boxsize"
          placeholder="Experince"
          style={{margin:"4px"}}
        >
          <Option value="0 - 1years">Less than 1years</Option>
          <Option value="1 - 2years">1 - 2years</Option>
          <Option value="2 - 3years">2 - 3years</Option>
          <Option value="3 - 4years">3 - 4years</Option>
          <Option value="4 - 5years">4 - 5years</Option>
        </Select>
        <Button className="search-btn " style={{margin:"4px"}}>SEARCH</Button>
      </div>
      {/* <div className="searchbar-container">
        <Select className="search-select" placeholder="Exp in years" />
        <Select className="search-select" placeholder="Exp in Month" />
        <Select className="search-select" placeholder="CTC " /> 
        <Select className="search-select" placeholder="CTC in Thausand" />
        
        <Button className="search-btn">SEARCH</Button>
      </div> */}
    </div>
  );
}

export default RefinedSearch;
