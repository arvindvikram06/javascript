

const outputValue = document.getElementById("user-output");

document.querySelectorAll(".num").forEach((item)=>{
    item.addEventListener("click",(e)=>{
        if(outputValue.innerText === "NaN"){
            outputValue.innerText = "";
        }
        if(outputValue.innerText === "0"){
            outputValue.innerText = "";
        }
        outputValue.innerText += e.target.innerHTML.trim();
        console.log(outputValue);

        
    })
})

document.querySelectorAll(".operator").forEach((item)=>{
    item.addEventListener("click",(e)=>{

        let lastValue = outputValue.innerText.trim().slice(-1)

        if (lastValue=== "=") return;

        if(["+","-","*","/","%"].includes(lastValue)){
            return;
        }

        outputValue.innerText += e.target.innerHTML.trim();
      
    })
    
})


document.querySelector(".equals").addEventListener("click", () => {
    let expression = outputValue.innerText;
    let lastChar = expression.slice(-1);

    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
        outputValue.innerText = "NaN";
        return;
    }

    try {
        let result = eval(expression);
        outputValue.innerText = result;
        
    } catch {
        outputValue.innerText = "NaN";
    }
});

document.querySelectorAll(".non-op").forEach((item)=>{
    item.addEventListener("click",(e)=>{
        if(e.target.innerHTML.trim() == "AC"){
            outputValue.innerText="0";
        }
        if(e.target.innerHTML.trim() == "Del"){
             let text = outputValue.innerText.trim();
             outputValue.innerText = text.substring(0,text.length - 1);

             if(outputValue.innerText.length == 0){
                outputValue.innerText = "0";
             }
        }
    })
})