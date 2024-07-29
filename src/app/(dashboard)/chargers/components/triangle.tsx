// function Triangle(props: any) {
//   var width = props.width;
//   var height = props.height;

//   var state = props.state;
//   var down = props.down;

//   var neutral = props.neutral;
//   var values = props.values;

//   var stateColors = [
//     ["rgb(3,255,0)", "rgb(39,107,26)"],
//     ["rgb(0,234,255)", "rgb(26,107,103)"],
//     ["rgb(255,151,0)", "rgb(107,62,26)"],
//     ["rgb(236,0,0)", "rgb(107,26,26)"],
//     ["rgb(223,223,223)", "rgb(102,102,102)"],
//   ];

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       style={{ isolation: "isolate" }}
//       viewBox="0 0 500 500"
//       width={width + "pt"}
//       height={height + "pt"}
//       className={
//         (down ? "svgDown" : "") +
//         " " +
//         (neutral ? (down ? "internalChargerDown" : "internalChargerTop") : "")
//       }
//     >
//       <defs>
//         <clipPath id="_clipPath_WMs83oUemIL32DzsOV2ZS2qcKtQ6x45d">
//           <rect width="500" height="500" />
//         </clipPath>
//       </defs>

//       {neutral === true ? (
//         <g clipPath="url(#_clipPath_WMs83oUemIL32DzsOV2ZS2qcKtQ6x45d)">
//           <linearGradient
//             id={values.connectorId + "internal"}
//             x1="0"
//             y1="0.5"
//             x2="1"
//             y2="0.5"
//             gradientTransform="matrix(494.603,0,0,428.339,2.699,25.831)"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop
//               offset="0%"
//               stopOpacity="1"
//               style={{ stopColor: "rgb(255, 255, 255)" }}
//             />

//             <stop
//               offset="100%"
//               stopOpacity="1"
//               style={{ stopColor: "rgb(255, 255, 255)" }}
//             />
//           </linearGradient>

//           <path
//             d=" M 462.679 454.169 L 250 454.169 L 37.321 454.169 C 18.212 454.169 10.455 440.734 20.01 424.186 L 126.349 240 L 232.689 55.814 C 242.243 39.266 257.757 39.266 267.311 55.814 L 373.651 240 L 479.99 424.186 C 489.545 440.734 481.788 454.169 462.679 454.169 Z "
//             fill={"url(#" + values.connectorId + "internal)"}
//             stroke="#232323"
//             strokeWidth={5}
//           />
//         </g>
//       ) : (
//         <g clipPath="url(#_clipPath_y5dfdEDD2A0fWJWE9UAirzqVwwMdAgKN)">
//           <linearGradient
//             id={values.connectorId}
//             x1="0"
//             y1="0.5"
//             x2="1"
//             y2="0.5"
//             gradientTransform="matrix(494.603,0,0,428.339,2.699,25.831)"
//             gradientUnits="userSpaceOnUse"
//           >
//             <stop
//               offset="0%"
//               stopOpacity="1"
//               style={{ stopColor: stateColors[state][0] }}
//             />

//             <stop
//               offset="100%"
//               stopOpacity="1"
//               style={{ stopColor: stateColors[state][1] }}
//             />
//           </linearGradient>

//           <path
//             d=" M 462.679 454.169 L 250 454.169 L 37.321 454.169 C 18.212 454.169 10.455 440.734 20.01 424.186 L 126.349 240 L 232.689 55.814 C 242.243 39.266 257.757 39.266 267.311 55.814 L 373.651 240 L 479.99 424.186 C 489.545 440.734 481.788 454.169 462.679 454.169 Z "
//             fill={"url(#" + values.connectorId + ")"}
//             stroke="#232323"
//             strokeWidth={5}
//           />
//         </g>
//       )}
//     </svg>
//   );
// }

// export default Triangle;

function Triangle(props: any) {
  var width = props.width;
  var height = props.height;

  var state = props.state;
  var down = props.down;

  var neutral = props.neutral;
  var values = props.values;

  var stateColors = [
    ["rgb(3,255,0)", "rgb(39,107,26)"],
    ["rgb(0,234,255)", "rgb(26,107,103)"],
    ["rgb(255,151,0)", "rgb(107,62,26)"],
    ["rgb(236,0,0)", "rgb(107,26,26)"],
    ["rgb(223,223,223)", "rgb(102,102,102)"],
    ["rgb(183,189,0)", "rgb(247,255,0)"],
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ isolation: "isolate" }}
      viewBox="0 0 500 500"
      width={width + "pt"}
      height={height + "pt"}
      className={
        (down ? "svgDown" : "") +
        " " +
        (neutral ? (down ? "internalChargerDown" : "internalChargerTop") : "")
      }
    >
      <defs>
        <clipPath id="_clipPath_WMs83oUemIL32DzsOV2ZS2qcKtQ6x45d">
          <rect width="500" height="500" />
        </clipPath>
      </defs>

      {neutral === true ? (
        <g clipPath="url(#_clipPath_WMs83oUemIL32DzsOV2ZS2qcKtQ6x45d)">
          <linearGradient
            id={values.connectorId + "internal"}
            x1="0"
            y1="0.5"
            x2="1"
            y2="0.5"
            gradientTransform="matrix(494.603,0,0,428.339,2.699,25.831)"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopOpacity="1"
              style={{ stopColor: "rgb(255, 255, 255)" }}
            />

            <stop
              offset="100%"
              stopOpacity="1"
              style={{ stopColor: "rgb(255, 255, 255)" }}
            />
          </linearGradient>

          <path
            d=" M 462.679 454.169 L 250 454.169 L 37.321 454.169 C 18.212 454.169 10.455 440.734 20.01 424.186 L 126.349 240 L 232.689 55.814 C 242.243 39.266 257.757 39.266 267.311 55.814 L 373.651 240 L 479.99 424.186 C 489.545 440.734 481.788 454.169 462.679 454.169 Z "
            fill={"url(#" + values.connectorId + "internal)"}
            stroke="#232323"
            strokeWidth={5}
          />
        </g>
      ) : (
        <g clipPath="url(#_clipPath_y5dfdEDD2A0fWJWE9UAirzqVwwMdAgKN)">
          <linearGradient
            id={values.id}
            x1="0"
            y1="0.5"
            x2="1"
            y2="0.5"
            gradientTransform="matrix(494.603,0,0,428.339,2.699,25.831)"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopOpacity="1"
              style={{ stopColor: stateColors[state][0] }}
            />

            <stop
              offset="100%"
              stopOpacity="1"
              style={{ stopColor: stateColors[state][1] }}
            />
          </linearGradient>

          <path
            d=" M 462.679 454.169 L 250 454.169 L 37.321 454.169 C 18.212 454.169 10.455 440.734 20.01 424.186 L 126.349 240 L 232.689 55.814 C 242.243 39.266 257.757 39.266 267.311 55.814 L 373.651 240 L 479.99 424.186 C 489.545 440.734 481.788 454.169 462.679 454.169 Z "
            fill={"url(#" + values.id + ")"}
            stroke="#232323"
            strokeWidth={5}
          />
        </g>
      )}
    </svg>
  );
}

export default Triangle;
