import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = (props) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then (res => {
      props.updateColors(props.color.map(color => {
        if (color.id === colorToEdit.id) {
          return colorToEdit
        } else {
          return color
        }
      }));
    })
    .catch(err => {
      console.log(err)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res=>{
      props.updateColors(props.colors.filter(data=> data.id !== color.id))
    })
  };

  const handleChangeName = event => {
    console.log(event.target.name)
    setNewColor({
      ...newColor,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeHex = event => {
    setNewColor({
      ...newColor,
      code:{[event.target.name]: event.target.value}
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, newColor)
    .then(res=>{
      console.log(res)
      props.updateColors(res.data)
      setNewColor(initialColor)
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={handleSubmit} className='color-form'>
        <input type='text' name='color' value={newColor.color} placeholder='Enter Color Name' onChange={handleChangeName}/>
        <input type='text' name='hex' value={newColor.code.hex} placeholder='Enter Hex Code' onChange={handleChangeHex}/>
        <button className='submit-buttons' type='submit'>Submit</button>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
