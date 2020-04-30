import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    let myInput = core.getInput('myInput');
    core.info(`what is the myInput is ${myInput}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
