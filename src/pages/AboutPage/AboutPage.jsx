import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container about">
      <div>
        <h1>Our Story</h1>
        <p>
          Faith’s Lodge was established in 2007 to provide a place where those coping with the death or medically complex
          condition of a child can find hope and strength. Our founders, Mark and Susan Lacek, experienced a devastating loss when
          their unborn daughter suffered an umbilical cord accident two weeks before she was due. They named her Faith because
          they knew it would take truly deep faith to keep them going through their darkest hours. Mark and Susan felt strongly
          that their daughter’s brief time on this earth should have a legacy. That legacy is the creation of Faith’s Lodge, a
          place where hope grows. Faith’s name and memory live on in this special facility that can help parents and families
          through their own darkest hours.
        </p>

        <h2>Who we are & What we do</h2>
        <p>
          The tranquil setting of Faith’s Lodge provides a peaceful escape for families coping with the death of a child to
          refresh their minds and spirits while spending time with others who understand their experiences. Our long weekend
          retreats combine professional grief counseling, therapeutic experiences, and group activities that help families heal.
          As the first dedicated retreat facility of its kind, our goal is to connect families and give them tools for coping with
          grief and its challenges in a healthy way.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
