"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function sortBySides(array) {
    var leftList = [];
    var rightList = [];
    array.forEach(function (n, index) {
        if (index % 2 === 0) {
            leftList.push(n);
        }
        else {
            rightList.push(n);
        }
    });
    return { leftList: leftList, rightList: rightList };
}
function sortAscending(array) {
    if (array.length <= 1) {
        return array;
    }
    var pivotIndex = Math.floor(array.length / 2);
    var pivot = array[pivotIndex];
    var left = [];
    var right = [];
    for (var i = 0; i < array.length; i++) {
        if (i === pivotIndex)
            continue; // skip the pivot element
        if (array[i] < pivot) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
    return __spreadArray(__spreadArray(__spreadArray([], sortAscending(left), true), [pivot], false), sortAscending(right), true);
}
function calcDistanceForEach(firstArr, secondArr) {
    var distanceArr = [];
    var maxLenght = Math.max(firstArr.length, secondArr.length);
    for (var i = 0; i < maxLenght; i++) {
        var firstVal = firstArr[i] || 0;
        var secondVal = secondArr[i] || 0;
        var diff = Math.abs(firstVal - secondVal);
        distanceArr.push(diff);
    }
    return distanceArr;
}
function calcTotalDistance(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return sum;
}
// const arrInput: number[] = [3, 4, 4, 3, 2, 5, 1, 3, 3, 9, 3, 3];
var arrInput = (0, fs_1.readFileSync)("./input.txt", "utf-8")
    .trim()
    .split("\n")
    .flatMap(function (line) {
    return line
        .trim()
        .split(/\s+/)
        .map(function (num) { return Number(num); });
});
var _a = sortBySides(arrInput), leftList = _a.leftList, rightList = _a.rightList;
console.log("Left Side: \n", leftList);
console.log("Right Side: \n", rightList);
console.log("left length:", leftList.length);
console.log("right length:", rightList.length);
var sortedLeftList = sortAscending(leftList);
var sortedRightList = sortAscending(rightList);
console.log("Left Side Sorted: \n", sortedLeftList);
console.log("Right Side Sorted: \n", sortedRightList);
var distanceArr = calcDistanceForEach(sortedLeftList, sortedRightList);
var totalDistance = calcTotalDistance(distanceArr);
console.log("Distances between all the pairs... \n", distanceArr);
console.log("Total Distance all the pairs... \n", totalDistance);
