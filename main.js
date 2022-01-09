const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

let win

function createWindow () {
  //Creamos la ventana del browser
      win = new BrowserWindow({
      width: 800,
      height: 800,
      titleBarStyle:'hidden',
      titleBarOverlay: false,
      transparent: true,
      frame: true,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
      }
  })
  win.loadFile("src/index.html"); 

  win.webContents.openDevTools()
};

//
app.whenReady().then(createWindow);

//Cerramos cuando todas las ventanas estan cerradas.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
});

//IPC

ipcMain.on("video:duration", (event, path) => {
  ffmpeg.ffprobe(path, (error, metadata) => {
    //console.log("Video duracion is", metadata.format.duration);
    //console.log("Formato es", metadata.format.format_long_name);
    //console.log("Codec es", metadata.streams[0].codec_name);
    //console.log(`Tamaño es, ${metadata.streams[0].width} x ${metadata.streams[0].height} px`);
    //console.log("Video metadata is", streams.codec_name);
    //Extras metadata video
    console.log(metadata.streams[0].color_space);
    console.log(metadata.streams[0].r_frame_rate);
    console.log(metadata.streams[0].bit_rate);
    //Audio Metadada
    console.log(metadata.streams[1].codec_name);
    console.log(metadata.streams[1].sample_rate);
    console.log(metadata.streams[1].channel_layout)
    console.log("Video duracion is", metadata);

    win.webContents.send(
      "video:duration",
      metadata.format.duration,
      metadata.format.format_long_name,
      metadata.streams[0].codec_name,
      metadata.streams[0].width,
      metadata.streams[0].height,
      metadata.streams[0].color_space,
      metadata.streams[0].r_frame_rate,
      metadata.streams[0].bit_rate,
      metadata.streams[1].sample_rate,
      metadata.streams[1].channel_layout
    );
  });
});
