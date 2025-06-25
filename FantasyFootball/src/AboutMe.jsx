
import "./AboutMe.css"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AboutMe() {
  return (
    <div style={{ marginTop: 90, marginLeft: 20}}>
      <h1>
        Hey, I'm Connor Lilbourne 
      </h1>
      <h2> Why the Website? </h2>
        <p>
            I am looking for a job in AI, Machine Learning and Data Analysis, this serves as a resume and repository for my projects.
        </p>
        <h2>About Me</h2>
        <p>
            Hi, Im Connor! Im deeply interested in computer science, with a particular passion for data analysis and the exciting world of machine learning and artificial intelligence. I love uncovering insights from data and building intelligent systems that can solve real-world problems whether it's through predictive models, automation, or smart visualizations.
        </p>
        <p>
            Outside of my academic and professional interests, I’m an avid fan of video games and the esports scene. My favourite games currently are fortnite, league of legends and rust.  I enjoy following competitive gaming and exploring how technology and analytics are shaping the future of the industry. I’m also a huge football enthusiast… you may already know this by looking at some of my daily projects… Go Rams!!
        </p>
        <h2>Learning Log</h2>
        <table>
            <tr>
            <th>Date</th>
            <th>What Was Learned</th>
            <th>Results</th>
            <th>Citation</th>
            <th>Notes</th>
            </tr>
            <tr>
            <td>2025-04-28</td>
            <td>Basic Web Scraping</td>
            <td></td>
            <td></td>
            </tr>
            <tr>
            <td>2025-04-29</td>
            <td>Basic Button Setup (Intro to HTML)</td>
            <td></td>
            <td>https://www.youtube.com/watch?v=G3e-cpL7ofc</td>
            <td>More tomorrow</td>
            </tr>
            <tr>
            <td>2025-04-30</td>
            <td>Header and Video Section (Grid/Flexbox)</td>
            <td></td>
            <td>https://www.youtube.com/watch?v=G3e-cpL7ofc</td>
            <td>More tomorrow</td>
            </tr>
            <tr>
            <td>2025-05-01</td>
            <td>Body, Colour, Sidebars</td>
            <td>^^^</td>
            <td>https://www.youtube.com/watch?v=G3e-cpL7ofc</td>
            <td>Next Step React</td>
            </tr>
             <tr>
            <td>2025-05-02</td>
            <td>QGIS(Scratching Surface)</td>
            <td><a href = "/qgis2web_2025_05_02-19_38_03_773292/qgis_first.html"> map</a></td>
            <td>https://www.youtube.com/watch?v=SovdBaus7pM&t=58s</td>
            <td>More to learn if required</td>
            </tr>
            <tr>
            <td>2025-05-03</td>
            <td>Banana Bread (w Dr. k podcast)</td>
            <td><a href="/AboutMeImgs/D365E3E3-D618-46CA-8525-5BBC5E209EB6.jpg" target="_blank">Photo</a></td>
            <td>https://www.simplyrecipes.com/recipes/banana_bread/</td>
            <td>Yummy</td>
            </tr>
             <tr>
            <td>2025-05-05</td>
            <td>Django (scratching surface)</td>
            <td><a href="/AboutMeImgs/django.png" target="_blank">Photo</a></td>
            <td>https://www.youtube.com/watch?v=rHux0gMZ3Eg</td>
            <td>Do API imports and React first</td>
            </tr>
            <tr>
            <td>2025-05-06</td>
            <td>Excel (Formula, Functions, Charts)</td>
            <td></td>
            <td>https://www.youtube.com/watch?v=pCJ15nGFgVg</td>
            <td>More to do tomorrow</td>
            </tr>
            <tr>
            <td>2025-05-07</td>
            <td>Excel (Tables, Pivot)</td>
            <td></td>
            <td>https://www.youtube.com/watch?v=pCJ15nGFgVg</td>
            <td>More to do tomorrow</td>
            </tr>
            <tr>
            <td>2025-05-08</td>
            <td>Excel (Derusting PowerQuery ETL)</td>
            <td></td>
            <td>https://www.youtube.com/watch?v=pCJ15nGFgVg</td>
            <td>More to do tomorrow</td>
            </tr>
            <tr>
            <td>2025-05-09</td>
            <td>Excel (Finished)</td>
            <td></td>
            <td>https://www.youtube.com/watch?v=pCJ15nGFgVg</td>
            <td></td>
            </tr>
            <tr>
            <td>2025-05-21</td>
            <td>React (Start, Card, Button, Lists, Props/Conditional Props, Rendering)</td>
            <td><a href="/AboutMeImgs/react early.png" target="_blank">Photo</a></td>
            <td>https://www.youtube.com/watch?v=CgkZ7MvWUAA</td>
            <td>More to do tomorrow</td>
            </tr>
            <tr>
            <td>2025-05-22</td>
            <td>React (useState)</td>
            <td><a href="/AboutMeImgs/react.png" target="_blank">Photo</a></td>
            <td>https://www.youtube.com/watch?v=CgkZ7MvWUAA</td>
            <td>More to do tomorrow</td>
            </tr>
            <tr>
            <td>2025-05-27</td>
            <td>React (useEffect, useRef, Clocks)</td>
            <td><a href="/AboutMeImgs/reactfinished.png" target="_blank">Photo</a></td>
            <td>https://www.youtube.com/watch?v=CgkZ7MvWUAA</td>
            <td>Revamp Website, Start Fantasy Website</td>
            </tr>
            <tr>
            <td>2025-06-03</td>
            <td>React (useEffect, useRef, Clocks)</td>
            <td><a href="/AboutMeImgs/first draft look.png" target="_blank">Photo</a></td>
            <td></td>
            <td>Login and team creation, apis?</td>
            </tr>
            <tr>
            <td>2025-06-04</td>
            <td>MERN STACK - React, NodeJS, MongoDB, Express</td>
            <td><a href="/AboutMeImgs/draft-day2.png" target="_blank">Photo</a></td>
            <td></td>
            <td>Login and team creation stats api</td>
            </tr>
            <tr>
            <td>2025-06-05</td>
            <td>MERN STACK - React, NodeJS, MongoDB, Express</td>
            <td><a href="/AboutMeImgs/login.png" target="_blank">Photo</a></td>
            <td></td>
            <td>team creation stats api, leagues and invites</td>
            </tr>
            <tr>
            <td>2025-06-09</td>
            <td>MERN STACK - React, NodeJS, MongoDB, Express</td>
            <td><a href="/AboutMeImgs/mock-draft.png" target="_blank">Mock</a></td>
            <td></td>
            <td>team creation stats api, leagues and invites</td>
            </tr>
        </table>
        <h2> Things to learn</h2>
        <div>
        <p>
            - Django <br />
            - Docker <br />
            - Improve JS <br />
            - copilot? <br />
            - Improve GIS <br />
            - curiosity cascade along the way <br />
            - LLM Prompt Engineer
        </p>
        </div>
        <h2>Resume</h2>
        <p>
            <a href="Connor_Resume.pdf" target="_blank">My Resume</a>
        </p>
        <h4>Citation</h4>
        <p>
        SuperSimpleDev (HTML & CSS): https://www.youtube.com/watch?v=G3e-cpL7ofc <br />
        Matt Forrest (QGIS): https://www.youtube.com/watch?v=SovdBaus7pM&t=58s <br />
        Dr K. (Podcast): https://www.youtube.com/channel/UClHVl2N3jPEbkNJVx-ItQIQ <br />
        Elise Bauer (Banana Bread): https://www.simplyrecipes.com/recipes/banana_bread/ <br />
        Programming with Mosh (Installing Django): https://www.youtube.com/watch?v=rHux0gMZ3Eg <br />
        Luke Barousse (Excel): https://www.youtube.com/watch?v=pCJ15nGFgVg <br />
        Bro Code (React): https://www.youtube.com/watch?v=CgkZ7MvWUAA
        </p>
    </div>
  );
}

export default AboutMe;