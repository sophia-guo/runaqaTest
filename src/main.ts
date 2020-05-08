import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as path from "path"

let tempDirectory = process.env["RUNNER_TEMP"] || "";
const IS_WINDOWS = process.platform === "win32";
let OS = IS_WINDOWS ? "windows" : process.platform === "darwin" ? "mac" : "linux";

if (!tempDirectory) {
  let baseLocation;

  if (IS_WINDOWS) {
      // On windows use the USERPROFILE env variable
      baseLocation = process.env["USERPROFILE"] || "C:\\";
  } else if (process.platform === "darwin") {
      baseLocation = "/Users"
  } else {
      baseLocation = "/home"
  }
  tempDirectory = path.join(baseLocation, "actions", "temp")
}

async function run(): Promise<void> {
  try {
    const opensslV = await tc.downloadTool('https://www.openssl.org/source/old/1.0.2/openssl-1.0.2r.tar.gz')
    await tc.extractTar(`${opensslV}`, `${tempDirectory}`)
    await exec.exec('ls')
    process.chdir(`${tempDirectory}/openssl-1.0.2r`)
    await exec.exec(`sudo ./config --prefix=/usr/local/openssl-1.0.2 shared`)
    await exec.exec(`sudo make`)
    await exec.exec(`sudo make install`)
    await exec.exec('ls /usr/local/')
    await io.rmRF(`${opensslV}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
