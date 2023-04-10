if (require('electron-squirrel-startup')) return;

/** **/

const { app, BrowserWindow,ipcMain, Tray, Menu, shell, dialog } = require('electron');
const logger = require('electron-log');
const path = require('path');
const Store = require('./lib/store');
const Watcher = require('./lib/modules/watcher');
const Netio = require('./lib/modules/netio');
let mainWindow
logger.transports.file.fileName = 'log.txt';
logger.transports.file.level = 'info';
logger.transports.file.init();

logger.info('Starting up...');
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 640,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

/**
 * Start the program when a user logs in (after bootup for example).
 */
app.setLoginItemSettings({
  openAtLogin: true,
  path: process.execPath,
  args: [
    '--processStart',
    `${path.basename(process.execPath)}`,
    '--process-start-args',
    "--hidden"
  ]
});

/**
 * Don't allow multiple instances of the program to be run.
 */
let lock = app.requestSingleInstanceLock();

if (!lock) {
  return app.quit();
}

app.on('second-instance', (event, argv, cwd) => {
  logger.info(`[General] Prevented second instance from spawning.`);
});

/**
 * Prevent garbage collection.
 */
let config,
  icon,
  menu,
  modules;

function setup() {
  cleanup();

  logger.info(`[General] Running setup...`);

  modules = [
    new Watcher(config).start(),
    new Netio(config).start()
  ];
}

function cleanup() {
  modules.forEach(m => m.stop());
}

app.on('ready', () => {
  createWindow()
  logger.info(`[General] App ready (${process.pid})...`);

  /** **/

  config = new Store(
    /* Store */    'PTU Config',
    /* Defaults */ require('./config')
  );

  logger.info(`[General] App version: [v${config.get('version')}]`);

  /** **/

  icon = path.join(__dirname, 'icon.ico');
  icon = new Tray(icon);
  icon.setToolTip('WC3Stats Auto Uploader Customize for PTU');

  menu = Menu.buildFromTemplate([
    {
      label: 'Settings',
      click: () => {
        config.open();
      }
    },

    {
      label: 'Logs',
      click: () => {
        shell.openItem(logger.transports.file.file);
      }
    },

    {
      label: 'Version',
      click: () => {
        dialog.showMessageBox(
          null,
          {
            title: 'Version',
            // message: `${app.getName ()} ${app.getVersion ()} (${app.getLocale ()})`
            message: `Save Online PTU Beta 1.0`
          }
        );
      }
    },

    {
      label: 'Exit',
      click: () => {
        app.quit();
      }
    }
  ]);

  icon.setContextMenu(menu);

  /** **/

  modules = [];

  setup();

  config.on('change', () => {
    logger.info(`[General] Configuration change detected, reinitializing...`);
    setup();
  });

});
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

ipcMain.on("start-share",function (event,arg){

})
ipcMain.on("stop-share",function (event,arg){
  
})