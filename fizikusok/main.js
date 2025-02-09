const array=[
    {ag: "optika", kor: "XI. század", tudosok: ["Alhazen"]},
    {ag: "Asztronómia", kor: "reneszánsz", tudosok: ["Kepler", "Galilei"]},
    {ag: "Kvantumfizika", kor: "XIX-XX. század", tudosok: ["Max Planck", "Albert Einstein"]},
    {ag: "Modern fizika", kor: "XX-XXI. század", tudosok: ["Richard Feynman", "Stephen Hawking"]}
]

create()
function create(){
    const table = document.createElement("table");
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
        if(person.tudosok.length === 1)
            add(person.tudosok[0], tr, "td").colSpan=2;
        else{
            add(person.tudosok[0], tr, "td")
            add(person.tudosok[1], tr, "td")
        }
    }
    
}
/**
 * 
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