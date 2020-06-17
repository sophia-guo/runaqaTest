import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as path from 'path'
import * as fs from 'fs'

let tempDirectory = process.env['RUNNER_TEMP'] || ''
const IS_WINDOWS = process.platform === 'win32'
const targetOs = IS_WINDOWS ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux'
const workDir = process.env['GITHUB_WORKSPACE']
if (!tempDirectory) {
  let baseLocation

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
  let jdkBootDir = 'dd'
  core.info(`jdkboot DIR is ${jdkBootDir}`)
  let test = ''
  const bootJDKVersion = '13'
  if (`JAVA_HOME_${bootJDKVersion}_X64` in process.env) {
    jdkBootDir = process.env[`JAVA_HOME_${bootJDKVersion}_X86`] as string
    core.info(`JAVA_HOME_13_X64 is in here`)
    core.info(`jdkboot DIR insdied is ${jdkBootDir}`)
    test = 'new test'
    core.info(`new test is ${test}`)
  } else {
    jdkBootDir = 'testBOOT'
  }
  core.info(`jdkboot DIR is ${jdkBootDir}`)
  core.info(`newtest outside is ${test}`)
/*   if (IS_WINDOWS) {
    core.info(`install cygwin`)
    core.info(`mkdir cygwin`)
    await io.mkdirP('C:\\cygwin64')
    await io.mkdirP('C:\\cygwin_packages')
    await tc.downloadTool('https://cygwin.com/setup-x86_64.exe', 'C:\\temp\\cygwin.exe')
    await exec.exec(`C:\\temp\\cygwin.exe  --packages cygwin:3.1.4-1,wget,bsdtar,rsync,gnupg,git,autoconf,make,gcc-core,mingw64-x86_64-gcc-core,unzip,zip,cpio,curl,grep,perl --quiet-mode --download --local-install
    --delete-orphans --site  https://mirrors.kernel.org/sourceware/cygwin/
    --local-package-dir "C:\\cygwin_packages"
    --root "C:\\cygwin64"`)
  } */
//  await exec.exec(`C:\\temp\\cygwin.exe  -q -P autoconf cpio libguile2.0_22 unzip zipcurl curl-debuginfo libcurl-devel libpng15 libpng-devel`)
}

run()
