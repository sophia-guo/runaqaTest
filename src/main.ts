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
    const freeMarker = await tc.downloadTool(`https://sourceforge.net/projects/freemarker/files/freemarker/2.3.8/freemarker-2.3.8.tar.gz/download`)
    await exec.exec(`sudo tar -xzf ${freeMarker} freemarker-2.3.8/lib/freemarker.jar --strip=2`)
    await io.rmRF(`${freeMarker}`)
    exec.exec('ls')

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
