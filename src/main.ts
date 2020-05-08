import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    const cuda9 = await tc.downloadTool('https://developer.nvidia.com/compute/cuda/9.0/Prod/local_installers/cuda_9.0.176_384.81_linux-run')
    await exec.exec(`sudo sh ${cuda9} --silent --toolkit --override`)
    process.chdir('/usr/local/cuda-9.0')
    await exec.exec('ls')
    await io.rmRF(`${cuda9}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
