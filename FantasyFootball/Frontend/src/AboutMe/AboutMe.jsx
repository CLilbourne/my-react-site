
import "./AboutMe.css"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkExperienceItem from './WorkExperienceItem';
import CircularGallery from "../GSAP/CircularGallery";
import Projects from "./Projects";
import Skills from "./skills";
import grad from  "../assets/AboutMeIMGS/Grad1.png"

function AboutMe() {

  return (
    <div style={{ marginTop: 100, marginLeft: 20}}>
      <section className="about" id="about">
      <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1>Hello, I'm Connor <span className="wave">👋</span></h1>
          <p>
            I'm a recent graduate from Laurier with an Honours BSC in Computer Science with minors in Math and Environmental Studies.
          </p>
          <p>
            I have a passion for data analysis and software engineering.
            I'm currently seeking opportunities where I can contribute and grow as a
            Software Developer or Data Analyst. 
          </p>
          <p>
            This website serves as both my interactive resume and a space for experimenting with
            projects including a fantasy football application I'm building from scratch.
          </p>
          <p>
            Feel free to explore, and scroll down or click to view my  
            <a style={{fontWeight:'bold'}} href="/AboutMeImgs/Connor_Resume_Optimized (2025)" target="_blank" rel="noopener noreferrer"> resume</a>.
          </p>
        </div>

      <div className="about-image">
        <img style={{ width: 180, borderRadius: 12 }} src={grad} alt="Connor Graduation" />
      </div>
  </div>
</div>
    </section>
      <section className="px-4 py-12 max-w-4xl mx-auto">
      <h2 style={{fontSize: 40, textAlign: 'center', userSelect: 'none'}}>Work Experience</h2>

      <WorkExperienceItem
        title="Data Analyst (Full-Time)"
        org="LifeLearn Animal Health, ProSites"
        location="Guelph, Ontario"
        date="June 2024 – December 2024"
        bullets={[
          "Applied Machine Learning/AI Recognition to profile customers improving the company's understanding on product usage across the customer base.",
          "Designed and implemented a convolutional neural network to analyze web traffic trends and identify bot data within Google Analytics and Matomo.",
          "Developed Power BI dashboards with integrated distribution models based on company needs and real-life trends, providing actionable insights and supporting data-driven recommendations."
        ]}
      />

      <WorkExperienceItem
        title="Logistics Coordinator (Volunteer)"
        org="HawkHacks/Konfer"
        location="Waterloo, Ontario"
        date="Sep 2023 – May 2024"
        bullets={[
          "Supported one of Canada’s largest hackathons, with 900+ participants, 35+ sponsors, 30+ speakers, and $240k in combined cash and object prizes.",
          "Collaborated with the team to identify event requirements and manage logistics, including venue booking, catering, and food competitions ensuring smooth planning, implementation, and high-quality participant experience.",
          "Built and maintained relationships with external vendors to secure cost-effective, high-quality services for event execution."
        ]}
      />

      <WorkExperienceItem
        title="Instructional Assistant (Part-Time)"
        org="Wilfrid Laurier University"
        location="Waterloo, Ontario"
        date="January 2024 – April 2024"
        bullets={[
          "Conducted lab sessions, answered student questions, and provided additional support to help students grasp complex concepts in the CP216 Introduction to Microprocessors course.",
          "Assisted in the grading process for labs by providing constructive feedback and collaborating with the professor in a professional manner."
        ]}
      />

      <WorkExperienceItem
        title="Emergency Instructor (Supply Teacher, Contract Role)"
        org="BHNCDSB"
        location="Brantford, Ontario"
        date="May 2022 – June 2022"
        bullets={[
          "Managed elementary school classes by teaching lessons based on curriculum standards to support continuous learning.",
          "Analyzed student achievement and prepared lesson plans to optimize student progress while maintaining accurate performance records."
        ]}
      />

      <WorkExperienceItem
        title="Inclusion Specialist and Senior Counsellor (Full-Time)"
        org="YMCA Wanakita"
        location="Haliburton, Ontario"
        date="June 2021- August 2021, June 2021 – August 2022"
        bullets={[
          "Provided care and companionship for special needs campers by leading activities, assisting with mealtime, and aiding with hygiene routines.",
          "Applied Agile thinking principles to adapt to challenges on various wilderness out trips by testing new canoeing routes and keeping track of previous mapping errors.",
          "Utilized problem-solving skills by becoming familiar with specific needs of campers to adjust services to support campers."
        ]}
      />
    </section>
    <Projects/>
    <h2 style={{fontSize: 40, textAlign: 'center',userSelect: 'none'}}>Skills</h2>
    <Skills/>
    <h2 style={{fontSize: 40, textAlign: 'center',userSelect: 'none'}}>Hobbies</h2>
        <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
        </div>
    </div>
  );
}

export default AboutMe;