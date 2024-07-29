"use client";

let env_url = process.env.NEXT_PUBLIC_API_URL;
let host_url;
let bare_host;
let storage_url;
let auth_api;
let cloud_api;

if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
  storage_url = localStorage.getItem("apiUrl");
  bare_host = `${window.location.protocol}//${window.location.hostname}:`;
  host_url = `${window.location.protocol}//${window.location.hostname}:${8000}`;
  auth_api = `${window.location.protocol}//${window.location.hostname}:${3025}`;
  cloud_api = `${window.location.protocol}//${
    window.location.hostname
  }:${3456}`;

  console.log("STORAGE URL: ", storage_url);
  console.log("ENV URL: ", env_url);
  console.log("HOST URL: ", host_url);
}

export const HOST = bare_host;
export const AUTH_URL = auth_api;
export const CLOUD_URL = cloud_api;
export const API_URL = storage_url || env_url || host_url;
export const DEFAULT_URL = env_url || host_url;
