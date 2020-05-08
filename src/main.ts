import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

async function run(): Promise<void> {
  try {
    const opensslV = await tc.downloadTool('https://www.openssl.org/source/old/1.0.2/openssl-1.0.2r.tar.gz')
    tc.extractTar(`${opensslV}`, `${process.cwd()}`)
    await exec.exec('ls')
    process.chdir('openssl-1.0.2r')
    await exec.exec(`sudo ./config --prefix=/usr/local/openssl-1.0.2 shared && make && make install`)
    await exec.exec('ls /usr/local/')
    await io.rmRF(`${opensslV}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
