import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

let arr:number[]=[1,2,3]

let num:Array<string>=["hi","hello"]

type User={
    name:string
    age:number
    isActive?:boolean
}

type Admin=User&{
    role:"hr"|"ceo"|"cto"
}

let user:User={name:"Venky",age:20}

let allUsers:User[]=[];
allUsers.push(user)

type num=number
let a:num=1

let rgb:[number,number,number]=[2,2,3]

let users:(number| string)[]=[1,2,3,""]

const enum seatChoice{
    asile="asile",
    middle="middle",
    window="window"
}

const seat=seatChoice.middle

interface inf1{
    readonly dbId:number
    name:string
    age:number
    startTrail():string
    startFun(name:string,age:number):string
}

interface inf1{
    isActive:boolean
}

interface inf2 extends inf1
{
    admin:"hr"|"cto"|"ceo"
}

const b:inf1={name:"Venky",age:20,dbId:1,startTrail:()=>{
    return "hello"
    },
    startFun:(user,num)=>
    {return user
    },isActive:true}

function functionOne <T>(val:T):T{
    return val
}

functionOne(2)
functionOne("Hello") //It accepts any type and lock the type and return the same type which is been accepted
