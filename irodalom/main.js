const array=[
    {szerzo: "Balassi Bálint", kor: "reformáció", szerelmek: ["Losonczy Anna", "Dobó Krisztina"]},
    {szerzo: "Csokonai Vitéz Mihály", kor: "felvilágosodás", szerelmek: ["Vajda Juliána", undefined]},
    {szerzo: "Petőfi Sándor", kor: "magyar romantika", szerelmek: ["Mednyánszky Berta", "Szendrey Júlia"]},
    {szerzo: "Ady Endre", kor: "20. század", szerelmek: ["Léda", "Csinszka"]}
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
        if(person.szerelmek[1] === undefined && person.szerelmek[0] !== undefined)
            add(person.szerelmek[0], tr, "td").colSpan=2;
        if(person.szerelmek[0] === undefined && person.szerelmek[1] !== undefined)
            add(person.szerelmek[1], tr, "td").colSpan=2;
        if(person.szerelmek[0] !== undefined && person.szerelmek[1] !== undefined){
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