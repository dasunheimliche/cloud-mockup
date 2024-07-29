"use client";

import { TextField } from "@mui/material";
import evaBlack from "/public/imgs/eva-black.png";

import { useState } from "react";

import axios from "axios";
import Image from "next/image";
import TooltipInfo from "@/components/tooltip-info";
import { API_URL } from "@/lib/config";

function BasicConfig(props: any) {
  var [internalError, setInternalError] = useState<any>(false);
  var [internalErrorMessage, setInternalErrorMessage] = useState<any>(null);
  var [apiUrl, setAPiurl] = useState<any>("https://api.evasoft.app");

  var setApiUrlError = props.setApiUrlError;

  async function saveConfig() {
    if (apiUrl.includes("http")) {
      var requests = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "ngrok-skip-browser-warning": "uwu",
        },
      });

      await requests
        .get("/ping")
        .then((r) => {
          if (r.data === "pong!") {
            // localStorage.setItem("apiUrl", apiUrl);
            setApiUrlError(false);
          }
        })
        .catch((e) => {
          setInternalErrorMessage(
            "The API request to check if it is working could not be completed. Verify that the URL is correct."
          );
          setInternalError(true);
        });
    } else {
      setInternalErrorMessage("This looks like it is not a valid URL :/");
      setInternalError(true);
    }
  }

  return (
    <div className="fContainer">
      <div className="fDiv">
        <div className="fTop">
          <div className="fTitleCenter">
            <div className="fLogoText fLogoTextConfig">
              <Image width={35} height={20} src={evaBlack} alt="EVA LOGO" />
              <p className="fT1Config">BASIC</p>
              <p className="fT2Config">CONFIGURATION</p>
            </div>
          </div>
        </div>

        <div className="fBody">
          <div className="fTextInputDiv">
            <TextField
              error={internalError}
              className="fTextInput"
              label="API URL"
              size="small"
              helperText={internalErrorMessage}
              type="url"
              fullWidth
              onChange={(e) => setAPiurl(e.target.value)}
            />

            <div className="fInfoDiv">
              <TooltipInfo content="Local address next to the port where the API runs. -n-nYou can usually configure this by opening in your browser the local IP of where your API runs along with port 8000. Something like this: -nhttp://192.168.0.5:8000" />
            </div>
          </div>
        </div>

        <div className="fFooter">
          <div className="fButtonsDiv">
            {apiUrl ? (
              <button
                className="fCreateButton fFooterButton"
                onClick={() => saveConfig()}
              >
                <p> Confirm</p>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicConfig;
