import type { CoursePart } from "../type";
import Part from "./Part";

const margin = { marginTop: 10 };

export const Content = (props: CoursePart) => {
  return (
    <div style={margin}>
      <strong>{props.name} {props.exerciseCount}</strong>
      <Part {...props} />
    </div>
  );
};
