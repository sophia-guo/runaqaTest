import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as path from 'path'

let tempDirectory = process.env['RUNNER_TEMP'] || ''
const IS_WINDOWS = process.platform === 'win32'
// const targetOs = IS_WINDOWS ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux'

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
  try {
    const antContribFile = await tc.downloadTool(`https://sourceforge.net/projects/ant-contrib/files/ant-contrib/ant-contrib-1.0b2/ant-contrib-1.0b2-bin.zip/download`)
    await tc.extractZip(`${antContribFile}`, `${process.env.ANT_HOME}`)
    core.info(`the ant_home path is ${process.env.ANT_HOME}`)
    await exec.exec(`ls ${process.env.ANT_HOME}`)
    await tc.extractZip(`${antContribFile}`, `${process.env.ANT_HOME}\\lib`)
    await exec.exec(`ls ${process.env.ANT_HOME}\\lib`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
