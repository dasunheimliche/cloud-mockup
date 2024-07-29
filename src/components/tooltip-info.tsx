"use client";

import { autoUpdate, useFloating } from "@floating-ui/react";
import InfoIcon from "@mui/icons-material/Info";

import { useState } from "react";

function TooltipInfo(props: any) {
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom-end",
  });

  var rawContent = props.content;
  var content = rawContent.split("-n");

  var [open, setOpen] = useState(false);

  return (
    <div
      className="TooltipDiv"
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <InfoIcon ref={refs.setReference} />

      {open ? (
        <div
          className="TooltipContainer"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <div className="TooltipContent">
            {content.map((v: any, i: any) => {
              if (i === content.length - 1) {
                return (
                  <div className="tooltipMiniContainer" key={v}>
                    <p className="TooltipText">{v}</p>
                  </div>
                );
              } else {
                return (
                  <div className="tooltipMiniContainer" key={v}>
                    <p className="TooltipText">{v}</p>
                    <br />
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TooltipInfo;
