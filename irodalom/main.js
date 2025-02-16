const array=[
    {szerzo: "Balassi Bálint", kor: "reformáció", szerelmek: ["Losonczy Anna", "Dobó Krisztina"], masik: true},
    {szerzo: "Csokonai Vitéz Mihály", kor: "felvilágosodás", szerelmek: ["Vajda Juliána", undefined],  masik: false},
    {szerzo: "Petőfi Sándor", kor: "magyar romantika", szerelmek: ["Mednyánszky Berta", "Szendrey Júlia"],  masik: true},
    {szerzo: "Ady Endre", kor: "20. század", szerelmek: ["Léda", "Csinszka"],  masik: true}
]
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
        if(person.szerelmek[0] === "-" || person.szerelmek[1] === undefined || !person.masik)
            add(person.szerelmek[0], tr, "td").colSpan=2;
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
    if(document.getElementById("korszak").value!=="" && document.getElementById("kolto_nev").value!==""){
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