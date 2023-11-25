//chrome://extensions/
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletee=document.getElementById("delete-btn")
const myLeadsFromLocal=JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")


console.log(myLeadsFromLocal)
if (myLeadsFromLocal) {
    myLeads = myLeadsFromLocal
    render(myLeads)
}



tabBtn.addEventListener("click", function(){
    tabBtn.addEventListener("click", function(){    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        })
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deletee.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})



