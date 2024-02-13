
import React, { useState } from 'react'
import { MdAdd } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { VscClearAll } from "react-icons/vsc";




export default function App() {
  const [todos,setTodos]=useState([])
  const [value,setvalue]=useState('')
  const [update,setUpdate]=useState()
  const [ubutton,setUbutton]=useState(false)
    // Yeni todo ekleme fonksiyonu
  const handleAddToDo=(e)=> {
    e.preventDefault()
    if(value.trim !== ''){
      setTodos([...todos, {text:value, completed:false}])
      setvalue('')
    }
  }
   // Todo güncelleme fonksiyonu
  const handleUpdateTodo=()=> {
    todos.splice(update, 1, { text: value, completed: false });
    setTodos([...todos]);
    setUpdate(null);
    setvalue('');
    setUbutton(false)
  }
   // Todo'nun tamamlanma durumunu değiştirme fonksiyonu
  const handleToggleComleted= (index)=> {
    const updateTodos= [...todos]
    updateTodos[index].completed=!updateTodos[index].completed
    setTodos(updateTodos)

  }
    // Todo silme fonksiyonu
  const handleDeleteTodo= (index)=> {
    const updateTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(updateTodos);
  } 
  
  // Todo düzenleme fonksiyonu
  const handleEditTodo = (index) => {
    const filtertodos = todos.filter((elm, idx) => idx === index);
    setvalue(filtertodos[0]?.text);
    setUpdate(index);
    setUbutton(true)
  };
    // Tüm todoları temizleme fonksiyonu
  const clearAll=()=> {
    setTodos([]);

  }



  return (
    <>
    {/* Todo ekleme formu */}
    <form className='flex gap-3 items-center justify-center m-4 '>
      <input type="text" value={value} onChange={(e)=>setvalue(e.target.value)} placeholder='Add Item' className='border border-indigo-600 rounded-md outline-none p-3 bg-indigo-500 text-white' />
      <div>
    {/* Update veya Add butonu */}
      {ubutton ?  <a  className='bg-indigo-400 w-24 flex justify-between items-center rounded-md p-3 text-white' onClick={handleUpdateTodo}>Update</a> :   <a  className='bg-indigo-400 w-24 flex justify-between items-center rounded-md p-3 text-white' onClick={handleAddToDo}>ADD<MdAdd className=' text-2xl transform rotate-90 hover:rotate-0 focus:rotate-90 transition-transform duration-300 ease-in-out'/></a>}
    
     
      </div>
    </form>
    <div>
    {/* Todo listesi */}
      {todos.length==0 ? (
        <p className='text-center text-lime-800 text-2xl font-semibold'>Everything is done</p>
      ):
      (
        <ul>
          {todos.map((todo,index)=>(
            
        <li key={index}>
          <div className='flex items-center justify-center'>
     {/* Todo'nun tamamlanma durumu checkbox'u */}
            <input type="checkbox"  checked={todo.completed} onChange={()=>handleToggleComleted(index)} name="" id="" className='w-6 h-6'/>
     {/* Todo metni */}
            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}} className='text-indigo-300 text-2xl font-bold px-3'> {todo.text}</span>

     {/* Silme ve düzenleme butonları */}
             <a type='submit' onClick={()=>handleDeleteTodo(index)}><RiDeleteBin5Line className='text-red-800 font-bold text-2xl cursor-pointer'/></a>
            <a type='submit' onClick={()=>handleEditTodo(index)}><FaEdit className='text-red-800 font-bold text-2xl cursor-pointer'/></a>
          </div>

        </li>
          ))}
      </ul>
      )}
     
    </div>
    <div className='flex items-center justify-center'>
    {/* Tüm todoları temizleme butonu */}
      <a className=' bg-indigo-400 w-40 mt-4 flex justify-between items-center rounded-md p-3 text-white' href="" onClick={()=>clearAll}>CLEAR ALL<VscClearAll />
</a>
    </div>

    </>
  )
}
