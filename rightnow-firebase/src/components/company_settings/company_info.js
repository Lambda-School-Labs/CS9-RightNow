import React, { Component } from "react";
import glamorous from "glamorous";

const CompanyInput = glamorous.input({
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  boxSizing: "border-box",
  border: "none",
  borderBottom: "2px solid red",
  fontSize: "32px"
});

class CompanyInfo extends Component {
  render() {
    return (
      <Container>
        <ContactTitle>Profile Information</ContactTitle>

        <LeftSide>
          <Label for="test">Business Name</Label>
          <InputField
            type="text"
            name="businessName"
            value={this.state.businessName}
            onChange={this.onInputChange}
            placeholder="enter here"
          />
          <Label>Business Address</Label>
          <InputField
            name="businessAddress"
            value={this.state.businessAddress}
            onChange={this.onInputChange}
            type="text"
            placeholder="enter here"
          />
          <Label>Phone Number</Label>
          <InputField
            name="phone"
            value={this.state.phone}
            onChange={this.onInputChange}
            type="text"
            placeholder="enter here"
          />
          <Label>Email</Label>
          <InputField
            name="email"
            type="text"
                    value={this.state.email}
                    
            onChange={this.onInputChange}
            placeholder="enter here"
          />
          <Label>Name</Label>
          <InputField
            name="fullName"
            type="text"
            value={this.state.fullName}
            onChange={this.onInputChange}
            placeholder="enter here"
          />
        </LeftSide>
      </Container>
    );
  }
}

export default CompanyInfo;
