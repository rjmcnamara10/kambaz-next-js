import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        QUIZZES 10% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            Q1 - ENV + HTML
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            Q2 - CSS + BOOTSTRAP
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            Q3 - JAVASCRIPT + REACT
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        EXAMS 20% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            X1 - A1-A3
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> October 24 at 12:00am |{" "}
            <b>Due</b> October 31 at 11:59pm | 100 pts
          </p>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            X1 - A4-A6
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> December 8 at 12:00am |{" "}
            <b>Due</b> December 10 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        PROJECT 30% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            P
          </Link>
          <p>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
            <b>Due</b> December 10 at 11:59pm | 100 pts
          </p>
        </li>
      </ul>
    </div>
  );
}
