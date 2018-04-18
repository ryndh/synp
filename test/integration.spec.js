'use strict'

const test = require('tape')
const fs = require('fs')
const lockfile = require('@yarnpkg/lockfile')
const eol = require('eol')
const {
  createYarnLogicalTree,
  createNpmLogicalTree
} = require('./util/normalized-logical-trees')
const { stubs } = require('./fixtures/manifest-cache')

const { yarnToNpm, npmToYarn } = require('../')

stubs()

test('translate with one root dependency', async t => {
  t.plan(2)
  try {
    const path = `${__dirname}/fixtures/single-root-dep`
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    t.deepEquals(
      JSON.parse(await yarnToNpm(path)),
      JSON.parse(packageLock),
      'can convert yarn to npm'
    )
    t.deepEquals(
      lockfile.parse(await npmToYarn(path)),
      lockfile.parse(yarnLock),
      'can convert npm to yarn'
    )
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with multiple-level dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-level-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with multiple-level dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-level-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with multiple root dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with multiple root dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with root devDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-devdeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with root devDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-devdeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with dependencies that override devDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/deps-override-devdeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with root optionalDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-optionaldeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with root optionalDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-optionaldeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with dependencies that override optionalDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/deps-override-optionaldeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with root dependencies, devDependencies and optionalDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-alldeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with root dependencies, devDependencies and optionalDependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/multiple-root-alldeps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with scopes', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/deps-with-scopes`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with scopes', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/deps-with-scopes`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with bundled dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/bundled-deps-npm`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with bundled dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/bundled-deps-yarn`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with github dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/github-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with github dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/github-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with file dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/file-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with file dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/file-deps`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with url dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/url-dep`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const snapshot = fs.readFileSync(`${path}/.package-lock-snapshot`, 'utf-8')
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockParsed = lockfile.parse(yarnLock)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate package-lock to yarn.lock with url dependencies', async t => {
  try {
    t.plan(2)
    const path = `${__dirname}/fixtures/url-dep`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await npmToYarn(path)
    const snapshot = fs.readFileSync(`${path}/.yarn-snapshot`, 'utf-8')
    const resParsed = lockfile.parse(res).object
    const packageLock = fs.readFileSync(`${path}/package-lock.json`, 'utf-8')
    const packageLockParsed = JSON.parse(packageLock)
    const resultLogicalTree = createYarnLogicalTree(resParsed, packageJson)
    const packageLockLogicalTree = createNpmLogicalTree(packageLockParsed, packageJson)
    t.deepEquals(packageLockLogicalTree, resultLogicalTree, 'result logically identical to original')
    t.equals(res, snapshot, 'result identical to saved snapshot')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('translate yarn.lock to package-lock with crlf line ending', async t => {
  try {
    t.plan(1)
    const path = `${__dirname}/fixtures/yarn-crlf`
    const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'))
    const res = await yarnToNpm(path)
    const resParsed = JSON.parse(res)
    const yarnLock = fs.readFileSync(`${path}/yarn.lock`, 'utf-8')
    const yarnLockNormalized = eol.lf(yarnLock)
    const yarnLockParsed = lockfile.parse(yarnLockNormalized)
    const yarnLogicalTree = createYarnLogicalTree(yarnLockParsed.object, packageJson)
    const resultLogicalTree = createNpmLogicalTree(resParsed, packageJson)
    t.deepEquals(yarnLogicalTree, resultLogicalTree, 'result logically identical to original')
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('error => corrupted package-lock to yarn.lock', async t => {
  try {
    t.plan(1)
    const path = `${__dirname}/fixtures/single-dep-corrupted-version`
    try {
      await npmToYarn(path)
      t.fail('did not throw')
    } catch (e) {
      t.ok(
        /^404 Not Found:/.test(e.message),
        'proper error message'
      )
    }
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('error => no source file', async t => {
  t.plan(2)
  try {
    const path = `${__dirname}/fixtures/foo`
    try {
      await npmToYarn(path)
      t.fail('did not throw error when converting to yarn')
    } catch (e) {
      t.ok(
        e.message.includes('no such file or directory'),
        'proper error thrown when converting to yarn'
      )
    }
    try {
      await yarnToNpm(path)
      t.fail('did not throw error when converting to npm')
    } catch (e) {
      t.ok(
        e.message.includes('no such file or directory'),
        'proper error thrown when converting to npm'
      )
    }
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})

test('error => no package.json', async t => {
  t.plan(2)
  try {
    const path = `${__dirname}/fixtures/no-package-json`
    try {
      await npmToYarn(path)
      t.fail('did not throw error when converting to yarn')
    } catch (e) {
      t.ok(
        e.message.includes('no such file or directory'),
        'proper error thrown from npmToYarn for non-existent path'
      )
    }
    try {
      await npmToYarn(path)
      t.fail('did not throw error when converting to yarn')
    } catch (e) {
      t.ok(
        e.message.includes('no such file or directory'),
        'proper error thrown from yarnToNpm for non-existent path'
      )
    }
  } catch (e) {
    t.fail(e.stack)
    t.end()
  }
})
