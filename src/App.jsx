import { useRef, useState } from "react";
import styled from "styled-components";
import { BsPlusCircleFill, BsCheckCircle } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";

const Todo = styled.div`
  width: 100%;

  .Datos {
    width: 90%;
    height: 40rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;

    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: bluer(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

    padding: 10px;
  }

  .UnDato {
    width: 98%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #bdcdcdc8;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8px;
    border-radius: 20px;
  }

  .success {
    background-color: #4bb543;
    color: #efefef;
  }

  .Icon {
    width: 20%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* position: relative; */
    border-left: 1px solid black;
  }

  .TIcon {
    font-size: 24px;
    cursor: pointer;
  }

  .TheP {
    width: 60%;
    padding: 0.5rem;
    margin-left: 1rem;
    text-overflow: ellipsis;
  }

  .deleIco {
    color: #ab4444;
  }

  .NIco {
    color: #efefef;
  }

  .PT {
    margin-top: 2rem;
    text-align: center;
    color: #949494;
  }
`;

const Heade = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-bottom: 2rem;
  background-color: #1bba7a;

  .Entra {
    width: 80%;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  form {
    width: 90%;
    gap: 0.5rem;
    display: flex;
  }

  .Imput {
    width: 100%;
    height: 3rem;
    border-radius: 10px;
    padding-left: 15px;
    background-color: #ffffff75;
    border: none;
    outline: none;
  }

  .Imput::placeholder {
    color: #ffffff;
  }

  .Circle {
    /* width: 10%; */
    /* height: 2.5rem; */
    display: flex;
    justify-content: center;
    border-radius: 50%;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #ffffffc2;
    cursor: pointer;
  }

  /*------------*/
`;

function App() {
  const form = useRef(null);
  const [count, setCount] = useState([]);
  //  const [TheId, setTheId] = useState(null);

  const generarID = () => {
    const a = Date.now().toString(30);
    const b = Math.random().toString(30);
    const ElID = a + b;

    return ElID;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    const valor = e.target.content;

    const task = {
      [valor.name]: valor.value,
      id: generarID(),
      completed: false,
    };

    setCount((V) => [...V, task]);
    e.target.content.value = "";
  };

  const handleEdit = (id) => {
    const result = count.map((so) =>
      so.id == id ? { ...so, completed: !so.completed } : so
    );
    setCount(result);
  };

  const DeleteClik = (ID) => {
    const Delet = count.filter((fil) => fil.id !== ID);
    setCount(Delet);
  };

  const submit = () => {
    form.current.submit();
  };

  return (
    <Todo className="App">
      <Heade>
        <div className="Entra">
          <form onSubmit={HandleSubmit} ref={form}>
            <input
              className="Imput"
              type="text"
              name="content"
              placeholder="Ingrese su activida..."
            />
            {/*  <BsPlusCircleFill className="Circle" onClick={submit} /> */}
            <input type="submit" value="➕" className="Circle" />
          </form>
        </div>
      </Heade>

      <div className="Datos">
        {count.length <= 0 ? (
          <p className="PT">No tienes tareas por realizar</p>
        ) : (
          count.map((element) => {
            return (
              <div
                className={element.completed ? "success UnDato" : "UnDato"}
                key={element.id}
              >
                <div className="TheP">{element.content}</div>
                <div className="Icon">
                  <BsCheckCircle
                    className={element.completed ? "NIco TIcon" : "TIcon"}
                    onClick={() => handleEdit(element.id)}
                  />
                  |
                  <AiFillDelete
                    className="TIcon deleIco"
                    onClick={() => DeleteClik(element.id)}
                  />
                </div>
              </div>
            );
          })
        )}

        {/* <div className="UnDato">
          <div className="TheP">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            doloremque ratione ea ad iusto itaque, totam amet, veritatis
            asperiores eos facere voluptatum! Velit sed enim sunt, repudiandae
            id maxime dolorem.
          </div>
          <div className="Icon">
            <BsCheckCircle className="TIcon" /> |
            <AiFillDelete className="TIcon" />
          </div>
        </div> */}
      </div>
    </Todo>
  );
}

export default App;
