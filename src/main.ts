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
  if (typeof process.env.GITHUB_HEAD_REF === 'undefined') {
    core.info('GITHUB_REF ${process.env.GITHUB_REF}')
    const ref = process.env.GITHUB_REF as string
    core.info(`ref is ${ref}`)
    const branch = ref.substr(ref.lastIndexOf('/') + 1)
    core.info(`branch is ${branch}`)
  } else {
    core.info(`branh is ${process.env.GITHUB_HEAD_REF}`)
  }


  if (typeof process.env.GITHUB_REF === 'undefined') {
    core.info('undefinec')

  } else {
    core.info(`defined ${process.env.GITHUB_REF}`)
  }
//  await exec.exec(`C:\\temp\\cygwin.exe  -q -P autoconf cpio libguile2.0_22 unzip zipcurl curl-debuginfo libcurl-devel libpng15 libpng-devel`)
}

run()
