import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
  //  const defaultMyInput = core.getInput('myInput')
    await io.mkdirP('jdk')
    process.chdir('jdk')
    await io.mkdirP('boot')
    await io.mkdirP('home')
    core.setOutput('BuildJDKDir', `${process.env['GITHUB_WORKSPACE']}/jdk/boot`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
