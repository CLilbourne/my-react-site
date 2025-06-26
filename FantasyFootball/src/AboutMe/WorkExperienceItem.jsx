// WorkExperience.jsx
import React from 'react';
import './WorkExperience.css';

function WorkExperienceItem({ title, org, location, date, bullets }) {
  return (
    <div className="work-item">
      <h3>{title} – {org}, <span>{location}</span></h3>
      <p className="date">{date}</p>
      <ul>
        {bullets.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export default  WorkExperienceItem