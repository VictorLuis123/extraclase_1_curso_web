class Paciente {
    constructor(nombre, apellidos, ci, sala, edad, municipio, sexo) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.ci = ci;
        this.sala = sala;
        this.edad = edad;
        this.municipio = municipio;
        this.sexo = sexo;
    }
    /*Metodos de acceso*/
    _get_nombre() {
        return this.nombre;
    }
    _get_apellidos() {
        return this.apellidos;
    }
    _get_ci() {
        return this.ci;
    }
    _get_sala() {
        return this.sala;
    }
    _get_edad() {
        return this.edad;
    }
    _get_municipio() {
        return this.municipio;
    }
    _get_sexo() {
        return this.sexo;
    }
}
class Hospital {
    constructor(listaPacientes) {
        this.listaPacientes = listaPacientes;
        this.setId = new Set();
        for (let i of listaPacientes) {
            this.setId.add(i._get_ci());
        }
    }
    _agregar_paciente(paciente1) {
        this.listaPacientes.push(paciente1);
        this.setId.add(paciente1._get_ci());
    }
    _listado_ordenado() {
        let listaOrdenada = [];
        let talla = this.listaPacientes.length;
        for (let i = 0; i < talla; i++) {
            listaOrdenada.push(this.listaPacientes[i]._get_nombre());
            listaOrdenada[i] += (" " + this.listaPacientes[i]._get_apellidos());
        }
        return listaOrdenada.sort();
    }
    _total_femenino() {
        let cantFemenino = 0;
        let talla = this.listaPacientes.length;
        for (let i = 0; i < talla; i++) {
            if (this.listaPacientes[i]._get_sexo() == "F") {
                cantFemenino++;
            }
        }
        return cantFemenino;
    }
    _total_masculino() {
        let cantMasculino = 0;
        let talla = this.listaPacientes.length;
        for (let i = 0; i < talla; i++) {
            if (this.listaPacientes[i]._get_sexo() == "M") {
                cantMasculino++;
            }
        }
        return cantMasculino;
    }
    _get_edad_media() {
        let edadMedia = 0;
        for (let i of this.listaPacientes) {
            edadMedia += i._get_edad();
        }
        edadMedia /= (this.listaPacientes.length);
        return edadMedia;
    }
    //Listado con los pacientes con la edad superior a la media
    _lista_edad_mayor() {
        let media = this._get_edad_media();
        let arreglo_aux = [];
        let talla = this.listaPacientes.length;
        for (let i = 0; i < talla; i++) {
            if (this.listaPacientes[i]._get_edad() > media) {
                arreglo_aux.push(this.listaPacientes[i]._get_nombre());
            }
        }
        return arreglo_aux;
    }
    _esta_presente(id) {
        return this.setId.has(id);
    }
    _mayores_ingresos() {
        let arr = [];
        let mapa1 = new Map();
        let talla = this.listaPacientes.length;
        let maxi = -1;
        for (let i = 0; i < talla; i++) {
            let municipio_aux = this.listaPacientes[i]._get_municipio();
            if (!mapa1.has(municipio_aux)) {
                mapa1.set(municipio_aux, 1);
                for (let k = i + 1; k < talla; k++) {
                    if (municipio_aux == this.listaPacientes[k]._get_municipio()) {
                        let temp = parseInt(mapa1.get(municipio_aux));
                        mapa1.set(municipio_aux, temp + 1);
                    }
                }
                if (maxi < parseInt(mapa1.get(municipio_aux))) {
                    maxi = parseInt(mapa1.get(municipio_aux));
                }
            }
        }
        mapa1.forEach((value, key) => {
            console.log("valor del mapa1: " + value);
            if (parseInt(value) == maxi) {
                arr.push(key);
            }
        });
        return arr;
    }
}
///////////////////////////////////////////////
function maker() {
    console.log("Hello");
    let arrPaciente = [];
    for (let i = 1; i <= 3; i++) {
        //console.log("Paciente numero "+ i+" : " );
        let nombre = prompt("Nombre: ");
        let apellidos = prompt("Apellidos: ");
        let CI = prompt("CI: ");
        let sala = prompt("Sala: ");
        let edad = prompt("Edad: ");
        let municipio = prompt("Municipio: ");
        let sexo = prompt("Sexo: ");
        let instanciaPaciente = new Paciente(nombre, apellidos, CI, sala, edad, municipio, sexo);
        arrPaciente.push(instanciaPaciente);
    }
    let instanciaHospital = new Hospital(arrPaciente);
    /*
        do{
            
            let aux_ci:any=prompt("Introduzca CI y e diremos si esta: ");
            if(instanciaHospital._esta_presente(aux_ci)){
                console.log(aux_ci + " si esta presente");
            }else{
                console.log(aux_ci+ " No esta presente");
            }
        }while(true);
    
     let arr_ordenado:string[]=instanciaHospital._listado_ordenado();
        for(let i:number=0;i<arr_ordenado.length;i++){
            console.log(""+(i+1)+arr_ordenado[i]);
        }
        console.log("femeninas: "+ instanciaHospital._total_femenino());
        console.log("masculinos: "+ instanciaHospital._total_masculino());
     
        let arr_mayor:string[]=instanciaHospital._lista_edad_mayor();
    
        for(let i:number=0;i<arr_mayor.length;i++){
            console.log(""+(i+1)+arr_mayor[i]);
        }
       
        let arr_ingresos:string[]=instanciaHospital._mayores_ingresos();
        for(let i:number=0;i<arr_ingresos.length;i++){
            console.log(""+arr_ingresos[i]);
        }
         */
}
