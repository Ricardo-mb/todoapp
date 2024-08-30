import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
        title:{
            type:String
        },
        completed:{
            type:Boolean
        }
    },
    {timestamp:true}
)

const Todo = mongoose.model('Todo', TodoSchema)

export default Todo