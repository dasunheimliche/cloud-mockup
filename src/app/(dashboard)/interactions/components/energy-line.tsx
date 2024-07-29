"use client";

import clsx from "clsx";

/**
 *Renderizar un componente EnergyLine.
 *
 * @param {string} position - La posición de la línea de energía, por ejemplo : 'top left', 'top right', 'bottom left', 'bottom right'.
 * @param {boolean} isActive - Si la línea de energía está activa.
 * @param {boolean} startArrow - Si la línea de energía tiene una flecha de inicio.
 * @param {boolean} endArrow - Si la línea de energía tiene una flecha final.
 * @return {JSX.Element} El componente EnergyLine renderizado.
 */
function EnergyLine({ position, isActive, startArrow, endArrow }: any) {
  return (
    <div
      className={clsx(
        "energy-line",
        position === "top left" && "energy-line-topleft",
        position === "top right" && "energy-line-topright",
        position === "bottom left" && "energy-line-bottomleft",
        position === "bottom right" && "energy-line-bottomright",
        isActive && "energy-line-active"
      )}
    >
      {startArrow && (
        <svg
          style={{
            fill: "#052e16",
          }}
          className={clsx(
            "energy-line-icon",
            position === "top left" && "energy-line-icon-start-topleft",
            position === "top right" && "energy-line-icon-start-topright",
            position === "bottom left" && "energy-line-icon-start-bottomleft",
            position === "bottom right" && "energy-line-icon-start-bottomright",
            isActive && "energy-line-icon-active"
          )}
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="32"
          viewBox="0 -960 960 960"
        >
          <path d="M480-360 280-560h400L480-360Z" />
        </svg>
      )}
      {endArrow && (
        <svg
          style={{
            // fill: "#052e16 !mportant",
            fill: "#ffffff !mportant",
          }}
          className={clsx(
            "energy-line-icon",
            position === "top left" && "energy-line-icon-end-topleft",
            position === "top right" && "energy-line-icon-end-topright",
            position === "bottom left" && "energy-line-icon-end-bottomleft",
            position === "bottom right" && "energy-line-icon-end-bottomright",
            isActive && "energy-line-icon-active"
          )}
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="32"
          viewBox="0 -960 960 960"
        >
          <path d="M480-360 280-560h400L480-360Z" />
        </svg>
      )}
    </div>
  );
}

export default EnergyLine;
