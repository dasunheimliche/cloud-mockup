"use client";

import { useState } from "react";
import Modal from "./modal";
import PieGraphic from "./pie-graphic";

const details = [
  {
    name: "Available",
    chargerName: "sdsd",
    myCharger: "0.0 kW",
    color: "green",
  },
  {
    name: "Charging",
    chargerName: "sdsd",
    myCharger: "0.0 kW",
    color: "blue",
  },
  {
    name: "Other",
    chargerName: "sdsd",
    myCharger: "0.0 kW",
    color: "gray",
  },
  {
    name: "Error",
    chargerName: "sdsd",
    myCharger: "0.0 kW",
    color: "red",
  },
  {
    name: "Offline",
    chargerName: "sdsd",
    myCharger: "0.0 kW",
    color: "pink",
  },
];

function StatusGraphic({ value, maxValue }: any) {
  const [dataModal, setDataModal] = useState({});
  const [openModal, setOpenModal] = useState(false);

  function closeModal(value: any) {
    setOpenModal(value);
  }
  console.log(dataModal);
  return (
    <>
      <div className="first__graphic fourth__graphic basic__graphic__styles ">
        <h4 className="graphic__title">Primary Title</h4>
        <PieGraphic value={value} maxValue={maxValue} content="total: 50%" />
        <ul className="graphic__list">
          {details.map((data, index) => (
            <li
              className="graphic__list_item"
              key={index}
              onClick={() => {
                setDataModal(data);
                setOpenModal(true);
              }}
            >
              <span className={`circle bg-${data.color}`} />
              <p className="graphic__span">{`${data.name} : ${data.myCharger}`}</p>
            </li>
          ))}
        </ul>
      </div>
      {openModal && <Modal {...dataModal} closeModal={closeModal} />}
    </>
  );
}

export default StatusGraphic;
