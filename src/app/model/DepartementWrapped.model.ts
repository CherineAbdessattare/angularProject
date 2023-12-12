import { Departement } from "./departement.model";

export class DepartementWrapper{
_embedded!: { departements: Departement[]};
}

//embedded : pour suivre le format qui est retournée par le data rest