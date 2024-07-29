import { CircularProgressbarWithChildren } from "react-circular-progressbar";

function PieGraphic({ value, maxValue, content, detail }: any) {
  return (
    <div className="pie__item">
      <CircularProgressbarWithChildren
        className="pie__graphic_item"
        background
        value={value}
        maxValue={maxValue}
      >
        <span className="pie__item_content">{content}</span>
      </CircularProgressbarWithChildren>
      {detail && <span className="pie__item_detail">{detail}</span>}
    </div>
  );
}

export default PieGraphic;
