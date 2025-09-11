export default function Modules() {
  return (
    <div>
      <button type="button">Collapse All</button>
      <button type="button">View Progress</button>
      <select>
        <option value="PUBLISH_ALL">Publish All</option>
      </select>
      <button type="button">+ Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction to Web
                  Development
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Creating User Interfaces
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">
                  Creating an HTTP server with Node.js
                </li>
                <li className="wd-content-item">
                  Creating a React application
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}
