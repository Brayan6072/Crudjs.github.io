function ValidarDatos(){
    var name = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var direccion = document.getElementById("direccion").value;
    var email = document.getElementById("email").value;

    if(name == ""){
        alert("Verifica tu nombre");
        return false;
    }

    if(edad == ""){
        alert("Verifica tu edad");
        return false;
    }else if(edad < 1){
        alert("Edad debe ser un numero positivo")
        return false;
    }

    if(direccion == ""){
        alert("Verifica tu direccion");
        return false;
    }

    if(email == ""){
        alert("Verifica tu email");
        return false;
    }else if(!email.includes("@")){
        alert("Este email no es valido");
        return false;

    }
    return true;


}

function MostrarDatos(){
    var peopleList;
    if (localStorage.getItem("peopleList") == null){
        peopleList=[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    } 
    var html="";
    peopleList.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.edad + "</td>";
        html += "<td>" + element.direccion + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + '<button onclick= "EliminarDatos('+index+')" class ="btn btn-danger"> Eliminar</button><button onclick= "ActualizarDatos('+
        index+')" class ="btn btn-warning m-2"> Actualizar</button></td>';
        html += "</tr>";


        document.querySelector("#crudTable tbody").innerHTML = html;
    });
}
document.onload = MostrarDatos();

function AgregarDatos(){
    if(ValidarDatos() == true){
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var direccion = document.getElementById("direccion").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null){
            peopleList=[];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        } 

        peopleList.push({
            nombre : nombre, 
            edad : edad ,
            direccion: direccion,
            email: email,
        });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        MostrarDatos();
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("email").value = "";
    }
};

function EliminarDatos(index){
    var peopleList;
    if (localStorage.getItem("peopleList") == null){
        peopleList=[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    } 

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    MostrarDatos();
};

function ActualizarDatos(index){
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null){
        peopleList=[];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    } 


    document.getElementById("nombre").value = peopleList[index].nombre;
    document.getElementById("edad").value = peopleList[index].edad;
    document.getElementById("direccion").value = peopleList[index].direccion;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function(){
        if(ValidarDatos() == true){
            peopleList[index].nombre = document.getElementById("nombre").value;
            peopleList[index].edad = document.getElementById("edad").value;
            peopleList[index].direccion = document.getElementById("direccion").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            MostrarDatos();

            document.getElementById("nombre").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }

    }
};