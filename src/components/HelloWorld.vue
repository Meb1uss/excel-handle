<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
// npm i xlsx-D

// 存放数据
let data = ref([]);
// 数据长度
let length = ref();

// 切换 active
let isActive = ref(true);

function changeActive1() {
  isActive.value = true;
}

function changeActive2() {
  isActive.value = false;
}

// excel 转化为 Json
function getExcel(e) {
  let fileObj = e.target.files[0];
  console.log(fileObj);

  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(fileObj);

  fileReader.onload = (e) => {
    const fileData = e.target.result;

    const workbook = XLSX.read(fileData, {
      type: "binary",
    });

    const wsname = workbook.SheetNames[0];

    const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);

    data.value = sheetJson;
    length.value = data.value.length;
  };
}

/* 根据 isActice 判断功能 */
function changeData() {
  if (!isActive.value) {
    // 对齐词相同，拼接未处理词
    concat();
    length.value = data.value.length;
  } else {
    filter();
  }
}

/* 对齐词相同，则拼接未处理词 */
function concat() {
  for (let i = 0; i < data.value.length - 1; i++) {
    let j = i + 1;
    if (data.value[j]["对齐"] === data.value[i]["对齐"]) {
      data.value[i]["未处理词"] =
        data.value[i]["未处理词"] + "," + data.value[j]["未处理词"];
      data.value.splice(j, 1);
      i--;
    }
  }
}

function filter() {
  // 筛选出要处理的词
  data.value = data.value.filter((item) => {
    return item["处理类型"] != "暂不处理";
  });
  data.value.forEach((item) => {
    item["一类词"] = "";
    item["二类词"] = "";
    item["三类词"] = "";
    // 将词分类
    if (item["词的类型"] === "一类词") {
      item["一类词"] = item["实体词"];
    } else if (item["词的类型"] === "二类词") {
      item["二类词"] = item["实体词"];
    } else {
      item["三类词"] = item["实体词"];
    }
    for (let key in item) {
      if (
        key !== "一类词" &&
        key !== "二类词" &&
        key !== "三类词" &&
        key !== "实体标准名称（非电商标题名称）" &&
        key !== "实体ID"
      ) {
        delete item[key];
      }
    }
  });
  removeDuplicate(data.value);
}

function removeDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      // console.log(arr[j]);
      if (
        arr[i]["实体标准名称（非电商标题名称）"] ===
        arr[j]["实体标准名称（非电商标题名称）"]
      ) {
        cilei(arr[i], arr[j]);
        arr.splice(j, 1);
        j--;
      }
    }
  }
  length.value = data.value.length;
}

function cilei(i, j) {
  if (j["一类词"]) {
    if (i["一类词"]) {
      i["一类词"] = i["一类词"] + "," + j["一类词"];
    } else {
      i["一类词"] = j["一类词"];
    }
  } else if (j["二类词"]) {
    if (i["二类词"]) {
      i["二类词"] = i["二类词"] + "," + j["二类词"];
    } else {
      i["二类词"] = j["二类词"];
    }
  } else {
    if (i["三类词"]) {
      i["三类词"] = i["三类词"] + "," + j["三类词"];
    } else {
      i["三类词"] = j["三类词"];
    }
  }
}

function createExcel() {
  const xlsxObj = {
    SheetNames: ["sheet1"],
    Sheets: {
      ["sheet1"]: XLSX.utils.json_to_sheet(data.value),
    },
  };
  XLSX.writeFile(xlsxObj, "xxx.xlsx");
}
</script>

<template>
  <div class="wrapper">
    <div class="btn" :class="{ active: isActive }" @click="changeActive1">
      实体词
    </div>
    <div
      class="btn btn2"
      :class="{ active: isActive === false }"
      @click="changeActive2"
    >
      对齐
    </div>
  </div>

  <article>
    <input type="file" @change="getExcel" />
    <button @click="changeData">改变格式</button>

    <button @click="createExcel">生成Excel</button>
    <h1>{{ length }}</h1>
    <table v-if="isActive">
      <thead>
        <tr>
          <th>实体ID</th>
          <th>实体词</th>
          <th>一类词</th>
          <th>二类词</th>
          <th>三类词</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data">
          <td>{{ item["实体ID"] }}</td>
          <td>{{ item["实体标准名称（非电商标题名称）"] }}</td>
          <td>{{ item["一类词"] }}</td>
          <td>{{ item["二类词"] }}</td>
          <td>{{ item["三类词"] }}</td>
        </tr>
      </tbody>
    </table>

    <table v-else>
      <thead>
        <tr>
          <th>对齐</th>
          <th>未处理词</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data">
          <td>{{ item["对齐"] }}</td>
          <td>{{ item["未处理词"] }}</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<style scoped>
.wrapper {
  display: flex;
  background-color: #e4f0f5;
  height: 100px;
  align-items: center;
  margin-bottom: 20px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  width: 137px;
  height: 62px;
  font-size: 18px;
  font-weight: bolder;
  background-color: #fff;
  text-decoration: none;
  color: #000;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
}

.btn:hover,
.active {
  background-color: #a6cfe2;
  box-shadow: inset 0 0 0 3px #fff;
}

li div {
  display: flex;
  justify-content: center;
}

table {
  width: 100%;
}

th {
  background-color: #e4f0f5;
}

tbody tr:nth-child(2n) {
  background-color: #ffffff;
}

tbody tr:nth-child(2n + 1) {
  background-color: #edeef2;
}
</style>
