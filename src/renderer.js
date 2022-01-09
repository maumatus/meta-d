const electron = require("electron");
const { ipcRenderer } = electron;

function formSubmission(event) {
  event.preventDefault();
  // get input file
  const file = document.querySelector("input").files[0];
  // deconstruct file path
  const { path } = file;
  // send "video:duration:request" event along with file path
  ipcRenderer.send("video:duration", path);
}
// add event listener to our form
const form = document.querySelector("form");
form.addEventListener("submit", formSubmission);
// listen to "video:duration:send" and append new text bellow the form
ipcRenderer.on("video:duration", 
      (event, 
      duration, 
      format_long_name, 
      codec_name, 
      width, height, 
      color_space, 
      r_frame_rate, 
      bit_rate, 
      sample_rate, 
      channel_layout) => {

  const heading2 = document.querySelector("#duration");
  const formato = document.querySelector("#formato");
  const codec = document.querySelector("#codec");
  const tamano = document.querySelector("#tamano");
  const eColor = document.querySelector("#color");
  const frameRate = document.querySelector("#framerate");
  const bitrate = document.querySelector("#bitrate");
  //const audioCodec = document.querySelector("#audio-codec");
  const samplerate = document.querySelector("#sample-rate");
  const canales = document.querySelector("#canales");

  heading2.innerHTML = `Duracion: ${duration}`;
  formato.innerHTML = `Formato: ${format_long_name}`;
  codec.innerHTML = `Codec: ${codec_name}`;
  tamano.innerHTML = `Tamano: ${width}x${height}`;
  eColor.innerHTML = `Espacio Color: ${color_space}`;
  frameRate.innerHTML = `Framerate: ${r_frame_rate}`;
  bitrate.innerHTML = `Bitrate: ${bit_rate}`;
  //audioCodec.innerHTML = `Codec: ${codec_name}`;
  samplerate.innerHTML = `Sampleo Audio: ${sample_rate}`;
  canales.innerHTML = `Canales Audio: ${channel_layout}`;
});