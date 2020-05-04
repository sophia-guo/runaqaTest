import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    await exec.exec('brew install gnu-tar')
    core.addPath('/usr/local/opt/gnu-tar/libexec/gnubin')
    core.info(`path is ${process.env['PATH']}`)
    exec.exec('printenv')
    exec.exec('tar --version')

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
