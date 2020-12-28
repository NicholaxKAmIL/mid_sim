var data = JSON.parse(Kdata);
//動態產生表單
function tableCreate(){
    var weeks = ['節次','時間','星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
    var times = ['','08:10~09:00','09:10~10:00','10:10~11:00','11:10~12:00','12:40~13:30','13:40~14:30','14:40~15:30','15:40~16:30','16:40~17:30','17:40~18:30','18:35~19:25','19:30~20:20','20:25~21:15','21:20~22:10'];
    var times = ['','08~09','09~10','10~11','11~12','12~13','13~14','14~15','15~16','16~17','17~18','18~19','19~20','20~21','21~22'];

    var body = document.body,
        tbl  = document.createElement('table');
    $(tbl).addClass("table");

    let rowHeader = document.createElement('div');
    $(rowHeader).addClass("rowHeader")

    let containerTable = document.createElement("div");
    $(containerTable).addClass("container-table100")
    let wrapTable = document.createElement("div");
    $(wrapTable).addClass("wrap-table100")




    var dataIndexx=0,dataIndexy=0;
    //var KKK;

    
    console.log(data);
    var button;
    var buttonCount=1;

    for(var i = 0; i < 15; i++){
        var tr = tbl.insertRow();

        for(var j = 0; j < 9; j++){
            var td = tr.insertCell();
            $(td).addClass=("cell");
            if(i==0){
                td.appendChild(document.createTextNode(weeks[j]));
                $(td).addClass=("row header");
            }else if(i!=0&&j==0){
                td.appendChild(document.createTextNode(i));
            }else if(i!=0&&j==1){
                td.appendChild(document.createTextNode(times[i]));
            }
            else{
                //KKK = document.createTextNode(dataIndexx+','+dataIndexy);
                button = document.createElement('button');
                button.innerHTML = buttonCount;
                buttonCount++;
                $(button).css("width","100%");

                let week = button.innerHTML%7;
                let time = parseInt(button.innerHTML/7)+1;
                button.id='td'+week+'_'+time;

                button.onclick = function(){
                    $("#myModal").modal();
                    let week = this.innerHTML%7;
                    let time = parseInt(this.innerHTML/7)+1;
                    this.id='td'+week+'_'+time;

                    var output=[];
                    var outputID =[];
                    this.innerHTML = week+','+time;
                    for(var Dc=0;Dc<data.length;Dc++){

                        for(var Sc=0;Sc<data[Dc].Time.length;Sc++){  //把時間拆開
                            //console.log("Functioned");
                            var timeCal = data[Dc].Time.substr(Sc,1);
                            var weekCal = data[Dc].Week;
                            //console.log("timeCal:"+timeCal+",weekCal:"+weekCal+"\ntime:"+time+",week:"+week);

                            if((timeCal == time) &&(weekCal==week)){
                                //console.log("MATCH"+data[Dc].name);
                                output.unshift(data[Dc].Name);
                                outputID.unshift(data[Dc].Code);

                            }                      

                        }

                    }
                    var modBody = document.getElementById("modal-body");
                    console.log('課程名字:',output);
                    modBody.innerHTML = output;
                    popUpBtn(output,outputID,this.id);


                    console.log('課程ID:',outputID);
                    //alert(this.innerHTML+','+week+','+time+'\n');
                    return false;
                };
                td.appendChild(button);
                dataIndexy++; 
            }          
        }
    dataIndexx++;
    dataIndexy=1;
    }

    body.appendChild(tbl);
    body.appendChild(containerTable);
    containerTable.appendChild(wrapTable);
    wrapTable.appendChild(tbl);

}

//藉由按鈕的ID搜尋這個時間點的所有課程
function searchByLocationID(locationID,selectedName){
    
    let searchIndexWeek = locationID.substring(2,3);
    let searchIndexClass = locationID.substring(4,5);
    
    let searchResultName = [];
    let searchResultID = [];
    
    for(var Dc=0;Dc<data.length;Dc++){

        for(var Sc=0;Sc<data[Dc].Time.length;Sc++){  //把時間拆開
            //console.log("Functioned");
            var timeCal = data[Dc].Time.substr(Sc,1);
            var weekCal = data[Dc].Week;
            //console.log("timeCal:"+timeCal+",weekCal:"+weekCal+"\ntime:"+searchIndexClass+",week:"+searchIndexWeek);

            if((timeCal == searchIndexClass) &&(weekCal==searchIndexWeek)){
                //console.log("timeCal:"+timeCal+",weekCal:"+weekCal+"\ntime:"+searchIndexClass+",week:"+searchIndexWeek);
                //console.log("MATCH"+data[Dc].name);
                searchResultName.unshift(data[Dc].Name);
                searchResultID.unshift(data[Dc].Code);
                //outputID.unshift(data[Dc].Code);

            }                      

        }

    }
    //console.log("ANS:",searchResult);   
    for(let i = 0;i<searchResultName.length;i++){
        if(selectedName == searchResultName[i]){
            chainSearch(locationID,searchResultName[i],searchResultID[i])
        }
    }
}
//搜尋並自動填入所有符合selectedID的時間課程
function chainSearch(locationID,selectedName,selectedID){
    let searchIndexWeek = locationID.substring(2,3);
    let searchIndexClass = locationID.substring(4,5);
    
    for(let i=0;i<data.length;i++){

        if(selectedID == data[i].Code){
            let timePre = data[i].Time;
            timePre = timePre.replace(/,/g,'');  //正則表達刪除所有","
            console.log("timePre:",timePre);
            
            for(let k=0;k<timePre.length;k++){
                let chainLocationID = [];
                let timeCal = timePre.substr(k,1);
                chainLocationID.push('td'+data[i].Week+'_'+timeCal);
                console.log("Total:",timePre,'k',k," time",timeCal,'\n',chainLocationID);
                
                for(let routing =0;routing<chainLocationID.length;routing++){
                    let callBackTD = document.getElementById(chainLocationID[routing]);

                    //let callBackTD = document.getElementById(locationID);
                    callBackTD.innerHTML = data[i].Name;    
                }
                
                
            }
        }
        

    }
    
}
