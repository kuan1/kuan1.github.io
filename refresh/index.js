/**
 * 同步数据
 */
const fs = require("fs");
const axios = require("axios");

const size = 10000;

async function get() {
  const {
    data: { data }
  } = await axios.get(
    "https://www.luzhongkuan.cn/api/blog/syncData?size=" + size
  );
  return data;
}

async function download(list) {
  list.forEach(data => {
    const name = `${__dirname}/../source/_posts/${
      data.create_time.split(" ")[0]
    }${data.title.replace("/", "-").replace(/\s/gi, "-")}.md`;
    console.log(data.title);
    const content = `---
title: ${data.title}
date: ${data.create_time}
---
${data.content}
  `;
    fs.writeFileSync(name, content, "utf-8");
  });
}

async function refrefsh() {
  const data = await get();
  download(data);
  console.log("success!!");
}

// 开始同步数据
refrefsh();
