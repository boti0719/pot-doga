const array=[
    {ag: "optika", kor: "XI. század", tudosok: ["Alhazen", undefined]},
    {ag: "Asztronómia", kor: "reneszánsz", tudosok: ["Kepler", "Galilei"]},
    {ag: "Kvantumfizika", kor: "XIX-XX. század", tudosok: ["Max Planck", "Albert Einstein"]},
    {ag: "Modern fizika", kor: "XX-XXI. század", tudosok: ["Richard Feynman", "Stephen Hawking"]}
]
make();
function make(){
    const form=document.createElement("form");
    form.setAttribute("id", "form");
    form.setAttribute("action", "#s");
    const args=[{id: "fizika", szoveg: "Terület megnevezése"}, {id: "ido", szoveg: "Időszak:"}, {id: "tudos1", szoveg: "Első tudós:"}, {id: "tudos2", szoveg: "Második tudós:"}];
    for(const arg of args){
        const label=document.createElement("label");
        label.setAttribute("for", arg.id);
        label.innerHTML=arg.szoveg;
        form.appendChild(label);
        const input=document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", arg.id);
        input.setAttribute("name", arg.id);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
        if(arg.id==="tudos1" || arg.id==="tudos2"){
            const b=document.createElement("b");
            b.setAttribute("style", "color: red;");
            if(arg.id==="tudos1")
                b.setAttribute("id", "b");
            else
                b.setAttribute("id", "b2");
            form.appendChild(b);
        }
        form.appendChild(document.createElement("br"));
    }
    const button = document.createElement("button");
    button.innerHTML="Hozzáadás";
    form.appendChild(button);
    document.body.appendChild(form);
}
create(true)
function create(elso){
    let table;
    if (elso){
        table = document.createElement("table");
        table.setAttribute("id","tab");
    }else{
        table = document.getElementById("tab")
    }
    document.body.appendChild(table);
    const thead = document.createElement("thead")
    const tr1 = document.createElement("tr");
    add("Fizika területe", tr1, "th");
    add("Időszak", tr1, "th");
    add("Képviselők", tr1, "th").colSpan=2;
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    thead.appendChild(tr1);
    table.appendChild(tbody);
    for(const person of array){
        const tr = document.createElement("tr")
        tbody.appendChild(tr);
        add(person.ag, tr, "td");
        add(person.kor, tr, "td");
        if(person.tudosok[1] === undefined && person.tudosok[0] !== undefined)
            add(person.tudosok[0], tr, "td").colSpan=2;
        if(person.tudosok[0] === undefined && person.tudosok[1] !== undefined)
            add(person.tudosok[1], tr, "td").colSpan=2;
        if(person.tudosok[0] !== undefined && person.tudosok[1] !== undefined){
            add(person.tudosok[0], tr, "td");
            add(person.tudosok[1], tr, "td");
        }
    }
    
}
/**
 * @param {String} text 
 * @param {HTMLTableElement} parent 
 * @param {"td"|"th"} type 
 * @returns
 */
function add(text, parent, type){
    const t=document.createElement(type)
    t.innerHTML=text
    parent.appendChild(t);
    return t
}

document.getElementById("form").onsubmit=(e)=>{
    e.preventDefault();
    if(document.getElementById("fizika").value==="")
        document.getElementById("fizika").setAttribute("class", "hiba");
    else{
        document.getElementById("fizika").removeAttribute("class");
    }
        
    if(document.getElementById("ido").value==="")
        document.getElementById("ido").setAttribute("class", "hiba");
    else{
        document.getElementById("ido").removeAttribute("class");
    }

    if(document.getElementById("tudos1").value==="" && document.getElementById("tudos2").value===""){
        document.getElementById("b").innerHTML="Legalább egy tudóst meg kell adni";
        document.getElementById("b2").innerHTML="Legalább egy tudóst meg kell adni";
        document.getElementById("tudos1").setAttribute("class", "hiba");
        document.getElementById("tudos2").setAttribute("class", "hiba");
    }else{
        document.getElementById("b").innerHTML="";
        document.getElementById("b2").innerHTML="";
        document.getElementById("tudos1").removeAttribute("class", "hiba");
        document.getElementById("tudos2").removeAttribute("class", "hiba");
    }
    if((document.getElementById("tudos1").value!=="" || document.getElementById("tudos2").value!=="") && document.getElementById("ido").value!=="" && document.getElementById("fizika").value!==""){
        array.push({
            ag: document.getElementById("fizika").value,
            kor: document.getElementById("ido").value,
            tudosok: [document.getElementById("tudos1").value===""?undefined:document.getElementById("tudos1").value, document.getElementById("tudos2").value===""?undefined:document.getElementById("tudos2").value]
        })
    }
    //console.log(array)
    document.getElementById("tab").innerHTML="";
    create(false);
}