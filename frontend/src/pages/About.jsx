import BeachPic from "../assets/beach_pic.jpg";

export const About = () => {
  return (
    <div className="container">
      <h1>About Me</h1>

      <div className="row d-flex rounded-4">
        <div className="col-md-6 col-sm-12 p-3" style={{ height: "500px" }}>
          <img
            src={BeachPic}
            className="rounded-2 mx-auto"
            alt="headshot of Griffin Overmyer in 2022"
            style={{ height: "100%", width: "70%", maxWidth: "none", objectFit: "cover" }}
          />
        </div>
        <div
          className="col-md-6 col-sm-12 d-grid text-md-start text-sm-center"
          style={{ placeItems: "center", alignContent: "center" }}
        >
          <p>
            My name is Griffin Overmyer. I'm a senior at Purdue University studying Web Development & Design. I
            maintained performances in frontend and backend technologies. My professional experiences with internships
            and personal will to want to learn more about my profession has built my skills to where I am today.
          </p>

          <p>
            When I am not coding I really enjoy sports. I really like to play basketball, football, and swim. While I
            don't play any of those sports at Purdue, I do enjoy cheering on my team at the weekly games at{" "}
            <a href="https://purduesports.com/facilities/ross-ade-stadium/1" target="_blank">
              Ross Aid Stadium
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
