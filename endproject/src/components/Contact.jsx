import React from 'react';
import '../styles/Contact.css';
import laskarImage from '../assets/laskar.jpg';
import sudharshanImage from '../assets/sudharshan.jpg'; // Ensure the file name and path are correct
import raviImage from '../assets/ravi.jpg'; // Ensure the file name and path are correct

const Contact = () => {
  const contacts = [
    {
      image: laskarImage,
      name: "AHMADULLAH LASKAR",
      roll: "2300080386",
      email: "2300080386@kluniversity.in",
      mobile: "8471808399",
      address: "Near Masjid, Vaddeswaram, Andhra Pradesh, India",
    },
    {
      image: sudharshanImage,
      name: "Sudharshan Reddy",
      roll: "2300080114",
      email: "2300080114@kluniversity.in",
      mobile: "9502585102",
      address: "Kadapa",
    },
    {
      image: raviImage,
      name: "BOBBITI. RAVI SHANKAR REDDY",
      roll: "2300080079",
      email: "2300080079@kluniversity.in",
      mobile: "7702823709",
      address: "NANDIKOTKUR VILLAGE, KURNOOL DISTRICT",
    },
  ];

  return (
    <div className="contact-page">
      {contacts.map((contact, index) => (
        <div className="contact-container" key={index}>
          <div className="contact-left">
            <img src={contact.image} alt={contact.name} className="contact-image" />
          </div>
          <div className="contact-right">
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Roll No:</strong> {contact.roll}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Mobile No:</strong> {contact.mobile}</p>
            <p><strong>Address:</strong> {contact.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
