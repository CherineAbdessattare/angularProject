import { Departement } from "./departement.model";
import { Image } from "./image.model";
export class Etudiant {
    idEtudiant! : number;
    nom! : string;
    prenom!: string;
    parcours!:string;
    email!:string;
    dateInscription!:Date;
    departement! : Departement;
    idDepart!:number;
    image! : Image;
    imageStr!:string;
    images! : Image[];
}