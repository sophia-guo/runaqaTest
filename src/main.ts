import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as path from 'path'

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
    await io.mkdirP('C:\\cygwin64')
    await io.mkdirP('C:\\cygwin_packages')
    exec.exec('ls')
    const cyginSetup = await tc.downloadTool('https://cygwin.com/setup-x86_64.exe', 'C:\\temp\\cygwin.exe ')
    await exec.exec(`C:\\temp\\cygwin.exe  --quiet-mode --download --local-install
    --delete-orphans --site  https://mirrors.kernel.org/sourceware/cygwin/
    --local-package-dir "C:\\cygwin_packages"
    --root "C:\cygwin64"
    --categories Devel`)
    await exec.exec(`C:\\temp\\cygwin.exe  -q -P autoconf cpio libguile2.0_22 unzip zipcurl curl-debuginfo libcurl-devel libpng15 libpng-devel perl-Text-CSV`)
    await exec.exec(`C:/cygwin64/bin/git config --system core.autocrlf false`)

    core.addPath(`C:\\cygwin64\\bin`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
