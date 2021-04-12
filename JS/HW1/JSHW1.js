// BT 1
function displayDate() {
    let result = new Date();
    document.getElementById('result1').innerHTML = result;
}

//BT 2

function displayMulDate() {
    let date = new Date();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let year = date.getFullYear();
    result = month + "-" + day + '-' + year + ', ' + month + '/' + day + '/' + year + ', ' + day + '-' + month + '-' + year + ', ' + day + '/' + month + '/' + year;
    document.getElementById('result2').innerHTML = result;
}

//BT 3
function checkAscend() {
    let number = document.getElementById('input3').value;
    let result = true;
    for (let i = 0; i < number.length; i++) {
        if (number[i] > number[i + 1]) result = false;
    }
    document.getElementById('result3').innerHTML = result;
}

//BT4
function nextChar() {
    let str = document.getElementById('input4').value;
    let strResult = "";
    for (let i = 0; i < str.length; i++) {
        let temp = str.charCodeAt(i);
        if (((temp >= 65) && (temp <= 90)) || ((temp >= 97) && (temp <= 122))) {
            if ((temp == 90) || (temp == 122)) {
                strResult += String.fromCharCode(str.charCodeAt(i));
            } else {
                strResult += String.fromCharCode(str.charCodeAt(i) + 1);
            }
        } else strResult = "Mời bạn nhập ký tự trong bảng chữ cái !";
    }

    document.getElementById('result4').innerHTML = strResult;
}
//BT5

function middlePart() {
    let str = document.getElementById("input5").value;
    let result = "";
    if (str.length < 3) {
        result = "Mời bạn nhập chuỗi có độ dài lớn hơn 3";
    } else if (str.length % 2 == 0) {
        result = "Mời nhập chuỗi có độ dài lẻ";
    } else {
        let middleIndex = (str.length - 1) / 2;
        result = str[middleIndex - 1] + str[middleIndex] + str[middleIndex + 1];
    }
    document.getElementById('result5').innerHTML = result;
}


//BT6

function numFreq() {
    let num = document.getElementById('input6').value;
    let count = {};
    for (let i = 0; i < num.length; i++) {
        let index = num[i];
        count[index] = count[index] ? count[index] + 1 : 1;
    }
    let resultArr = Object.keys(count);
    console.log(count);
    let max = count[resultArr[0]];
    let resultIndex = 0;
    for (let i = 1; i < resultArr.length; i++) {
        if (max < count[resultArr[i]]) {
            max = count[resultArr[i]];
            resultIndex = i;
        }
    }
    document.getElementById('result6').innerHTML = resultArr[resultIndex];
}

//BT 7

function checkJava() {
    let str = document.getElementById('input7').value;
    let result = false;
    for (let i = 0; i < str.length - 3; i++) {
        if ((str[i] == "j") && (str[i + 1] == "a") && (str[i + 2] == "v") && (str[i + 3] == "a")) result = true;
    }
    document.getElementById('result7').innerHTML = result;
}

//BT 8

function monthFromNumber() {
    let num = document.getElementById('input8').value;
    let result = "";
    switch (num) {
        case '1':
            result = "Tháng một";
            break;
        case '2':
            result = "Tháng hai";
            break;
        case '3':
            result = "Tháng ba";
            break;
        case '4':
            result = "Tháng tư";
            break;
        case '5':
            result = "Tháng năm";
            break;
        case '6':
            result = "Tháng sáu";
            break;
        case '7':
            result = "Tháng bảy";
            break;
        case '8':
            result = "Tháng tám";
            break;
        case '9':
            result = "Tháng chín";
            break;
        case '10':
            result = "Tháng mười";
            break;
        case '11':
            result = "Tháng mười một";
            break;
        case '12':
            result = "Tháng mười hai";
            break;
        default:
            result = "Mời nhập số trong khoảng từ 1 - 12";
    }
    document.getElementById('result8').innerHTML = result;
}

//BT 9

function longestWord() {
    let str = document.getElementById('input9').value;
    let arr = str.split(" ");
    let maxIndex = 0;
    let maxLength = arr[0].length;
    for (let i = 1; i < arr.length; i++) {
        if (maxLength < arr[i].length) {
            maxLength = arr[i].length;
            maxIndex = i;
        }
    }
    document.getElementById('result9').innerHTML = arr[maxIndex];
}

//BT 10 
function findPrime() {
    let firstNum = parseInt(document.getElementById('input10-first').value);
    let secondNum = parseInt(document.getElementById('input10-second').value);
    let lower = firstNum > secondNum ? secondNum : firstNum;
    let upper = firstNum > secondNum ? firstNum : secondNum;
    let result = [];
    for (let i = lower; i <= upper; i++) {
        if (isPrime(i)) result.push(i);
    }
    document.getElementById('result10').innerHTML = result;
}

function isPrime(num) {
    let result = true;
    for (let i = 2; i < Math.sqrt(num); i++) {
        if (num % i == 0) result = false;
    }
    return result;
}