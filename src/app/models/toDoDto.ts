export interface ToDoDto{
    toDoId:number,
    userId:number,
    fullName:string
    title:string,
    description:string,
    p1:boolean,
    p2:boolean,
    p3:boolean,
    startingDate:Date,
    endingDate?:Date,
    status:boolean
}