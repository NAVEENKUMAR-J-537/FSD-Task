import React, { useState } from "react";
import axios from "axios";
import "./EmployeeForm.css";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeID: "",
    email: "",
    phoneNumber: "",
    age: "",
    address: "",
    gender: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.employeeID || formData.employeeID.length > 10)
      errors.employeeID = "Invalid Employee ID";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid Email";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Invalid Phone Number";
    if (!formData.age || formData.age < 18 || formData.age > 65)
      errors.age = "Age must be between 18 and 65";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.department) errors.department = "Department is required";
    if (new Date(formData.dateOfJoining) > new Date())
      errors.dateOfJoining = "Future dates not allowed";
    if (!formData.role) errors.role = "Role is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        formData
      );
      setSuccess(response.data.message);
      setError({});
    } catch (err) {
      setSuccess("");
      setError({ global: err.response?.data?.message || "Submission failed" });
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {error.name && <p className="error">{error.name}</p>}

      <input
        type="text"
        placeholder="Employee ID"
        value={formData.employeeID}
        onChange={(e) =>
          setFormData({ ...formData, employeeID: e.target.value })
        }
      />
      {error.employeeID && <p className="error">{error.employeeID}</p>}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {error.email && <p className="error">{error.email}</p>}

      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      />
      {error.phoneNumber && <p className="error">{error.phoneNumber}</p>}

      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      {error.age && <p className="error">{error.age}</p>}

      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      {error.address && <p className="error">{error.address}</p>}

      <select id="gender"
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      {error.gender && <p className="error">{error.gender}</p>}

      <input
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) =>
          setFormData({ ...formData, department: e.target.value })
        }
      />
      {error.department && <p className="error">{error.department}</p>}

      <input
        type="date"
        value={formData.dateOfJoining}
        onChange={(e) =>
          setFormData({ ...formData, dateOfJoining: e.target.value })
        }
      />
      {error.dateOfJoining && <p className="error">{error.dateOfJoining}</p>}

      <input
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      />
      {error.role && <p className="error">{error.role}</p>}

      <button type="submit">Submit</button>
      <button type="reset" onClick={() => setFormData({})}>
        Reset
      </button>
      {success && <p className="success">{success}</p>}
      {error.global && <p className="error">{error.global}</p>}
    </form>
  );
};

export default EmployeeForm;
