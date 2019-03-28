/* eslint-disable no-console,promise/param-names */
const yargs = require('yargs')
// 上传文件的插件
const Client = require('ssh2-sftp-client')
const fs = require('fs')
const difference = require('lodash/difference')
const sortBy = require('lodash/sortBy')
const utils = require('./utils')

utils.assert(process.env.CHANNEL, 'CHANNEL未定义')

const channel = process.env.CHANNEL
const options = {
  staging: {
    host: '139.224.49.88',
    username: 'root',
    localDir: 'staging',
    remoteDir: '/usr/share/nginx/html/testing/zhiyuan_h5_other/' + channel,
    privateKey: fs.readFileSync('ssh_key')
  },
  production: {
    host: '139.224.49.88',
    username: 'root',
    localDir: 'dist',
    remoteDir: '/usr/share/nginx/html/production/zhiyuan_h5_other/' + channel,
    privateKey: fs.readFileSync('ssh_key')
  }
}
const excludeFiles = [
  /.html$/,
  /.json$/
]

// yargs 模块能够解决如何处理命令行参数
// usage 用法格式
// alias 指定别名
// describe 提示
// demand 是否必选
// help 显示帮助信息
const argv = yargs
  .usage('deploy [args]')
  .alias('e', 'env')
  .describe('e', 'choose your environment')
  .choices('e', ['staging', 'production'])
  .demand('e')
  .help('h')
  .alias('h', 'help')
  .argv

start(options[argv.env])

async function start (config) {
  console.log('开始上传')
  const sftp = new Client()
  try {
    await sftp.connect(config)
    // create a new directory.
    await sftp.mkdir(config.remoteDir, true)
    const remoteFilePaths = await getFilePaths(config.remoteDir, {
      // 检索目录列表
      // bind()方法创建一个新的函数， 当这个新函数被调用时其this置为提供的值，其参数列表前几项置为创建时指定的参数序列。
      iterator: sftp.list.bind(sftp),
      stats ({ type, name }) {
        return {
          isDir: type === 'd',
          name
        }
      },
      filter ({ name }, path) {
        const exclude = excludeFiles.map(regex => regex.test(name)).some(v => v)
        return !exclude
        // return /^(?!.*?\.html$)/.test(name)
      }
    })
    const localFilePaths = await getFilePaths(config.localDir, {
      iterator: dir =>
        new Promise((resole, reject) => {
          fs.readdir(dir, (err, items) => {
            err ? reject(err) : resole(items)
          })
        }),
      stats (file, dir) {
        return {
          isDir: fs.statSync(`${dir}/${file}`).isDirectory(),
          name: file
        }
      }
    })
    const uploadFilePaths = difference(localFilePaths, remoteFilePaths)
    await uploadFiles(sftp, config.localDir, config.remoteDir, uploadFilePaths, {
      sort (file) {
        return /\.html$/.test(file) ? 1 : 0
      },
      uploading ({ percent, path }) {
        console.log('上传中', path)
        console.log('进度:' + percent + '%')
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    sftp.end()
    console.log('上传完成')
  }
}

async function getFilePaths (
  baseDir,
  {
    dir = '', // 相对父路径
    iterator, // 文件迭代器
    stats, // 判断文件类型和提取文件信息的函数,包含isDir和name
    filter = () => true // 文件过滤
  }
) {
  const relativePath = `${baseDir}${dir}`
  const _files = iterator(relativePath)
  const files = typeof _files.then === 'function' ? await _files : _files
  let list = []
  for (let i = 0; i < files.length; i++) {
    const { isDir, name } = stats(files[i], relativePath)
    if (isDir) {
      const subDirFiles = await getFilePaths(baseDir, {
        dir: `${dir}/${name}`,
        stats,
        iterator,
        filter
      })
      list = list.concat(subDirFiles)
    } else {
      if (filter(files[i], relativePath)) {
        list = list.concat(`${dir}/${name}`)
      }
    }
  }
  return list
}

async function uploadFiles (sftp, localDir, remoteDir, files, { sort, uploading }) {
  const sortedFiles = sort ? sortBy(files, sort) : files
  for (let i = 0; i < sortedFiles.length; i++) {
    const path = sortedFiles[i]
    try {
      const local = `${localDir}${path}`
      const remote = `${remoteDir}${path}`
      await sftp.mkdir(remote.substring(0, remote.lastIndexOf('/')), true)
      await sftp.put(local, remote)
      const percent = ((i + 1) / sortedFiles.length * 100).toFixed(2)
      typeof uploading === 'function' &&
      uploading({
        percent,
        path
      })
    } catch (err) {
      console.log(err)
    }
  }
}
