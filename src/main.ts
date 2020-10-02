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
  let jdkBootDir = ''
  if (IS_WINDOWS) {
    if (`JAVA_HOME_13_X64` in process.env) {
      jdkBootDir = process.env[`JAVA_HOME_13_X64`] as string
      core.info(`jdkbootDie is ${jdkBootDir}`)
      jdkBootDir = jdkBootDir.replace(/\s/g, '')
      jdkBootDir = jdkBootDir.replace(/ProgramFiles/g, 'Progra~1')
      core.info(`jdkbootDie is ${jdkBootDir}`)
    }
  }
//  await exec.exec(`C:\\temp\\cygwin.exe  -q -P autoconf cpio libguile2.0_22 unzip zipcurl curl-debuginfo libcurl-devel libpng15 libpng-devel`)
}

run()
