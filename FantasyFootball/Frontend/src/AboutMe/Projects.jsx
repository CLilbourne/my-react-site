import React from 'react';
import './Projects.css'; // or use Tailwind if preferred

const projects = [
  {
    title: 'Data Mining Projects - 2025',
    category: 'Data Analysis / Data Cleaning / Big Data',
    stack: ['Python', 'TensorFlow', 'Scikit-Learn', 'NetworkX', 'BERT'],
    bullets: [
      'BERT/LLM’s, Tokenization, Stop Word Removal/Data Cleaning, Similarity Models, Pagerank.',
      'Developed a custom PageRank algorithm to evaluate the relative importance of web pages within a network, effectively addressing issues such as dead ends and spider traps.',
      'Designed and implemented a Large Language Model to analyze similarities between scientific paper titles and abstracts, enabling the clustering of research into thematic groups and revealing potential interdisciplinary opportunities for innovation. ',
    ],
  },
   {
    title: 'Fantasy Football Application - 2025',
    category: 'Fullstack / Frontend / Backend',
    stack: ['JavaScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'React'],
    bullets: [
      'Built a real-time snake draft board with timers, filters, and player queues',
      'Implemented a secure login and registration system using MongoDB and bcrypt',
      'Pulled from real APIs including Active NFL players and NFL top ADP for fantasy',
      'Developed AI drafting Bots that can mock real user patterns in fantasy football drafts',
    ],
  },
  {
    title: 'Machine Learning Algorithms - 2024',
    category: 'Data Analysis / Data Cleaning',
    stack: ['Python', 'Keras', 'MNIST', 'Scikit-Learn'],
    bullets: [
      'K-NN, Linear Regressor, Neural Networks (Convolutional), Decision Tree Classification. ',
      'Engineered machine learning models leveraging the MNIST Database as well as the Scikit-Learn library to classify authentic and fraudulent spam emails. Developed algorithms for digit recognition in images with a 98% accuracy.  ',
    ],
  },
  {
    title: 'AI Algorithms - 2024',
    category: 'Puzzle Solving / Solution Based',
    stack: ['Python', 'C', 'Jupyter Notebook'],
    bullets: [
      'Implemented an A* algorithm for solving the 8/15-puzzle’s by conducting a comparative analysis of heuristics.',
      'Created an AC-3 (Arc Consistency) algorithm built with backtracking to solve any 9x9 sudoku puzzle.',
      'Produced a N-Queens Constraint Satisfaction Problem Algorithm that can find the greatest number of queens to fill a 2 million x 2 million chess board so that they will not be able to attack each other based on classic chess rules.',
    ],
  },
  {
    title: 'AWS Hosted E-Commerce Website - 2024',
    category: 'E-Commerce / Webhosting',
    stack: ['AWS', 'WordPress'],
    bullets: [
      'Initialized an EC2 instance using Free Tier Services on the AWS Platform combined with a WordPress AMI.',
      'Created an E-Commerce website for a Business "Blackridge Camping Company" on WordPress while leveraging UX Design principles, SEO, and digital/content marketing trends. ',]
  },
  {
    title: 'SQL Database System - 2023',
    category: 'DBMS / Backend',
    stack: ['MySQL Workbench', 'Java', 'SQL'],
    bullets: [
      'Built an ER-based normalized database system using primary and foreign keys.',
      'Reduced redundancy and improved query performance by using normalization techniques.',
    ],
  },
  {
    title: 'Block Cube - 2023',
    category: 'Gamedev',
    stack: ['C#', 'Blender'],
    bullets: [
      'Built a runner-style game by gathering and integrating stakeholder requirements, creating detailed UML diagrams and Gantt charts for effective organization, and resolving merge conflicts to maintain code integrity',
      'Developed a project plan through detailed UML diagramming, conducted prototype evaluations incorporating user feedback, created robust test suites, and performed thorough debugging to optimize performance and align with stakeholder expectations.',
    ],
  },
];

export default function Projects() {
  return (
    <section className="projects-section">
      <h2 className="section-title"> Projects</h2>
      <div className="project-grid">
        {projects.map((project, idx) => (
          <div className="project-card" key={idx}>
            <h3>{project.title}</h3>
            <span className="project-category">{project.category}</span>
            <div className="tech-stack">
              {project.stack.map((tech, i) => (
                <span className="tech-pill" key={i}>{tech}</span>
              ))}
            </div>
            <ul>
              {project.bullets.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
