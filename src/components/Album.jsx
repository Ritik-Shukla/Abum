import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Album = () => {
  const [data, setData] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);



  // Fetching data through api call
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
      });
  }, []);


  // Delete particular album from data
  const deleteObject = (id) => {
    try {
      if(editId===null){
      setData(data.filter((p) => p.id !== id));
      }else{
        setEditId(null);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

                      // toggle update form
  const update = (id) => {
    const d = data.find((p) => p.id === id);
    setTitle(d.title);
    setEditId(id);
  };


                      //toggle add form
  const toggleAdd = () => {
    setTitle("")
    let f = isAdd;
    setIsAdd(!f);
  };


  //add new Object
  const addNewObject = () => {
    setTitle("")
    const newid = data[data.length - 1].id + 1;
    const newObject = [...data, { id: newid, title: title }];
    setData(newObject);
    toggleAdd();
  };


                 // edit
  const editObject = (id) => {
    const updatedAlbumData = data.find((p) => p.id === id);
    console.log(updatedAlbumData);
    updatedAlbumData.title = title;
    console.log(updatedAlbumData);
    const updatedAlbums = data.map((card) =>
      card.id === id ? updatedAlbumData : card
    );
    console.log(updatedAlbums);
    setTitle("")
    setData(updatedAlbums);
    setEditId(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap gap-2 pt-4 justify-center content-center align-middle">
        {data.map((card, index) => (
          // <Card key={card.id} props={card} />

          <div
            key={card.id}
            className="container h-48 w-56 shadow-md shadow-black "
          >
            <div className="content h-3/4 bg-slate-100">
              <h1 className=" font-serif font-bold text-xl flex text-center align-middle justify-center">
                UserId:{card.id}
              </h1>
              {editId === card.id ? (
                <div className="flex flex-col ml-2 h-2/4">
                  <label htmlFor="message">Enter Message</label>
                  <input
                    className="h-10 w-52 border-slate-200 border-2"
                    type="text"
                    name=""
                    id="message"
                    placeholder="Enter message..."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              ) : (
                <p className="font-sans flex tex-md text-center justify-center align-middle content-center">
                  {card.title}
                </p>
              )}
            </div>
            <div className="control flex justify-evenly">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-md hover:shadow-black w-2/6 h-8 rounded-sm mt-2"
                onClick={() => deleteObject(card.id)}
              >
                {editId === card.id ? "Cancle" : "Delete"}
              </button>
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-md hover:shadow-black w-2/6 h-8 rounded-sm mt-2"
                onClick={() =>
                  editId === card.id ? editObject(card.id) : update(card.id)
                }
              >
                {editId === card.id ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        ))}

        {isAdd ? (
          <div className="h-48 w-56 shadow-md shadow-black e py-auto mb-4 bg-slate-100">
            <div className="flex flex-col ml-2 h-2/4">
              <label htmlFor="message">Enter Message</label>
              <input
                className="h-10 w-52 border-slate-200 border-2"
                type="text"
                name=""
                id="message"
                placeholder="Enter message..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="control flex justify-evenly">
              <button
                className="bg-blue-500 text-white hover:shadow-md hover:shadow-black w-2/6 h-8 rounded-sm mt-2 hover:bg-blue-700"
                onClick={addNewObject}
              >
                Save
              </button>
              <button
                className="bg-blue-500 text-white hover:shadow-md hover:shadow-black w-2/6 h-8 rounded-sm mt-2
          hover:bg-blue-700"
                onClick={toggleAdd}
              >
                Cancle
              </button>
            </div>
          </div>
        ) : (
          <div className="h-48 w-56 shadow-md shadow-black flex justify-center content-center align-middle py-auto mb-4">
            <img
              className=" cursor-pointer rounded-full mt-14 h-20 w-20"
              src="https://cdn-icons-png.flaticon.com/128/13455/13455820.png"
              alt=""
              onClick={toggleAdd}
            />
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Album;
