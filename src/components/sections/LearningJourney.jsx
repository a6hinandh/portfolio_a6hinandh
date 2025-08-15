import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

function LearningJourney() {
  const categorizedCourses = [
    {
      category: "Programming & Software Development",
      courses: [
        { name: "IT Workshop 3 (Python)", status: "ongoing" },
        { name: "IT Workshop 2 (Java & PHP)", status: "completed" },
        { name: "IT Workshop 1 (HTML, CSS, JS)", status: "completed" },
        { name: "Computer Programming", status: "completed" },
      ],
    },
    {
      category: "Computer Science Foundations",
      courses: [
        { name: "Data Structures 1", status: "completed" },
        { name: "Data Structures 2", status: "ongoing" },
        { name: "Design and Analysis of Algorithms", status: "ongoing" },
        { name: "Theory of Computation", status: "ongoing" },
        { name: "Computer Organization", status: "completed" },
        { name: "Discrete Mathematics", status: "completed" },
      ],
    },
    {
      category: "Data & AI",
      courses: [
        { name: "Database Management System", status: "ongoing" },
        { name: "Probability, Statistics and Random Processes", status: "ongoing" },
        { name: "Introduction to Cognitive Science", status: "ongoing" },
      ],
    },
    {
      category: "Electronics & Hardware Systems",
      courses: [
        { name: "Electronic Circuits", status: "completed" },
        { name: "Digital Design and Electric Circuits", status: "completed" },
      ],
    },
    {
      category: "Mathematics & Applied Sciences",
      courses: [
        { name: "Calculus and Linear Algebra", status: "completed" },
      ],
    },
    {
      category: "Communication & Personal Development",
      courses: [
        { name: "Communication Skills", status: "completed" },
        { name: "Foreign Language (German)", status: "completed" },
        { name: "Personality Development", status: "completed" },
      ],
    },
  ];

  return (
    <div className="learning-journey scrollable-content">
      <div className="coursework-section">
        <h1>Coursework & Academics</h1>
        <p className="section-intro">
          Core subjects I have completed or am currently pursuing as part of my B.Tech in CSE (AI & DS) at IIIT Kottayam.
        </p>

        {categorizedCourses.map((section, idx) => (
          <div key={idx} className="category-section">
            <h2 className="category-title">{section.category}</h2>
            <div className="courses-grid">
              {section.courses.map((course, index) => (
                <div key={index} className="course-card">
                  <div className="course-name">{course.name}</div>
                  <div
                    className={`course-status ${course.status}`}
                    title={course.status === "ongoing" ? "In Progress" : "Completed"}
                  >
                    {course.status === "completed" ? (
                      <>
                        <FaCheckCircle /> Completed
                      </>
                    ) : (
                      <>
                        <FaHourglassHalf /> In Progress
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .learning-journey {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
}

.coursework-section {
  text-align: center;
  padding-bottom: 3rem;
}

.coursework-section h1 {
  color: #f5f5dc;
  margin-bottom: 0.5rem;
}

.section-intro {
  color: #e0e0d0;
  margin-bottom: 2rem;
}

.category-section {
  margin-bottom: 2rem;
}

.category-title {
  color: #90cdf4;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.courses-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.course-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.2rem;
  border-radius: 12px;
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.course-name {
  font-weight: 600;
  color: #f5f5dc;
  margin-bottom: 0.5rem;
}

.course-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.course-status.completed {
  color: #34d399;
}

.course-status.ongoing {
  color: #f59e0b;
}

/* ===== Responsive tweaks ===== */
@media (max-width: 1024px) {
  .learning-journey {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .learning-journey {
    padding: 1rem;
  }
  .courses-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
}

@media (max-width: 480px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
  .course-card {
    padding: 1rem;
  }
}
      `}</style>
    </div>
  );
}

export default LearningJourney;