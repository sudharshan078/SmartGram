import React, { useEffect, useState } from 'react';
import '../styles/About.css';

const paragraphs = [
  {
    heading: "What is SmartGram?",
    subheading: "A Smart Way to Connect Educational Communities",
    content: "SmartGram is a dynamic social media platform tailored specifically for students and educators. It is designed to capture and showcase events, announcements, and activities occurring within educational institutes, making it a centralized hub for campus engagement."
  },
  {
    heading: "Focused on Academic Events",
    subheading: "Highlighting Moments That Matter",
    content: "From seminars and workshops to cultural fests and sports meets, SmartGram allows users to post, explore, and interact with event-based content. This focus ensures that students stay informed and institutions foster stronger community participation."
  },
  {
    heading: "Create, Share, Connect",
    subheading: "Your Campus, Your Voice",
    content: "Students and faculty members can create posts with images, descriptions, and tags related to academic and non-academic events. The interactive interface allows likes, comments, and sharing, enabling meaningful engagement and visibility."
  },
  {
    heading: "Bridging Institutes and Innovation",
    subheading: "Smart Communication for Smart Institutions",
    content: "SmartGram isn’t just a feed; it's a communication bridge that enables institutes to announce important notices, students to discover opportunities, and clubs to coordinate activities — all in real time."
  },
  {
    heading: "Why SmartGram?",
    subheading: "Because Every Event Deserves Attention",
    content: "Traditional notice boards are outdated. SmartGram transforms the way educational events are promoted and remembered. Whether it’s a coding hackathon or a farewell party, SmartGram ensures no moment goes unnoticed."
  }
];

const About = () => {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let lineIndex = 0;
    const allLines = paragraphs.flatMap(paragraph => [
      `<h2>${paragraph.heading}</h2>`,
      `<h4>${paragraph.subheading}</h4>`,
      ...paragraph.content.split('. ').map(line => `<p>${line.trim()}.</p>`)
    ]);

    const interval = setInterval(() => {
      if (lineIndex < allLines.length) {
        setVisibleLines(prev => [...prev, allLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800); // delay between lines

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      {visibleLines.map((line, index) => (
        <div
          className="about-line blink"
          key={index}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </div>
  );
};

export default About;
