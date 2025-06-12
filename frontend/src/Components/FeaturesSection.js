import React from 'react';
import { FaSearch, FaBoxOpen, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import '../Styles/FeaturesSection.css'; // Adjust the path as necessary
const features = [
  {
    icon: <FaSearch />,
    title: 'Report Lost Items',
    description: 'Easily post details about lost belongings around campus.',
  },
  {
    icon: <FaBoxOpen />,
    title: 'Report Found Items',
    description: 'Upload info and images of found items for rightful claims.',
  },
  {
    icon: <FaPhoneAlt />,
    title: 'Contact Owners Securely',
    description: 'Communicate safely with claimants via in-app messaging.',
  },
  {
    icon: <FaEdit />,
    title: 'Manage Your Posts',
    description: 'Edit or delete your lost/found reports anytime.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="features" id="features">
      <h2>Why Choose ABES Findify?</h2>
      <div className="features-grid">
        {features.map((feature, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
