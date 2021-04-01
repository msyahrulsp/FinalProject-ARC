import React, { useState, useEffect } from "react";
import './App.scss';
import Axios from 'axios';

function App() {
  const [content_title, setContentTitle] = useState('')
  const [content, setContent] = useState('')
  const [wikiList, setWikiList] = useState([])
  const [newContent, setNewContent] = useState("")

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setWikiList(response.data)
    });
  }, []);

  const submit = () => {
    var today = new Date(),
    last_updated = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes();
    Axios.post('http://localhost:3001/api/insert', {
      content_title: content_title,
      content: content,
      last_updated: last_updated,
    });

    setWikiList([
      ...wikiList,
      {content_title: content_title, content: content, last_updated: last_updated},
    ]);
    window.location.reload();
  };

  const deleteWiki = (id) => {
    Axios.delete('http://localhost:3001/api/delete/'+id);

    setWikiList(wikiList.filter((val) => {
      return val.id !== id;
    }));
  };

  const updateWiki = (id) => {
    var today = new Date(),
    last_updated = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes();
    Axios.put('http://localhost:3001/api/update', {
      id : id,
      content: newContent,
      last_updated: last_updated,
    });

    setWikiList(wikiList.map((val) => {
      return val.id === id ? {
        id : val.id,
        content_title : val.content_title,
        content : newContent,
        last_updated : last_updated,
      } : val;
    }))
    window.location.reload();
    setNewContent("");
  };

  return (
    <div className="wrapper">
      <h1>Test</h1>

      <div className="contentForm">
        <label>Judul Konten</label>
        <textarea
          rows="1"
          placeholder="Masukkan Judul Disini" 
          onChange={(e) => {
            setContentTitle(e.target.value);
          }}
          />
        <label>Konten</label>
        <textarea
          cols="40"
          rows="5"
          placeholder="Masukkan Konten Disini"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          />

        <button onClick={submit}>Submit</button>
      </div>

    <div className="contentWrapper">
      {wikiList.map((val) => {
        return (
          <div className="contentHolder">
            <h1>{val.content_title}</h1>
            <button onClick={() => {deleteWiki(val.id)}}>Delete</button>
            <p>{val.content}</p>
            <textarea cols="35" rows="4" type="text" placeholder="Update Konten" onChange={(e) => {
              setNewContent(e.target.value)
            }} />
            <button className="update" onClick={() => {updateWiki(val.id)}}>Update</button>
            <p>Last Update: {val.last_updated}</p>
          </div>
        )
      })}
    </div>

    </div>
  );
}

export default App;
