import React from "react";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
  required,
  // pattern="\CAR\-\d{3}\-((\d{2}(([02468][048])|([13579][26]))[\/\s-]?((((0?[13578])|(1[02]))[\/\s-]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\/\s-]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\/\s-]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\/\s-]?((((0?[13578])|(1[02]))[\/\s-]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\/\s-]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\/\s-]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[1-9]|(1[0-2])):([0-5][0-9])((\s)|(:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?\-\d{11}"
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder || label}
      name={name}
      id={name}
      className={"form-control" + (error && " is-invalid")}
      required={required}

      // pattern={pattern}
    />
    {error && <p className="invalid-feedback">{error}</p>}
  </div>
);

export default Field;
