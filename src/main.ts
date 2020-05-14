import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as path from 'path'
import { TLSSocket } from 'tls'

let tempDirectory = process.env['RUNNER_TEMP'] || '';
const IS_WINDOWS = process.platform === 'win32'
let OS = IS_WINDOWS ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux'

if (!tempDirectory) {
  let baseLocation;

  if (IS_WINDOWS) {
    // On windows use the USERPROFILE env variable
    baseLocation = process.env['USERPROFILE'] || 'C:\\'
  } else if (process.platform === 'darwin') {
    baseLocation = '/Users'
  } else {
    baseLocation = '/home'
  }
  tempDirectory = path.join(baseLocation, 'actions', 'temp')
}

async function run(): Promise<void> {
  try {
    await io.mkdirP('C:\cygwin64')
    await io.mkdirP('c:\cygwin_packages')
    const cyginSetup = await tc.downloadTool('https://cygwin.com/setup-x86_64.exe')
    await exec.exec(`${cyginSetup} --quiet-mode --download --local-install
    --delete-orphans --site  https://mirrors.kernel.org/sourceware/cygwin/
    --local-package-dir "c:\cygwin_packages"
    --root "C:\cygwin64"
    --categories Devel`)

    core.addPath(`C:\cygwin64\bin`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
