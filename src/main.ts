import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    const bootjdkJar = await tc.downloadTool(`https://github.com/AdoptOpenJDK/openjdk10-binaries/releases/download/jdk-10.0.2%2B13.1/OpenJDK10U-jdk_x64_mac_hotspot_10.0.2_13.tar.gz`)
    await exec.exec(`sudo tar -xzf ${bootjdkJar} -C ./ --strip=3`)
    await exec.exec('ls')
    core.info("hello")
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
