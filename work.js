
var dl = data.length;
// console.log(dl)

var card = document.querySelector('.resulteList');
var areaShow = document.querySelector('#areaShow');
var tz = document.querySelector('.titleZone');

//搜尋JSON_ZONE資料，並自動刪除重複資料
function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }
     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

var uniqueArray = removeDuplicates(data, "Zone");
// console.log(uniqueArray);

//將上方資料FOR迴圈代入SELECT，並單獨新增"選擇行政區選項"
var areaStr = '';
for(var a=0;a<uniqueArray.length;a++){

    var zo_New = uniqueArray[a].Zone;
    var areaContent = '<option value="' + zo_New + '">' + zo_New + '</option>' ;
    areaStr += areaContent;
    areaShow.innerHTML = areaStr;

    var firstOptiopnNew = document.createElement('option');
    firstOptiopnNew.textContent = '--請選擇行政區--';
    firstOptiopnNew.setAttribute('value','請選擇行政區');
    firstOptiopnNew.setAttribute('class','selOpt');
    firstOptiopnNew.setAttribute('selected','selected');
    document.querySelector('#areaShow').appendChild(firstOptiopnNew);

    var firstOptionOld = document.getElementsByTagName("option")[0];
    areaShow.insertBefore(firstOptiopnNew,firstOptionOld);

}

// 當SELECT CHANGE更新
function update(e){
    var str = '';
    for(var i=0;i<dl;i++){
        var na = data[i].Name;
        var zo = data[i].Zone;
        var ot = data[i].Opentime;
        var ad = data[i].Add;
        var tel = data[i].Tel;
        var tt = data[i].Ticketinfo;
        var bg = data[i].Picture1;
        var areaName = e.target.value;

        if(tt == ""){
            tt = "沒有票務資訊"
        }
        
        if(zo == areaName){
            var content = `
            <div>
                <div class="card">
                    <div class="cardImg" style="background-image:url(${bg})">
                        <div class="imgInfo">
                            <div class="cardName">${na}</div>
                            <div class="cardZone">${zo}</div>
                        </div>
                    </div>
                    <div class="cardInfo">
                        <ul class="infoList">
                            <li class="icon1">${ot}</li>
                            <li class="icon2">${ad}</li>
                            <li class="icon3">${tel}</li>
                            <li class="icon4">${tt}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `
            str += content;
            card.innerHTML = str; 
            tz.textContent = zo;
            
        }else if(areaName == '請選擇行政區'){
            var content = `
            <div>
                <div class="card">
                    <div class="cardImg" style="background-image:url(${bg})">
                        <div class="imgInfo">
                            <div class="cardName">${na}</div>
                            <div class="cardZone">${zo}</div>
                        </div>
                    </div>
                    <div class="cardInfo">
                        <ul class="infoList">
                            <li class="icon1">${ot}</li>
                            <li class="icon2">${ad}</li>
                            <li class="icon3">${tel}</li>
                            <li class="icon4">${tt}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `
            str += content;
            card.innerHTML = str;
            tz.textContent = '';
        }
    }
}

areaShow.addEventListener('change',update,false);

// 一開始默認字串
var strDefault = '';

for(var c=0;c<dl;c++){
    var na = data[c].Name;
    var zo = data[c].Zone;
    var ot = data[c].Opentime;
    var ad = data[c].Add;
    var tel = data[c].Tel;
    var bg = data[c].Picture1;
    var tt = data[c].Ticketinfo;
    
    if(tt == ""){
        tt = "沒有票務資訊"
    }

    var content = `
    <div>
        <div class="card">
            <div class="cardImg" style="background-image:url(${bg})">
                <div class="imgInfo">
                    <div class="cardName">${na}</div>
                    <div class="cardZone">${zo}</div>
                </div>
            </div>
            <div class="cardInfo">
                <ul class="infoList">
                    <li class="icon1">${ot}</li>
                    <li class="icon2">${ad}</li>
                    <li class="icon3">${tel}</li>
                    <li class="icon4">${tt}</li>
                </ul>
            </div>
        </div>
    </div>
    `
    strDefault += content;
    card.innerHTML = strDefault ; 
}

var tagClick = document.querySelector('.hotUpdate');

// 點擊熱門行政區標籤時
function tagSel(t) {
    if(t.target.nodeName !== 'LI'){return};
    var thisTag = t.target.textContent;
    var clickStr = '';
    areaShow.value = thisTag;
    
    for(var d=0;d<dl;d++){
        var na = data[d].Name;
        var zo = data[d].Zone;
        var ot = data[d].Opentime;
        var ad = data[d].Add;
        var tel = data[d].Tel;
        var bg = data[d].Picture1;
        var tt = data[d].Ticketinfo;
        
        if(tt == ""){
            tt = "沒有票務資訊"
        }

        if(zo == thisTag){
            var content = `
            <div>
                <div class="card">
                    <div class="cardImg" style="background-image:url(${bg})">
                        <div class="imgInfo">
                            <div class="cardName">${na}</div>
                            <div class="cardZone">${zo}</div>
                        </div>
                    </div>
                    <div class="cardInfo">
                        <ul class="infoList">
                            <li class="icon1">${ot}</li>
                            <li class="icon2">${ad}</li>
                            <li class="icon3">${tel}</li>
                            <li class="icon4">${tt}</li>
                        </ul>
                    </div>
                </div>
            </div>
            `;
            clickStr += content;
            card.innerHTML = clickStr; 
            tz.textContent = zo;
        }
    }
}

tagClick.addEventListener('click',tagSel);