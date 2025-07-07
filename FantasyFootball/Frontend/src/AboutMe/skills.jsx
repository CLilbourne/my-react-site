import './Skills.css';

export default function Skills() {
  const skills = {
    Languages: ["JavaScript", "Python", "SQL", "HTML", "CSS", "R", "C#", "VBA", "Java", "Dax", "C"],
    "Frameworks & Libraries": [
      "React", "Node.js", "Express", "Scikit-learn", "TensorFlow", "Pandas", "Vite"
    ],
    Tools: ["Git", "GitHub", "MongoDB", "MySQL", "Power BI", "Jupyter Notebook", "VS Code", "CAD", "AWS Practitioner"],
    Concepts: [
      "Data Analysis", "Machine Learning", "OOP", "Agile", "UML", "Debugging", "API Integration" , "AI"
    ]
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div className="skill-category" key={category}>
            <h3>{category}</h3>
            <ul>
              {items.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
