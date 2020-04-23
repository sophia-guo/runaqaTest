import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    core.info(`git_ref is ${process.env.GITHUB_REF}`)
    await exec.exec('ls')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
