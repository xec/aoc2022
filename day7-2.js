let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

let root = {
  name: '/',
  type: 'dir',
  parent: null,
  files: [],
  childrenDirs: []
}

let currentDir = root

function changeDir(dirName) {
  if (dirName === '/') {
    currentDir = root
    return
  }
  if (dirName === '..') {
    currentDir = currentDir.parent
    return
  }
  const foundDir = currentDir.childrenDirs.find(x => x.name === dirName)
  if (foundDir) {
    // sub dir already exists, navigate to it
    currentDir = foundDir
    return
  }
  // create dir
  const newDir = {
    name: dirName,
    type: 'dir',
    parent: currentDir,
    files: [],
    childrenDirs: []
  }
  currentDir.childrenDirs.push(newDir)
  // and navigate to it
  currentDir = newDir
}

function command(linestr) {
  const [_, cmd, param] = linestr.split(' ')
  switch (cmd) {
    case 'cd':
      changeDir(param)
      break;
    // ignore ls command
  }
}

function addFile(lineStr) {
  const [size, name] = lineStr.split(' ')
  // create file obj
  currentDir.files.push({ type: 'file', name, size: Number(size) })
}

function processLine(lineStr) {
  // debugger;
  const split = lineStr.split(' ')
  if (split[0] === '$') {
    command(lineStr)
  }
  else if (split[0] === 'dir') {
    // ignore dirs? only create if needed to enter - maybe this is dumb
  }
  else {
    // assume everything else is a file
    addFile(lineStr)
  }
}

// process each line of input to create hierarchy on root obj
input.split('\n').forEach(processLine)

function calcDirSize(dir) {
  const filesSum = dir.files.reduce((sum, file) => sum + file.size, 0)
  // calc recursively on dirs
  const dirsSum = dir.childrenDirs.reduce((sum, childDir) => sum + calcDirSize(childDir), 0)
  // store result on dir obj for later use
  dir.sum = filesSum + dirsSum
  return dir.sum
}

const totalSums = calcDirSize(root)

const diskTotal = 70000000
const requiredSpace = 30000000
const freeSpace = diskTotal - root.sum
const additionalSpaceNeeded = requiredSpace - freeSpace
console.log({ rootsum: root.sum, freeSpace, additionalSpaceNeeded })

function walkTree(dir, cb) {
  dir.childrenDirs.forEach(d => walkTree(d, cb))
  cb(dir)
}

let sumsOfDirectoriesAboveSpaceNeeded = []
walkTree(root, dir => {
  if (dir.sum > additionalSpaceNeeded) sumsOfDirectoriesAboveSpaceNeeded.push(dir.sum)
})

console.log(sumsOfDirectoriesAboveSpaceNeeded.sort((a, b) => a - b))