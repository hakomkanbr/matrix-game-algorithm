import chalk from "chalk";

var input = [
    ["0","1","0","0","0","0","0","0","0","0"],
    ["0","1","0","1","1","1","1","0","1","1"],
    ["0","1","1","1","0","0","1","1","1","0"],
    ["0","0","0","0","0","1","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0"],
    // ["0","0","0","0","0","0","0","0","0","0"],
];

var output = [];
var routes = [];
var xxxx = [];

const findTheDoorFromTop = () => {
    for (let entry = 0; entry < input.length; entry++) {
        // row
        var row = input[entry];
        var arr = [];
        for (let g = 0; g < row.length; g++) {
            var cell = row[g];
            if(entry === 0 && cell == 1){
                var a = foundRoute(entry,g,"t");
                routes.push(a);
            }else if(entry === input.length-1 && cell == 1){
                var a = foundRoute(entry,g,"b");
                routes.push(a);
            }else if( g == 0  && cell == 1){
                var a = foundRoute(entry,g,"r");
                routes.push(a);
            }else if(g == row.length-1  && cell == 1){
                var a = foundRoute(entry,g,"l");
                routes.push(a);
            }
            arr.push(entry+"#"+g);
        }
        output.push(arr);
    }
}
const foundRoute = (rowIndex,itemIndex,side)=>{
    var arr = [rowIndex+"#"+itemIndex];
    var down = findDownCell(rowIndex,itemIndex);
    var top = findTopCell(rowIndex,itemIndex);
    var right = findRightCell(rowIndex,itemIndex);
    var left = findLeftCell(rowIndex,itemIndex);
    xxxx.push(...arr);
    if(side != "r" && left.status){
        const e = foundRoute(left.rowIndex,left.itemIndex,"l");
        arr.push(...e);
    }
    if(side != "l" && right.status){
        const e = foundRoute(right.rowIndex,right.itemIndex,"r");
        arr.push(...e);
    }
    if(side != "b" && down.status){
        const e = foundRoute(down.rowIndex,down.itemIndex,"t");
        arr.push(...e);
    }
    if(side != "t" && top.status){
        const e = foundRoute(top.rowIndex,top.itemIndex,"b");
        arr.push(...e);
    }

    return arr;
}
const findTopCell = (rowIndex,itemIndex) => {
 if(rowIndex === 0 || input[rowIndex] == undefined)  {
    return {
        status : false,
    };
 };
 return {
    status : 1 == input[rowIndex-1][itemIndex],
    rowIndex: rowIndex-1,
    itemIndex,
 };
}
const findDownCell = (rowIndex,itemIndex) => {
 if(rowIndex >= input.length-1) return{
    status : false
 }; 
 return {
    status : 1 == input[rowIndex+1][itemIndex],
    rowIndex: rowIndex+1,
    itemIndex,
 };
}
const findRightCell = (rowIndex,itemIndex) => {
  var r = input[rowIndex];
 return {
    status : r !=undefined && 1 == input[rowIndex][itemIndex+1],
    rowIndex: rowIndex,
    itemIndex:itemIndex+1,
 };
}
const findLeftCell = (rowIndex,itemIndex) => {
    var r = input[rowIndex];
    return {
        status : r != undefined && input[rowIndex][itemIndex-1] == 1,
        rowIndex: rowIndex,
        itemIndex: itemIndex-1,
    };
}
findTheDoorFromTop();


console.info("___input___");
for (let a = 0; a < input.length; a++) {
    var txt = "";
    var row = input[a];
    for (let b = 0; b < row.length; b++) {
        var findInRoute = xxxx.findIndex(i=>i==row[b]);
        if (input[a][b] === "1") {
            txt += chalk.bgGreen(" # ");
        } else {
            txt += chalk.bgYellow(" # ");
        }
    }
    console.log(txt);
}
console.info("___output___");
for (let a = 0; a < output.length; a++) {
    var txt = "";
    var row = output[a];
    for (let b = 0; b < row.length; b++) {
        var findInRoute = xxxx.findIndex(i=>i==row[b]);
        if(xxxx[findInRoute] == row[b]){
            txt += chalk.bgGreen(" # ");
        } else if (input[a][b] === "1") {
            txt += chalk.bgRed(" # ");
        } else {
            txt += chalk.bgYellow(" # ");
        }
    }
    console.log(txt);
}