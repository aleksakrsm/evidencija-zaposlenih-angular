import { StudiesType } from "./studiesType.enum";

export type Subject ={
    id?:number;
    name:string;
    ects:number;
    studiesType:StudiesType;
}