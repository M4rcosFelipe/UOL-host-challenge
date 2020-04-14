let jsonData="";
let mes=[];

async function getSheetData(index){
  try{
    const response=await fetch(`https://spreadsheets.google.com/feeds/cells/1QiF7o8cDRZQtmRxxT3lPyozbyx82e4bKJoRRClvq6zs/${index}/public/full?alt=json`);
    const result=await response.json();
    const content=result.feed.entry;
    return content
  }catch(err){
    console.log(`Erro >${err}< na folha ${index}`);
  }
}

function getAllData(){

  Promise.all(
    [
      getSheetData(1),
      getSheetData(2),
      getSheetData(3),
      getSheetData(4),
      getSheetData(5),
      getSheetData(6),
      getSheetData(7),
      getSheetData(8),
      getSheetData(9),
      getSheetData(10),
      getSheetData(11),
      getSheetData(12)
    ]
    ).then((content)=>{

        jsonData=content;

        if(jsonData.length<12){
          getAllData();
        }else{
          makeJSON(jsonData);
        }

      });
}

function makeJSON(data){

	for(let i=0;i<data.length;i++){
    const monthData=generateMonth(i);
    mes.push(monthData);
  }
  console.log(mes);
}

function generateMonth(index){

  let monthData={
    nome:getCellValue(index,"A1"),
    dias:generateDays(index)
  };

  return monthData
}

function generateDays(sheetIndex){
  let days=[];
  
  const daysNumber=getMonthDays(sheetIndex);

  for(let i=2;i<daysNumber;i++){
    const rowData=getRow(sheetIndex,`${i}`);
    const day=generateDay(rowData,getCellValue(sheetIndex,"A1"));
    days.push(day);
  }
  return days
}

function generateDay(data,sheetName){

  let dayData={
    dia:getItemValue(data[0]),
    id:"day"+getItemValue(data[0])+"_"+sheetName,
    eventos:generateEvents(data)
  };
  return dayData
}

function generateEvents(data){

  let eventos=[];
  
  for(let i=1;i<data.length;i=i+2){

    let evento={};

    if(data[i] && data[i+1]){
      evento.evento=getItemValue(data[i])
      evento.classe=getItemValue(data[i+1])
      eventos.push(evento);
    }    
  }
  return eventos
}

function getItemValue(element){
  //aceita objeto de sheet
  return element.gs$cell.inputValue;
}

function getRow(sheet,number){
  //aceita sheet
  let row=jsonData[sheet].filter((item)=>item.gs$cell.row===number);
  
	return row
}

function getColumn(sheet,number){
  //aceita sheet
  let column=jsonData[sheet].filter((item)=>item.gs$cell.col===number);
  
	return column
}

function getCell(sheet,coord){
  //aceita sheet
  let cell=jsonData[sheet].filter((item)=>item.title.$t===coord);
  
	return cell[0]
}

function getCellValue(sheet,coord){
	const cell= getCell(sheet,coord);
  const cellValue=cell.gs$cell.inputValue;
  
	return cellValue
}

function getMonthDays(monthIndex){
  const daysColumn=getColumn(monthIndex,"2");

  return daysColumn.length+1
}

getAllData();