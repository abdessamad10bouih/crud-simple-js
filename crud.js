var block1 = document.getElementById("block1");
var numero = document.getElementById("numero");
var nom = document.getElementById("nom");
var note = document.getElementById("note");
var filier = document.getElementById("filier");
var data = [
  {
    numero: "0679103679",
    nom: "Abdessamad Bouih",
    note: "16",
    filier: "DEVOFS201",
  },
  {
    numero: "0678193417",
    nom: "Talal AitMouh",
    note: "14",
    filier: "DEVOFS201",
  },
  {
    numero: "0679103679",
    nom: "Ahmed Ouhssini",
    note: "18",
    filier: "DEVOFS201",
  },
  {
    numero: "0678193417",
    nom: "Youssef Elhaouil",
    note: "14",
    filier: "DEVOFS201",
  },
];

if (!localStorage.getItem("db")) {
  localStorage.setItem("db", JSON.stringify(data));
}

let db = JSON.parse(localStorage.getItem("db"));

//all stagiares
const all = () => {
  document.getElementById("tbody").innerHTML = ``;
  for (let i = 0; i < db.length; i++) {
    document.getElementById("tbody").innerHTML += `
                <tr>
                    <td class="border px-4 py-2">${i + 1}</td>
                    <td class="border px-4 py-2">${db[i].numero}</td>
                    <td class="border px-4 py-2">${db[i].nom}</td>
                    <td class="border px-4 py-2">${db[i].note}</td>
                    <td class="border px-4 py-2">${db[i].filier}</td>
                    <td class="border px-4 py-2 gap-3 flex justify-between">
                        <div id="edit" onclick="modifierForm(${i})" class="w-10 h-10 rounded-full bg-green-600 flex justify-center items-center text-white cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div onclick="deleteStg(${i})" class="w-10 h-10 rounded-full bg-red-600 flex justify-center items-center text-white cursor-pointer"><i class="fa-solid fa-trash"></i></div>
                    </td>
                </tr>
    `;
  }
  document.getElementById("total").innerHTML = db.length;
};

//display form add
const displayFormAdd = () => {
  document.getElementById("formAdd").style.display = "flex";
  document.getElementById("modifierForm").style.display = "none";
};

//Adding a stagiaire
const addStg = (e) => {
  e.preventDefault();
  var nomVal = nom.value;
  var numeroVal = numero.value;
  var noteVal = note.value;
  var filierVal = filier.value;

  if (nomVal == "" || numeroVal == "" || noteVal == "" || filierVal == "") {
    alert("Veuillez remplir tous les champs");
    return;
  }
  var stg = {
    nom: nomVal,
    numero: numeroVal,
    note: noteVal,
    filier: filierVal,
  };
  db.push(stg);
  localStorage.setItem("db", JSON.stringify(db));
  alert("stagiaire ajoute");
  all();
  document.getElementById("total").innerHTML = data.length;
  document.getElementById("formAdd").style.display = "none";
};
//deleting a stagiaire
const deleteStg = (id) => {
  db.splice(id, 1);
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    document.getElementById("tbody").innerHTML += `
                <tr>
                    <td class="border px-4 py-2">${i + 1}</td>
                    <td class="border px-4 py-2">${db[i].numero}</td>
                    <td class="border px-4 py-2">${db[i].nom}</td>
                    <td class="border px-4 py-2">${db[i].note}</td>
                    <td class="border px-4 py-2">${db[i].filier}</td>
                    <td class="border px-4 py-2 gap-3 flex justify-between">
                        <div id="edit" onclick="modifierForm(${i})" class="w-10 h-10 rounded-full bg-green-600 flex justify-center items-center text-white cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div onclick="deleteStg(${i})" class="w-10 h-10 rounded-full bg-red-600 flex justify-center items-center text-white cursor-pointer"><i class="fa-solid fa-trash"></i></div>
                    </td>
                </tr>
    `;
  }
  document.getElementById("total").innerHTML = db.length;
};

// update stagiere

const modifierForm = (id) => {
  document.getElementById("modifierForm").style.display = "flex";
  document.getElementById("formAdd").style.display = "none";
  document.getElementById("uNumero").value = db[id].numero;
  document.getElementById("uNom").value = db[id].nom;
  document.getElementById("uNote").value = db[id].note;
  document.getElementById("uFilier").value = db[id].filier;

  document.getElementById("modifierForm").onsubmit = (event) => {
    event.preventDefault();
    var stg = {
      nom: document.getElementById("uNom").value,
      numero: document.getElementById("uNumero").value,
      note: document.getElementById("uNote").value,
      filier: document.getElementById("uFilier").value,
    };

    db.splice(id, 1, stg);
    localStorage.setItem("db", JSON.stringify(db));
    all();
    document.getElementById("modifierForm").style.display = "none";
  };
};

let search = document.getElementById("search");
// search.addEventListener("keyup", () => {
//   // Clear the tbody before appending new rows
//   document.getElementById("tbody").innerHTML = "";

//   // Loop through each item in db and filter based on search input
//   db.map((filier) => {
//     if (filier.filier.toLowerCase().includes(search.value.toLowerCase())) {
//       document.getElementById("tbody").innerHTML += `
//         <tr>
//           <td class="border px-4 py-2">${filier.id}</td>
//           <td class="border px-4 py-2">${filier.numero}</td>
//           <td class="border px-4 py-2">${filier.nom}</td>
//           <td class="border px-4 py-2">${filier.note}</td>
//           <td class="border px-4 py-2">${filier.filier}</td>
//         </tr>
//       `;
//     }
//   });

//   // If the search value is empty, show all records
//   if (search.value == "") {
//     db.forEach((filier) => {
//       document.getElementById("tbody").innerHTML += `
//         <tr>
//           <td class="border px-4 py-2">${filier.id}</td>
//           <td class="border px-4 py-2">${filier.numero}</td>
//           <td class="border px-4 py-2">${filier.nom}</td>
//           <td class="border px-4 py-2">${filier.note}</td>
//           <td class="border px-4 py-2">${filier.filier}</td>
//         </tr>
//       `;
//     });
//   }
// });

search.addEventListener("keyup", () => {
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < db.length; i++) {
    if (db[i].filier.toLowerCase().includes(search.value.toLowerCase())) {
      document.getElementById("tbody").innerHTML += `
        <tr>
           <td class="border px-4 py-2">${i}</td>
           <td class="border px-4 py-2">${db[i].numero}</td>
           <td class="border px-4 py-2">${db[i].nom}</td>
           <td class="border px-4 py-2">${db[i].note}</td>
           <td class="border px-4 py-2">${db[i].filier}</td>
           <td class="border px-4 py-2 gap-3 flex justify-between">
                        <div id="edit" onclick="modifierForm(${i})" class="w-10 h-10 rounded-full bg-green-600 flex justify-center items-center text-white cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></div>
                        <div onclick="deleteStg(${i})" class="w-10 h-10 rounded-full bg-red-600 flex justify-center items-center text-white cursor-pointer"><i class="fa-solid fa-trash"></i></div>
            </td>
         </tr>
      `;
    }
  }
});
