import { useState } from 'react';
import Svg from './Svg';

export default function App() {
  return (
    <div className="outer">
      <Box />
    </div>
  );
}

function Box() {
  const temp = [
    { text: 'Buy a new gaming Laptop', id: crypto.randomUUID() },
    { text: 'Complete a previous task', id: crypto.randomUUID() },
    { text: 'Create video for Youtube', id: crypto.randomUUID() },
    { text: 'Create a new portfolio site', id: crypto.randomUUID() },
  ];
  const [wants, setWants] = useState('');
  const [wantList, setWantList] = useState(temp);

  function handleClick(wants) {
    if (!wants) return;
    const newitem = {
      text: `${wants.slice(0, 1).toUpperCase().concat(wants.slice(1))}`,
      id: crypto.randomUUID(),
    };
    setWantList(wantList => [newitem, ...wantList]);
    setWants('');
  }

  function handleDelete(id) {
    setWantList(wantList.filter(wl => wl.id !== id));
  }

  function handleClearAll() {
    setWantList([]);
  }

  function handleTick(id, changeText) {
    setWantList(
      wantList.map(wl => (wl.id === id ? { text: changeText, id: id } : wl))
    );
  }

  return (
    <div className="container">
      <h1 className="heading-primary">
        Todo App <Svg />
      </h1>
      <form
        className="input-area"
        onSubmit={e => {
          e.preventDefault();
          handleClick(wants);
        }}
      >
        <input
          className="input-box"
          type="text"
          placeholder="Add your new todo"
          value={wants}
          onChange={e => setWants(e.target.value)}
        />
        <button className="btn-add" onClick={() => handleClick(wants)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
      <div className="list-container-outer">
        <ListContainer
          wantList={wantList}
          onDelete={handleDelete}
          onTick={handleTick}
        />
      </div>
      <Total wantList={wantList} onClearAll={handleClearAll} />
    </div>
  );
}

function ListContainer({ wantList, onDelete, onTick }) {
  return (
    <ul className="todo-items">
      {wantList &&
        wantList.map(want => (
          <List
            wants={want}
            key={want.id}
            onDelete={onDelete}
            onTick={onTick}
          />
        ))}
    </ul>
  );
}

function List({ wants, onDelete, onTick }) {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <li className="todo-item">
      {isEditable ? (
        <EditBar wants={wants} onTick={onTick} setIsEditable={setIsEditable} />
      ) : (
        <NormalBar
          wants={wants}
          onDelete={onDelete}
          setIsEditable={setIsEditable}
        />
      )}
    </li>
  );
}

function EditBar({ wants, onTick, setIsEditable }) {
  const [newValue, setNewValue] = useState(wants.text);
  function handleTick() {
    onTick(wants.id, newValue);
    setIsEditable(false);
  }

  return (
    <>
      <input
        type="text"
        className="edit-input-box"
        value={newValue}
        onChange={e => setNewValue(e.target.value)}
      />
      <button className="btn-tick" onClick={handleTick}>
        <i className="fa-solid fa-check"></i>
      </button>
    </>
  );
}

function NormalBar({ wants, onDelete, setIsEditable }) {
  return (
    <>
      <span onDoubleClick={() => setIsEditable(true)}>{wants.text}</span>
      <button
        className="btn-trash"
        onClick={() => {
          onDelete(wants.id);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </>
  );
}

function Total({ wantList, onClearAll }) {
  return (
    <div className="last-section">
      <p>You have {wantList.length} pending Tasks</p>
      <button className="btn-clear-all" onClick={onClearAll}>
        Clear All
      </button>
    </div>
  );
}
