import React from "react";
import glamorous from "glamorous";
import { FormContainer } from "../register_modal/reg_forms_styles";

// export const CheckBoxWrapper = glamorous.fieldset({
//   margin: "3% 0",
//   border: "1px solid white",
//   borderRadius: "5px"
// });

export const CheckBoxContainer = glamorous.div({
  padding: "40px",
  margin: "7%",
  border: "3px solid white",
  color: "black",
  backgroundColor: "#fff",
  boxShadow: "0 10px 6px -6px #777",
  borderRadius: "5px",
  textAlign: "center"
});

export const CheckBox = glamorous.div({
  fontSize: "18px"
});

export const CheckBoxes = glamorous.div({
  display: "flex",
  justifyContent: "center"
});

const userNotification = () => {
  return (
    //<CheckBoxWrapper>

    <CheckBoxContainer>
      <h3>Communication Preferences</h3> 
      <CheckBoxes>
        <CheckBox>
          <div className="pretty p-default">
            <input type="checkbox" />
            <div className="state p-primary">
              <label>Email</label>
            </div>
          </div>
        </CheckBox>

        <CheckBox>
          <div className="pretty p-default">
            <input type="checkbox" />
            <div className="state p-warning">
              <label>Text</label>
            </div>
          </div>
        </CheckBox>
      </CheckBoxes>
    </CheckBoxContainer>

    //</CheckBoxWrapper>
  );
};
export default userNotification;
