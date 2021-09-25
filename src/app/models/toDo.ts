export interface ToDo{
    id:number,
    userId:number,
    title:string,
    description:string,
    priority1:boolean,
    priority2:boolean,
    priority3:boolean,
    startingDate:Date
    endingDate?:Date
    status:boolean
}