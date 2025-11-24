import type { CoursePart } from "../type";

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <i>{props.description}</i>
        </div>
      )
    case "group":
      return (
        <div>
          <i>Project exercises {props.groupProjectCount}</i>
        </div>
      )
    case "background":
      return (
        <div>
          <div>
            <i>{props.description}</i>
          </div>
          <div>
            <i>{props.backgroundMaterial}</i>
          </div>
        </div>
      )
    case "special":
      return (
        <div>
          <div>
            <i>{props.description}</i>
          </div>
          <div>
            Required skills:{" "}
            {props.requirements.map((skill) => skill).join(", ")}
          </div>
        </div>
      )
  }
  return (
    <div>Part</div>
  )
}

export default Part