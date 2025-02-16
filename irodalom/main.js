const array=[
    {szerzo: "Balassi Bálint", kor: "reformáció", szerelmek: ["Losonczy Anna", "Dobó Krisztina"], masik: true},
    {szerzo: "Csokonai Vitéz Mihály", kor: "felvilágosodás", szerelmek: ["Vajda Juliána", undefined],  masik: false},
    {szerzo: "Petőfi Sándor", kor: "magyar romantika", szerelmek: ["Mednyánszky Berta", "Szendrey Júlia"],  masik: true},
    {szerzo: "Ady Endre", kor: "20. század", szerelmek: ["Léda", "Csinszka"],  masik: true}
]
make();
function make(){
    const form=document.createElement("form");
    form.setAttribute("id", "form");
    form.setAttribute("action", "#s");
    const args=[{id: "kolto_nev", szoveg: "Költő neve:", type: "text"},
        {id: "korszak", szoveg: "Korszak:", type: "text"},
        {id: "szerelem1", szoveg: "Szerelme:", type: "text"},
        {id: "masodik", szoveg: "Volt másik szerelme?", type: "checkbox"},
        {id: "szerelem2", szoveg: "Szerelme:", type: "text"}
    ];
    for(const arg of args){
        const label=document.createElement("label");
        label.setAttribute("for", arg.id);
        label.innerHTML=arg.szoveg;
        form.appendChild(label);
        const input=document.createElement("input");
        input.setAttribute("type", arg.type);
        input.setAttribute("id", arg.id);
        input.setAttribute("name", arg.id);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));
        if(arg.id==="masodik"){
            const b=document.createElement("b");
            b.setAttribute("style", "color: red;");
            b.setAttribute("id", "b");
            form.appendChild(b);
        }
        form.appendChild(document.createElement("br"));
    }
    const button = document.createElement("button");
    button.innerHTML="Hozzáadás";
    form.appendChild(button);
    document.body.appendChild(form);
}
create(true);
/**
 * @param {boolean} elso 
 */
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
    add("Szerző neve", tr1, "th");
    add("Korszak", tr1, "th");
    add("Szerelmek", tr1, "th").colSpan=2;
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    thead.appendChild(tr1);
    table.appendChild(tbody);
    for(const person of array){
        const tr = document.createElement("tr")
        tbody.appendChild(tr);
        add(person.szerzo, tr, "td");
        add(person.kor, tr, "td");
        if((person.szerelmek[0] === "-" || !person.masik) && person.szerelmek[1] === undefined )
            add(person.szerelmek[0], tr, "td").colSpan=2;
        else if(person.szerelmek[0] === "-" && person.szerelmek[1] !== undefined)
            add(person.szerelmek[1], tr, "td").colSpan=2;
        else if(person.szerelmek[1] !== undefined && person.masik){
            add(person.szerelmek[0], tr, "td");
            add(person.szerelmek[1], tr, "td");
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
    if(document.getElementById("kolto_nev").value==="")
        document.getElementById("kolto_nev").setAttribute("class", "hiba");
    else{
        document.getElementById("kolto_nev").removeAttribute("class");
    }
        
    if(document.getElementById("korszak").value==="")
        document.getElementById("korszak").setAttribute("class", "hiba");
    else{
        document.getElementById("korszak").removeAttribute("class");
    }
    document.getElementById("b").innerHTML="";
    if((document.getElementById("masodik").checked && document.getElementById("szerelem1").value==="") || (document.getElementById("masodik").checked && document.getElementById("szerelem2").value==="")){
        document.getElementById("b").innerHTML="A költőnek kötelező megadni a szerelemeit";
    }
    else if(document.getElementById("korszak").value!=="" && document.getElementById("kolto_nev").value!==""){
        array.push({
            szerzo: document.getElementById("kolto_nev").value,
            kor: document.getElementById("korszak").value,
            szerelmek: [document.getElementById("szerelem1").value===""?"-":document.getElementById("szerelem1").value, document.getElementById("szerelem2").value===""?undefined:document.getElementById("szerelem2").value],
            masik: document.getElementById("masodik").checked?true:false
        })
    }
    //console.log(array)
    document.getElementById("tab").innerHTML="";
    create(false);
}