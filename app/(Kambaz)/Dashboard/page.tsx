import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/3061" className="wd-dashboard-course-link">
            <Image
              src="/images/ninja.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> DA3061 Ninja-ing </h5>
              <p className="wd-dashboard-course-title">
                That ninja stuff{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1445" className="wd-dashboard-course-link">
            <Image
              src="/images/bowl.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> ME1445 Bowl Debate </h5>
              <p className="wd-dashboard-course-title">
                Debate the dishes{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/9000" className="wd-dashboard-course-link">
            <Image
              src="/images/coralreef.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> DS9000 Coral Reef Excavation </h5>
              <p className="wd-dashboard-course-title">
                It&apos;s in the name{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/6083" className="wd-dashboard-course-link">
            <Image
              src="/images/whisk.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> ACCT6083 Whisking </h5>
              <p className="wd-dashboard-course-title">
                Perfect the technique of whisking{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/4800" className="wd-dashboard-course-link">
            <Image
              src="/images/nerd.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> MATH4800 Nerd Class </h5>
              <p className="wd-dashboard-course-title">
                A class for nerds{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/1001" className="wd-dashboard-course-link">
            <Image
              src="/images/knit.jpg"
              width={200}
              height={150}
              alt={""}
            />
            <div>
              <h5> PHL1001 Hyperbolic Knitting </h5>
              <p className="wd-dashboard-course-title">
                I couldn&apos;t even describe it if I wanted to{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
