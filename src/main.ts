import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    const defaultMyInput = core.getInput('myInput') === 'true'
    core.info(`what is defatul ${defaultMyInput}`)
    
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
