import React from 'react'

const States = () => {
   const API_URL = 'http://localhost:3005'
   const [state, setState] = React.useState('');
   const [alert, setAlert] = React.useState([]);
   const [listStates, setListStates] = React.useState([]);

   React.useEffect(() => {
      async function fetchStates() {
         const response = await fetch(`${API_URL}/states`, { method: 'GET' });
         const json = await response.json();
         setListStates(json)
      }
      fetchStates();
   }, [alert]);

   const handleSubmitState = async (e) => {
      e.preventDefault();

      const data = { "name": state }
      const regex = /^[A-Z]{2}$/;

      try {
         if (regex.test(state) === false) throw new Error('Usar 2 caracteres, somente letras e maiúsculas');
         if (!state) throw new Error('Preencha a UF');

         let response = await fetch(`${API_URL}/states`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });
         let json = await response.json();
         json.name !== '' && setAlert({ status: "ok", message: "Cadastrado com sucesso!" });
      } catch (e) {
         setAlert({ status: "error", message: e.message });
      }
   }

   const handleDelete = async (id) => {
      try {
         const response = await fetch(`${API_URL}/states/${id}`, {
            method: 'DELETE',
         });
         const json = await response.json();
         json.name !== '' && setAlert({ status: "ok", message: "Deletado com sucesso!" })
      } catch (e) {
         setAlert({ status: "error", message: e.message });
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmitState}>
            <h3 className="title">Cadastrar Estado</h3>

            <div className="form-group">
               <label htmlFor="state">UF:</label>
               <input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="Ex.: RJ"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
               />
            </div>
            <button type="submit">Salvar</button>
            {alert.status && <div className="alert">{alert.message}</div>}
         </form>

         <div className="list">
            {listStates.map(state => (
               <div key={state.id} className="item">
                  {state.name}
                  <button onClick={() => handleDelete(state.id)} className="delete">excluir</button>
               </div>
            ))}
         </div>
      </div>
   )
}

export default States
