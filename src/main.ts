import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as path from 'path'

let tempDirectory = process.env['RUNNER_TEMP'] || ''
const IS_WINDOWS = process.platform === 'win32'
const targetOs = IS_WINDOWS ? 'windows' : process.platform === 'darwin' ? 'mac' : 'linux'
const workDir = process.env['GITHUB_WORKSPACE']
if (!tempDirectory) {
  let baseLocation

  if (IS_WINDOWS) {
    // On windows use the USERPROFILE env variable
    baseLocation = process.env['USERPROFILE'] || 'C:\\'
  } else if (process.platform === 'darwin') {
    baseLocation = '/Users'
  } else {
    baseLocation = '/home'
  }
  tempDirectory = path.join(baseLocation, 'actions', 'temp')
}

async function run(): Promise<void> {
  const bootjdkJar = await tc.downloadTool(`https://api.adoptopenjdk.net/v3/binary/latest/13/ga/${targetOs}/x64/jdk/openj9/normal/adoptopenjdk`)
  io.mkdirP('bootjdk')
  io.mkdirP('tctestdir')
  io.mkdirP('tctestdirWithStrip')
  if (`${targetOs}` === 'mac') {
    await exec.exec(`sudo tar -xzf ${bootjdkJar} -C ./bootjdk --strip=3`)
    process.chdir('bootjdk')
    await exec.exec('ls')
    process.chdir(`${workDir}`)
    await tc.extractTar(`${bootjdkJar}`, `./tctestdir`, '-xz --strip=3')
    process.chdir('tctestdir')
    await exec.exec('ls')
  } else if (`${targetOs}` === 'linux') {
    await exec.exec(`sudo tar -xzf ${bootjdkJar} -C ./bootjdk --strip=1`)
    process.chdir('bootjdk')
    await exec.exec('ls')
    process.chdir(`${workDir}`)
    await tc.extractTar(`${bootjdkJar}`, `./tctestdir`)
    process.chdir('tctestdir')
    await exec.exec('ls')
    process.chdir(`${workDir}`)
    await tc.extractTar(`${bootjdkJar}`, `./tctestdirWithStrip`, '-xz --strip=1')
    process.chdir('tctestdirWithStrip')
    await exec.exec('ls')
    process.chdir(`${workDir}`)
  } else {
    await io.mkdirP('C:\\cygwin64')
    await io.mkdirP('C:\\cygwin_packages')
    await tc.downloadTool('https://cygwin.com/setup-x86_64.exe', 'C:\\temp\\cygwin.exe')
    await exec.exec(`C:\\temp\\cygwin.exe  --packages wget,bsdtar,rsync,gnupg,git,autoconf,make,gcc-core,mingw64-x86_64-gcc-core,unzip,zip,cpio,curl,grep,perl --quiet-mode --download --local-install
    --delete-orphans --site  https://mirrors.kernel.org/sourceware/cygwin/
    --local-package-dir "C:\\cygwin_packages"
    --root "C:\\cygwin64"`)
  //  await exec.exec(`C:\\temp\\cygwin.exe  -q -P autoconf cpio libguile2.0_22 unzip zipcurl curl-debuginfo libcurl-devel libpng15 libpng-devel`)
    await exec.exec(`C:/cygwin64/bin/git config --system core.autocrlf false`)
    core.addPath(`C:\\cygwin64\\bin`)
    tc.extractZip(`${bootjdkJar}`, `./bootjdk`)
    process.chdir('bootjdk')
    await exec.exec('ls')
  }
}

run()
