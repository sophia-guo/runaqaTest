import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    const defaultMyInput = core.getInput('myInput') === 'true'
    core.info(`what is defatul ${defaultMyInput}`)
    const jdkJar= await tc.downloadTool(`https://api.adoptopenjdk.net/v3/binary/latest/10/ga/mac/x64/jdk/openj9/normal/adoptopenjdk`)
    await exec.exec(`sudo tar -xzf ${jdkJar} -C ./ --strip=3`)
    exec.exec('ls')
  
    
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
