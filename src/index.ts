import { WebSocketServer,WebSocket } from "ws";
const wss=new WebSocketServer({port:6060});
 
interface user{
    socket:WebSocket,
    room:string
}
let allSocker:user[] =[];
//connection in ws
wss.on("connection",(socket)=>{
   
    //connection is done 

    
    console.log("conneted to the server");


    /*
    structure of payloade
    {
      type:"chat"/"join"
       payload:{
       name:
       roomId:----
       }

       type:"chat"
       payload:{
       name:
       message:
       roomId:
       }
      }
    */


    //recive message from client
    socket.on("message",(message)=>{
        //convert the data store in the array

        const paresData=JSON.parse(message as unknown as string);

        
        if(paresData.type ==="join"){
            allSocker.push({
                name:paresData.payload.name,
                socket:socket,
                room:paresData.payload.roomId
            })

            console.log("user is added successfully")
        } 
         if(paresData.type ==="chat"){
            //first approch

            const currentUserSocket=allSocker.find((s)=>s.socket==socket)?.room
            
            allSocker.forEach((s)=>{
                if(s.room==currentUserSocket){
                    //send the message other than current socket 
                   if (s.socket!=socket) {
                    s.socket.send(paresData.payload.message);
                   }
                }
            })

 
        }
    })

   
    
})