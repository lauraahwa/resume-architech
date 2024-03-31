import React, { useState } from "react";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import Form4 from "./form4";
import "./form.css";
import axios from "axios";
import FormStepper from "./FormStepper";

function Form() {
  const [page, setPage] = useState(0);
  const [formInputs, setFormInputs] = useState({
    first: "",
    last: "",
    address: "",
    phone: "",
    email: "",
    school: "",
    grad_year: "",
    major: "",
    gpa: "",
    skills: "",
    github: "",

  });
  const [loading, setLoading] = useState(false);
  const updateFormInputs = (key, value) => {
    setFormInputs((currInputs) => {
      return { ...currInputs, [key]: value };
    });
  };

  const submit = () => {
    console.log(formInputs);
    setLoading(true);
    axios
      .post("http://localhost:8000/setuserinfo", {
        ...formInputs,
        username: window.localStorage.getItem("username"),
      })
      .then((res) => {
        setLoading(false);
        window.location.href = "/apply";
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const FormTitles = [
    "Personal Information",
    "Education",
    "Experience",
    "Projects",
  ];

  const forms = [
    <Form1 inputs={formInputs} setInputs={updateFormInputs} />,
    <Form2 inputs={formInputs} setInputs={updateFormInputs} />,
    <Form3 inputs={formInputs} setInputs={updateFormInputs} />,
    <Form4 inputs={formInputs} setInputs={updateFormInputs} />,
  ];
  const PageDisplay = () => {
    return forms[page];
  };

  return (
    <div className="first-form">
      <div className="form-container">
        <div className='flex justify-center items-top p-3'>
          <div className='flex justify-center w-1/2 items-top'>
            {FormTitles.map((step, index) => (
              // React.Fragment should have a key when mapping
              <React.Fragment key={index}> 
                <div className={`flex flex-col justify-top items-center p-3 m-3`}>
                  <div className={`flex justify-center items-center w-10 h-10 ${index <= page ? 'bg-gray-700 text-white' : 'bg-gray-200'} rounded-full`}>
                    {index + 1}
                  </div>
                  <div className={`text-center ${index <= page ? 'font-bold' : ''}`}>{step}</div>
                </div>
                {index < FormTitles.length - 1 && (
                  <div className={`w-full max-w-[2px] bg-gray-700 ${index < page ? 'bg-gray-700' : 'bg-gray-200'}`} style={{height: "2px"}}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
  
        <div className="header text-4xl text-7xl mt-">
          {FormTitles[page]}
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          {/* Conditional rendering needs to be outside the button */}
          {page === 0 ? (
            <button
              onClick={() => {
                window.location.href='/login'; // Go Login
              }}
            >
              Back
            </button>
          ) : (
            <button
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Previous
            </button>
          )}
          {page === FormTitles.length - 1 ? (
            <button onClick={submit}>Submit</button>
          ) : (
            <button
              onClick={() => {
                setPage((currPage) => currPage + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );  
}

export default Form;
