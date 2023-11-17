class Paciente{
    private nombre:string;
    private apellidos:string;
    private ci:string;
    private sala:number;
    private edad:number;
    private municipio:string;
    private sexo:string;

    public constructor(nombre:string, apellidos: string, ci:string,
        sala:number,edad:number, municipio:string, sexo:string){
            this.nombre=nombre;
            this.apellidos=apellidos;
            this.ci=ci;
            this.sala=sala;
            this.edad=edad;
            this.municipio=municipio;
            this.sexo=sexo;
    }

    /*Metodos de acceso*/
    public _get_nombre():string{
        return this.nombre;
    }
    public _get_apellidos():string{
        return this.apellidos;
    }
    public _get_ci():string{
        return this.ci;
    }
    public _get_sala():number{
        return this.sala;
    }
    public _get_edad():number{
        return this.edad;
    }
    public _get_municipio():string{
        return this.municipio;
    }

    public _get_sexo():string{
        return this.sexo;
    }
}



class Hospital{
    private listaPacientes:Paciente[];
    private setId:Set<string>;
    public constructor(listaPacientes:Paciente[]){
        this.listaPacientes=listaPacientes;
        this.setId=new Set();
        for(let i of listaPacientes){
            this.setId.add(i._get_ci());
        }
    }

    public _agregar_paciente(paciente1:Paciente):void{
        this.listaPacientes.push(paciente1);
        this.setId.add(paciente1._get_ci());
    }

    public _listado_ordenado():string[]{
        let listaOrdenada:string[]=[];
        let talla:number=this.listaPacientes.length;
        for(let i:number=0;i<talla;i++){
            listaOrdenada.push(this.listaPacientes[i]._get_nombre());
            listaOrdenada[i]+=(" "+this.listaPacientes[i]._get_apellidos());
        }
        return listaOrdenada.sort();
    }

    public _total_femenino():number{
        let cantFemenino=0;
        let talla:number=this.listaPacientes.length;
        for(let i:number=0;i<talla;i++){
            if(this.listaPacientes[i]._get_sexo()=="F"){
                cantFemenino++;
            }

        }
        return cantFemenino;
    }


    public _total_masculino():number{
        let cantMasculino=0;
        let talla:number=this.listaPacientes.length;
        for(let i:number=0;i<talla;i++){
            if(this.listaPacientes[i]._get_sexo()=="M"){
                cantMasculino++;
            }
        }
        return cantMasculino;
    }

    public _get_edad_media():number{
        let edadMedia=0;
        for(let i of this.listaPacientes){
            edadMedia+=i._get_edad();
        }
        edadMedia/=(this.listaPacientes.length);
        return edadMedia;
    }

    //Listado con los pacientes con la edad superior a la media
    public _lista_edad_mayor():string[]{
        let media:number=this._get_edad_media();
        let arreglo_aux:string[]=[];
        let talla:number=this.listaPacientes.length;
        for(let i:number=0;i<talla;i++){
            if(this.listaPacientes[i]._get_edad()>media){
                arreglo_aux.push(this.listaPacientes[i]._get_nombre());
            }
        }
        return arreglo_aux;

    }

    public _esta_presente(id:string):boolean{
        return this.setId.has(id);
    }

    public _mayores_ingresos():string[]{
        let arr:string[]=[];
        let mapa1:Map<string,any>=new Map();
        let talla:number=this.listaPacientes.length;
        let maxi:number=-1;
        for(let i:number=0; i<talla;i++){
            let municipio_aux:string=this.listaPacientes[i]._get_municipio();
            if(!mapa1.has(municipio_aux)){
                mapa1.set(municipio_aux,1);
                for(let k=i+1;k<talla;k++){
                    if(municipio_aux==this.listaPacientes[k]._get_municipio()){
                        let temp:number=parseInt(mapa1.get(municipio_aux));
                        mapa1.set(municipio_aux, temp+1);

                    }

                }
                if(maxi<parseInt(mapa1.get(municipio_aux))){
                    maxi=parseInt(mapa1.get(municipio_aux));
                }
            }
        }
      
        mapa1.forEach((value,key)=>{
            console.log("valor del mapa1: "+value);
            if(parseInt(value)==maxi){
                arr.push(key);
            }
        });
        return arr;
        
    }

}


///////////////////////////////////////////////


function maker():void{
    console.log("Hello");
    let arrPaciente:Paciente[]=[];
    for(let i:number=1;i<=3;i++){
        //console.log("Paciente numero "+ i+" : " );
        
         let nombre:any=prompt("Nombre: ");
         let apellidos:any=prompt("Apellidos: ");
         let CI:any=prompt("CI: ");
         let sala:any=prompt("Sala: ");
         let edad:any=prompt("Edad: ");
         let municipio:any=prompt("Municipio: ");
         let sexo:any=prompt("Sexo: ");
        
         let instanciaPaciente:Paciente=new Paciente(nombre,apellidos,CI,sala,edad,municipio,sexo);
         arrPaciente.push(instanciaPaciente);
    }
    
    let instanciaHospital:Hospital=new Hospital(arrPaciente);

 
}

    