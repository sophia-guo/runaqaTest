import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    const version = '14'
    const bootjdkVersion = (parseInt(version) - 1).toString()
    const bootjdkJar = await tc.downloadTool(`https://api.adoptopenjdk.net/v2/binary/releases/openjdk${bootjdkVersion}?openjdk_impl=openj9&os=linux&arch=x64&release=latest&heap_size=normal&type=jdk`)
    await io.mkdirP('bootjdk')
    await exec.exec('ls')
    await exec.exec(`sudo tar -xzf ${bootjdkJar} -C ./bootjdk --strip=1`)
 //   await tc.extractTar(`${bootjdk13}`, `${workDir}/bootjdk13`, '-xzf --strip-components=1')
    await io.rmRF(`${bootjdkJar}`)
    await exec.exec('ls')
    process.chdir('bootjdk13')
    await exec.exec('ls')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
